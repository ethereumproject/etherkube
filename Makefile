all: config.compile config.install ui.prepare ui.compile

dist: config.dist ui.dist zip

zip:
	rm dist.zip && \
	zip dist.zip -r bin/ containers/ dashboard-ui/build/ k8s/ -x .\* containers/.\* && \
	zip dist.zip -r . -i *.yaml LICENSE *.adoc

config.dist: config.compile config.install

config.compile:
	cd config && cargo build --release

config.install:
	cp config/target/release/etherkube-config bin/config

ui.dist: ui.prepare ui.compile

ui.prepare:
	cd dashboard-ui && npm install

ui.compile:
	cd dashboard-ui && node build --no-watch