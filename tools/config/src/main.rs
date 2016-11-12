extern crate yaml_rust;
extern crate clap;

use std::io::prelude::*;
use std::io::{self};
use std::fs::File;
use std::path::Path;
use std::error::Error;

use yaml_rust::{YamlLoader, Yaml};
use clap::{Arg, App, SubCommand};

fn read_config<'d>(fname: &'d str) -> Option<Yaml> {
    let path = Path::new(fname);
    let display = path.display();
    let mut f = match File::open(path) {
        Err(why) => panic!("couldn't open {}: {}", display, why.description()),
        Ok(file) => file,
    };
    let mut s = String::new();
    match f.read_to_string(&mut s) {
        Err(why) => panic!("couldn't read {}: {}", display, why.description()),
        Ok(_) => {;}
    }

    let mut docs = YamlLoader::load_from_str(s.trim()).unwrap();
    let doc = docs.pop().unwrap();

    return Some(doc)
}

fn get_node<'d>(conf: &'d Yaml, id: &'d str) -> Option<&'d Yaml> {
    for node in conf["nodes"].as_vec().unwrap() {
        let x = node["id"].as_str().unwrap();
        if x == id {
            return Some(node)
        }
    }
    return None
}

struct Var {
    name: String,
    value: String
}

impl Var {
    fn from(name: &str, val: &str) -> Self {
        Var { name: String::from(name), value: String::from(val)}
    }
    fn as_pattern(&self) -> String {
        let mut s = String::from("${");
        s.push_str(self.name.as_str());
        s.push('}');
        s
    }
}

fn apply_template<'d>(conf: &'d Yaml, node: &'d Yaml, tpl: &'d str) -> String {
    let mut vars = Vec::new();
    vars.push(Var::from("project_id", conf["cluster"]["googleProjectId"].as_str().unwrap()));
    vars.push(Var::from("docker_reg", "gcr.io"));
    vars.push(Var::from("node_type", node["type"].as_str().unwrap()));
    vars.push(Var::from("node_source", node["source"].as_str().unwrap()));
    vars.push(Var::from("id", node["id"].as_str().unwrap()));

    let mut result = String::new();
    result.push_str(tpl);

    for var in vars {
        result = result.replace(var.as_pattern().as_str(), var.value.as_str());
    }

    result
}

fn main() {
    let opts = App::new("etherkube-config")
        .version("0.1")
        .author("Igor Artamonov <splix@ethereumclassic.org>")
        .about("Read config details from etherkube-config.yaml")
        .args_from_usage(
            "-c, --config=[FILE] 'Sets a custom config file'
             -n, --node=[NODE] 'Use specified node'")
        .subcommand(
            SubCommand::with_name("gcloud")
                .about("Google Cloud Configurations")
                .subcommand(
                    SubCommand::with_name("get-project-id")
                )
                .subcommand(
                    SubCommand::with_name("get-cluster-id")
                )
        )
        .subcommand(
            SubCommand::with_name("template")
                .about("Process template and set configured values into it")
        );
    let matches = opts.get_matches();

    let conf = read_config("etherkube-config.yaml").unwrap();

    if let Some(gcloud) = matches.subcommand_matches("gcloud") {
        if let Some(_) = gcloud.subcommand_matches("get-project-id") {
            let val = conf["cluster"]["googleProjectId"].as_str().unwrap();
            print!("{}", val);
        } else if let Some(_) = gcloud.subcommand_matches("get-cluster-id") {
            let val = conf["cluster"]["clusterId"].as_str().unwrap();
            print!("{}", val);
        }
    } else if let Some(gcloud) = matches.subcommand_matches("template") {
        let node_id = matches.value_of("node").unwrap();
        match get_node(&conf, node_id) {
            Some(node) => {
                let mut buffer = String::new();
                let stdin = io::stdin();
                let mut handle = stdin.lock();
                handle.read_to_string(&mut buffer);

                let result = apply_template(&conf, &node, buffer.as_str());
                print!("{}", result)
            },
            None => panic!("couldn't find {}", node_id),
        }
    }

}