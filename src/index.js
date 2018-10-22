import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import {Provider} from 'react-redux';
// import store from './redux';
import registerServiceWorker from './registerServiceWorker';
import RouteMap from './routes/RouteMap';
ReactDOM.render(
    <RouteMap/>
    , document.getElementById('root'));
registerServiceWorker();
