import React from 'react'
import ReactDOM from 'react-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import App from './App'
import { Router } from "react-router-dom";
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
        <Router history={history}>
            <App history={history} />
        </Router>
,document.body.appendChild(document.createElement('div')),
  )
})