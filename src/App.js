import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Navbar , NavItem , Icon , Modal , Button} from 'react-materialize';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <div className="nav-wrapper">
              <Link to={'/'} className="brand-logo pad-left"> opLOL </Link>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to={'/'} className="nav-link"><Icon>call</Icon></Link></li>
                <li><Link to={'/'} className="nav-link"><Icon>live_help</Icon></Link></li>
              </ul>
            </div>
          </nav>

          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
