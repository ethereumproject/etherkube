all: compile install

compile:
	cd tools/config && cargo build --release

install:
	cp tools/config/target/release/config bin/