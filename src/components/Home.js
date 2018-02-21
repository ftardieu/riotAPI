import React, { Component } from 'react'
import {  Icon , Row , Col  , Input , Section ,Button } from 'react-materialize'
import Summoner from './Summoner'
import SummonerError from './Error'
import api from '../riotAPI'

class Home extends Component {
  state = {
    name: "",
    sumData: null,
    error:false
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
    var error = this.state.error;
    var sumData = this.state.sumdata;
    const response = await api.getSummonerByName("euw1",name);
    const statutResponse = response.ok ; 
    if (statutResponse) {
      sumData = await response.json()
      error = false;
    }else{
      sumData = "";
      error = true;
    }

    this.setState({ sumData , error  , name : ""})

  }




  render(){
    const { name, sumData, error } = this.state
    return(
      <React.Fragment>
        <Section>

          <Row className='center'>
            <Col offset="s4" s={4}>
              <Row>
                  <Input s={12} onKeyPress={this.handleEnterKey} onChange={(e) => this.setState({ name: e.target.value })} value = { name } required label="Name1" >
                    <Button onClick={this.handleClick} floating><Icon>search</Icon></Button>
                  </Input>
              </Row>         
            </Col>

          </Row>
        {sumData ? <Summoner sumData={sumData} id={sumData.id} accountId = {sumData.accountId} /> : null}
        {error ? <SummonerError /> : null}
        </Section>

      </React.Fragment>
      )
  }
}

export default Home;
