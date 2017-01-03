#!/bin/sh

echo "-------------------------------------------------------"
echo "Run Geth provided binary"
echo "-------------------------------------------------------"

if [ -z "$NODE_OPTIONS" ]; then
    NODE_OPTIONS="--cache 4096"
fi

/opt/geth/geth \
    --datadir /data --rpc --rpcaddr 0.0.0.0 \
    $NODE_OPTIONS