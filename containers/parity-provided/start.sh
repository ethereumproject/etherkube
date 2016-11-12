#!/bin/sh

if [ -z "$PARITY_MODE" ]; then
    PARITY_MODE=classic
fi
if [ -z "$PARITY_MEM" ]; then
    PARITY_MEM=4096
fi
if [ -z "$PARITY_MEM_DB" ]; then
    PARITY_MEM_DB=512
fi
if [ -z "$PARITY_PRUNING" ]; then
    PARITY_PRUNING=auto
fi

PARITY_OPTS=""

if [ "$PARITY_MODE" = "classic" ]; then
    PARITY_OPTS="--chain classic"
fi

echo "Run at $PARITY_MODE with $PARITY_OPTS"

/opt/parity/parity $PARITY_OPTS \
    --datadir /data \
    --port 30303 \
    --rpcport 8545 --rpcaddr 0.0.0.0 \
    --tracing on \
    --pruning $PARITY_PRUNING \
    --cache-size $PARITY_MEM --cache-size-db $PARITY_MEM_DB \
    --db-compaction ssd \
    --jsonrpc-hosts all \
    --no-dapps --no-ipc --no-signer