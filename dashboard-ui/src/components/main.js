import React from 'react';
import AppBar from 'material-ui/AppBar';

const Main = () => (
    <div>
        <AppBar
            title="EtherKube Dashboard"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <div id="nodes">
            <h1>Nodes</h1>
        </div>
        <div id="footer">
            <div>
                EtherKube, 2017 | <a href="https://github.com/ethereumproject/etherkube">Fork on GitHub</a>
            </div>
        </div>
    </div>
);

export default Main;