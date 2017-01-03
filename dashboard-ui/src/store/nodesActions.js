import log from 'loglevel'
import 'whatwg-fetch'

function extractNode(service) {
    return {
        service: service
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
            })
    }
}