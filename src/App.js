import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { Navbar,  Nav,  NavItem,  NavDropdown,  MenuItemFormControl ,MenuItem, FormGroup,  FormControl } from 'react-bootstrap';
import Home from './components/Home'
import api from './riotAPI'


class App extends Component {
  state = {
      name: "",
      sumData: null,
      error:false,
      valid: false,
      summonerName: "" 
  }

    handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            this.makeRequest(this.state.name)
        }
    }

    handleClick = () => {
        const { name } = this.state
        this.makeRequest(name)
    }

    makeRequest = async (name) =>{
        if(name) {
            var error = this.state.error;
            var sumData = this.state.sumData;
            const response = await api.getSummonerByName("euw1",name);
            const statutResponse = response.ok ;
            if (statutResponse) {
                sumData = await response.json()
                error = false;
            }else{
                sumData = "";
                error = true;
            }

            this.setState({ sumData , error, valid: !error, summonerName: name, name : ""})
        }

    }

  render() {
      const { name, sumData, error, valid } = this.state
      return (
          <Router>
              <div>
                  <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/player/:playerName" component={Home} />
                  </Switch>
              </div>
          </Router>
      );
  }
}

export default App;
