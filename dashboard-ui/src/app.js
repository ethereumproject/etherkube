import React from 'react';
import './style'
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './components/main';
import injectTapEventPlugin from 'react-tap-event-plugin';

console.log("Starting Etherkube UI...");
// Needed for onTouchTap
injectTapEventPlugin();

const App = () => (
<MuiThemeProvider>
    <Main />
</MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('app'));
