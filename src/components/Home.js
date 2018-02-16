import React, { Component } from 'react';
import  { key } from '../config';
import {  Icon , Row , Col  , Input , Section ,Button } from 'react-materialize'
import Summoner from './Summoner';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search : "",
      SummonerDatas : []
    }
  }

  handleChange = (event) => {
    this.setState({search: event.target.value});
  }

  handleSubmit = (event) => {
    console.log('A name was submitted: ' + this.state.search);

    fetch("https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/"+ this.state.search +"?api_key=" + key).then(result =>{ 
      return result.json();
    }).then(SummonerDatas => {
       this.setState({SummonerDatas});

    }).catch(err => {
      console.log(err);
    })
    event.preventDefault();
  }

  componentDidMount() {

  }



  render() {
    return (

      <Section>
      <form onSubmit={this.handleSubmit}>
          <Row className='center'>
            <Col offset="s4" s={4}>
              <Row>
                <Input s={12} label="Name1" onChange={this.handleChange} value={this.state.search}><Button floating><Icon>search</Icon></Button></Input>
              </Row>         
            </Col>

          </Row>
        </form>
         <Summoner SummonerDatas={this.state.SummonerDatas}
                ref={(component) => {


                }}/>
      </Section>
    );
  }
}

export default Home;
