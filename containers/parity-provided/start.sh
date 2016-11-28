#!/bin/sh

if [ -z "$NODE_OPTIONS" ]; then
    NODE_OPTIONS="--chain classic --cache-size 512 --cache-size-db 4095 --rpcport 8545 --rpcaddr 0.0.0.0"
fi

/opt/parity/parity \
    --datadir /data \
    --port 30303 \
    --jsonrpc-hosts all \
    --no-dapps --no-ipc \
    $NODE_OPTIONS