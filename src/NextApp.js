import React from "react";
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import {Route, Switch} from "react-router-dom";
import "styles/main.less";
import configureStore, {history} from "@reduxStore";
import App from "@routes";

const store = configureStore();

export default () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={App}/>
            </Switch>
        </ConnectedRouter>
    </Provider>
);
