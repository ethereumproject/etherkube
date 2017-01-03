import Immutable from 'immutable'

export const initial = Immutable.fromJS({
    items: [],
    loading: false
});

function setLoading(state, action) {
    switch (action.type) {
        case 'NODES/LOADING':
            return state.set('loading', action.value);
        default:
            return state
    }
}

function setNodes(state, action) {
    switch (action.type) {
        case 'NODES/SET-ITEMS':
            return state
                .set('items', Immutable.fromJS(action.value))
                .set('loading', false);
        default:
            return state
    }
}

function setHeight(state, action) {
    switch (action.type) {
        case 'NODES/SET-HEIGHT':
            const idx = state.get('items').findIndex((n) => n.getIn(['service', 'metadata', 'name']) === action.nodeName);
            if (idx >= 0) {
                return state.update('items', (items) =>
                    items.update(idx, (n) => n.set('height', action.height))
                )
            }
            return state;
        default:
            return state
    }
}

export const nodesReducers = function(state, action) {
    state = state || initial;
    state = setLoading(state, action);
    state = setNodes(state, action);
    state = setHeight(state, action);
    return state;
};