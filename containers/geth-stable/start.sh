#!/bin/sh

echo "-------------------------------------------------------"
echo "Run Geth stable binary"
echo "-------------------------------------------------------"

OPTS="--rpc --rpcaddr 0.0.0.0 $NODE_OPTS"

if [ -z "$NODE_MEM" ]; then
    NODE_MEM="4096"
fi
OPTS="$OPTS --cache $NODE_MEM"

/opt/geth/geth \
    --datadir /data \
    $OPTS