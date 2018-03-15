import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch,  Route } from 'react-router-dom';
import Home from './components/Home'


class App extends Component {
  state = {

  }


  render() {
      return (
          <Router>
              <div>
                  <Switch>
                      <Route path="/player/:playerName" component={Home} />
                      <Route path="/" component={Home} />
                  </Switch>
              </div>
          </Router>
      );
  }
}

export default App;
