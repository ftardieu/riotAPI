import React, { Component } from 'react';
import './App.css';
import {  Icon , Input, Button } from 'react-materialize'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Summoner from './components/Summoner'
import SummonerError from './components/Error'
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
                  <nav>
                      <div className="nav-wrapper">
                          <Link to={'/'} className="brand-logo pad-left"> RiotAPI </Link>
                          <ul id="nav-mobile" className="right hide-on-med-and-down">
                              { valid ? <li>
                                  <Input onKeyPress={this.handleEnterKey} onChange={(e) => this.setState({ name: e.target.value })} value = { name } required label="Your summoner name.." >
                                      <Button onClick={this.handleClick} floating><Icon>search</Icon></Button>
                                  </Input>
                              </li> : null }
                              <li><Link to={'/'} className="nav-link"><Icon>info_outline</Icon></Link></li>
                              <li><Link to={'/'} className="nav-link"><Icon>lock_outline</Icon></Link></li>
                          </ul>
                      </div>
                  </nav>

                  <div className="container section">
                      { !valid ?
                          <Input onKeyPress={this.handleEnterKey} autoFocus="true" onChange={(e) => this.setState({ name: e.target.value })} value = { name } required label="Your summoner name.." >
                              <Button onClick={this.handleClick} floating><Icon>search</Icon></Button>
                          </Input> : null }
                      {sumData ? <Summoner sumData={sumData} id={sumData.id} accountId = {sumData.accountId} /> : null}
                      {error ? <SummonerError /> : null}
                  </div>
              </div>
          </Router>
      );
  }
}

export default App;
