import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware, combineReducers } from 'redux'

import { getNodes } from './nodesActions'
import { nodesReducers } from './nodesReducers'

const stateTransformer = (state) => {
    return {
        nodes: state.nodes.toJS()
    };
};

const loggerMiddleware = createLogger({
    stateTransformer
});

const reducers = {
    nodes: nodesReducers,
};

export const store = createStore(
    combineReducers(reducers),
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

store.dispatch(getNodes());