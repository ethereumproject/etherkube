#!/bin/sh

echo "-------------------------------------------------------"
echo "Run Geth stable binary"
echo "-------------------------------------------------------"

if [ -z "$NODE_OPTIONS" ]; then
    NODE_OPTIONS="--rpc --rpcaddr 0.0.0.0 --cache 4096"
fi

/opt/geth/geth \
    --datadir /data \
    $NODE_OPTIONS