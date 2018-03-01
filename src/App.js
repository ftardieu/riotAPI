import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Navbar,  Nav,  NavItem,  NavDropdown,  MenuItemFormControl ,MenuItem, FormGroup,  FormControl } from 'react-bootstrap';
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

                  <Navbar collapseOnSelect>
                    <Navbar.Header className = 'col-xs-3'>
                      <Navbar.Brand>
                        <a href="/">RiotAPI</a>
                      </Navbar.Brand>
                    </Navbar.Header>
                      <Nav pullRight className='col-xs-9 '>
                      { valid ? 
                        <NavItem className='input-group col-xs-6 col-xs-offset-4' eventKey={1} href="#">
                           <FormControl
                            required
                            autoFocus="true"
                            type="text"
                            value = { name }
                            onKeyPress={this.handleEnterKey}
                            palceholder="Your summoner name.."
                            onChange={(e) => this.setState({ name: e.target.value })}
                          />
                          <div className="input-group-btn btn-search" >
                             <button onClick={this.handleClick} className ="btn btn-default" ><i className="glyphicon glyphicon-search"></i></button>
                          </div>

                        </NavItem>
                         : null }
                          
                      </Nav>
                  </Navbar>

                  <div className="container">
                      { !valid ?
                         
                         <div className="input-group col-lg-4 col-lg-offset-4 add-on">
                          <FormControl
                            required
                            autoFocus="true"
                            type="text"
                            value = { name }
                            onKeyPress={this.handleEnterKey}
                            palceholder="Your summoner name.."
                            onChange={(e) => this.setState({ name: e.target.value })}
                          />
                           <div className="input-group-btn">
                             <button onClick={this.handleClick} className ="btn btn-default" ><i className="glyphicon glyphicon-search"></i></button>
                          </div>
                         </div>
                          : null }
                      {sumData ? <Summoner sumData={sumData} id={sumData.id} accountId = {sumData.accountId} /> : null}
                      {error ? <SummonerError /> : null}
                  </div>
              </div>
          </Router>
      );
  }
}

export default App;
