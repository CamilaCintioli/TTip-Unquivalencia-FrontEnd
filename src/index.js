/* eslint-disable react/jsx-equals-spacing */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable import/order */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './redux/store';
import { Provider } from 'react-redux';
import dotenv from 'dotenv';

dotenv.config();

const store = configureStore();

const app = () => ( <
    >
    <
    Provider store = { store } >
    <
    App / >
    <
    /Provider>  { ' ' } { ' ' }

    <
    />
);

ReactDOM.render(app(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();