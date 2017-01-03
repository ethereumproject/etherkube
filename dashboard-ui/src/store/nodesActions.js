import log from 'loglevel'
import 'whatwg-fetch'

function extractNode(service) {
    return {
        service: service
    }
}

export function getNodeHeight(node) {
    return function (dispatch) {
        const id = node.service.metadata.name;
        const url = `/api/v1/proxy/namespaces/default/services/${id}:8545/`;
        const data = {
            "jsonrpc": "2.0",
            "method": "eth_blockNumber",
            "params": [],
            "id": 1
        };
        fetch(url, {method: 'POST', body: JSON.stringify(data)})
            .then((response) => response.json())
            .then((json) => {
                const height = parseInt(json.result, 16);
                dispatch({type: "NODES/SET-HEIGHT", nodeName: id, height: height})
            })
    }
}

export function getNodes() {
    return function (dispatch) {
        dispatch({type: "NODES/LOADING", value: true});
        fetch('/api/v1/namespaces/default/services')
            .then((response) => response.json())
            .then((json) => {
                log.debug("services", json);
                const nodes = json.items
                    .filter((x) => x.metadata.labels.type == "node-svc")
                    .map(extractNode);
                log.info("nodes", nodes);
                dispatch({type: "NODES/SET-ITEMS", value: nodes});
                nodes.forEach((node) => dispatch(getNodeHeight(node)));
            })
    }
}