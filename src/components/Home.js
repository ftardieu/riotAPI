import React, { Component } from 'react'
import { Navbar,  Nav,  NavItem,  NavDropdown,  MenuItemFormControl ,MenuItem, FormGroup,  FormControl } from 'react-bootstrap';
import Summoner from './Summoner'
import SummonerError from './Error'
import api from '../riotAPI'

class Home extends Component {
  constructor(props){
    super(props)
    this.makeRequest(props.match.params.playerName)

   }
    state = {
        name: "",
        sumData: null,
        error:false,
        valid: false,
        summonerName: ""
    }

    componentWillReceiveProps = async (nextProps) => {

        if(this.state.summonerName !== nextProps.match.params.playerName){
            this.makeRequest(nextProps.match.params.playerName)
        }
    }



    handleEnterKey = (e) => {
      if (e.key === 'Enter') {
        this.props.history.push('/player/'+ this.state.name)        }
      }

    handleClick = () => {
        const { name } = this.state
        this.props.history.push('/player/'+ name)
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

  render(){
    const { name, sumData, error, valid } = this.state
    return(
      <React.Fragment>
        <Navbar collapseOnSelect>
          <Navbar.Header className = 'col-xs-3'>
            <Navbar.Brand>
              <a href="/">RiotAPI</a>
            </Navbar.Brand>
          </Navbar.Header>
            { valid ?
                <Navbar.Form className='input-group' eventkey={1} href="#">
                  <FormControl
                      required
                      autoFocus="true"
                      type="text"
                      value = { name }
                      onKeyPress={this.handleEnterKey}
                      placeholder="Your summoner name.."
                      onChange={(e) => this.setState({ name: e.target.value })}
                  />
                  <div className="input-group-btn btn-search" >
                    <button onClick={this.handleClick} className ="btn btn-default" ><i className="glyphicon glyphicon-search" /></button>
                  </div>
                </Navbar.Form>
                : null }
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
                      placeholder="Your summoner name.."
                      onChange={(e) => this.setState({ name: e.target.value })}
                  />
                  <div className="input-group-btn">
                    <button onClick={this.handleClick} className ="btn btn-default" ><i className="glyphicon glyphicon-search" /></button>
                  </div>
                </div>
                : null }
            {sumData ? <Summoner sumData={sumData} id={sumData.id} accountId = {sumData.accountId} /> : null}
            {error ? <SummonerError /> : null}
        </div>
      </React.Fragment>
      )
  }
}

export default Home;
