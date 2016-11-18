all: compile install

dist: compile install zip

compile:
	cd tools/config && cargo build --release

install:
	cp tools/config/target/release/config bin/

zip:
	zip dist.zip -r . -x .\* tools/\* Makefile containers/.\*