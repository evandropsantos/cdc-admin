import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import App from './App';
import Home from './Home';
import AuthorBox from './Author';
import Books from './Books';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

ReactDOM.render((
        <Router>
            <App>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/autor" component={AuthorBox} />
                    <Route path="/livro" component={Books} />
                </Switch>
            </App>
        </Router>
    ), document.getElementById('root') 
);

registerServiceWorker();
