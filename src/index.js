import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import { BrowserRouter, Route, Switch,  } from 'react-router-dom';
import io from 'socket.io-client';
import * as serviceWorker from './serviceWorker';
import SiderLayout from './common/layout/layout';
// import Login from './page/login';
import GatexState from './page/GatexState/gatexState';
import PasswdConfig from './page/PasswdConfig/passwdConfig';
import InterfaceInfo from './page/InterfaceInfo/InterfaceInfo';
import NetStateLog from './page/NetStateLog/netStateLog';
import Login from './page/Login/login';
import Command from './page/Command/command';
import NotFound from './page/notFound';
import reducer from './redux/reducer';


const store = createStore(reducer);
// const socket = io.connect("http://127.0.0.1:3000")
// socket.on('connect', function(){
//     console.log('websocket连接成功')
// });
// socket.on('event', function(data){
//     console.log(data);
// });
// socket.on('disconnect', function(){});

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter >
            <div className="container">
                <SiderLayout>
                    <Switch>
                        <Route exact path="/" component={GatexState} />
                        <Route path="/login" component={Login} />
                        <Route path="/gatexState" component={GatexState} />
                        <Route path="/gatexStatus" component={InterfaceInfo} />
                        <Route path="/gatexlog" component={NetStateLog} />
                        <Route path="/command" component={Command} />
                        <Route path="/passwdconfig" component={PasswdConfig} />
                        <Route component={NotFound} />
                    </Switch>
                </SiderLayout>
            </div>
        </BrowserRouter>
    </Provider>
    ),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
