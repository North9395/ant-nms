import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch,  } from 'react-router-dom';
import routes from './common/constants/routePaths';
import * as serviceWorker from './serviceWorker';


ReactDOM.render((
    <BrowserRouter >
        <div className="container">
            <Switch>
                {routes.map((route, index) => (
                    <Route path={route.path} key={index} exact={route.exact} >
                        <route.layout>
                            <route.component />
                        </route.layout>
                    </Route>
                ))}
            </Switch>
        </div>
    </BrowserRouter>
    ),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
