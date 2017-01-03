import React from 'react';
import { Provider, connect } from 'react-redux'
import './style'
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './components/main';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {store} from './store/store.js';
import log from 'loglevel';

log.setLevel('debug');
log.info("Starting Etherkube UI...");
// Needed for onTouchTap
injectTapEventPlugin();

const App = () => (
    <Provider store={store}>
        <MuiThemeProvider>
            <Main />
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
