import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MiniEcommerce from './mini-ecommerce';//troca app
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';//import do bootstrap dependencia

ReactDOM.render(<MiniEcommerce />, document.getElementById('root'));//troca app p MiniEcommerce

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
