import React, { Component } from 'react';
import {  Row , Section } from 'react-materialize'
import api from '../riotAPI'
import SummonerLeague from './SummonerLeague'

class SummonerMatch extends Component {

  state = {
    id: this.props.id,
    accountId : this.props.accountId,
    sumInfo: null,
    sumMatchsList: null,
    startIndex : 0,
    endIndex : 5
  }

  getSummonerLeague = async (id) => {
    const response = await api.getSummonerLeague('euw1', id)
    const sumInfo = await response.json()
    this.setState({ id: id, sumInfo  })
  }

  getSummonerMatchsList = async(accountId) => {
    const response = await api.getSummonerMatchslist('euw1' , accountId , this.state.startIndex, this.state.endIndex)
    const sumMatchsList = await response.json()
    this.setState({ sumMatchsList  })
    console.log(sumMatchsList);
  }

  componentWillReceiveProps = async (nextProps) => {
    if(this.state.id !== nextProps.id){

    }
  }
 

 componentDidMount = async () => {

  }


  render(){
   
    return(
      <React.Fragment>
        <Section>
           <Row >
             
          </Row>
      </Section>
      </React.Fragment>
    )
  }
}

export default SummonerMatch;
