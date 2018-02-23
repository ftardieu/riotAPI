import React, { Component } from 'react';
import {  Row , Section } from 'react-materialize'
// import api from '../riotAPI'
// import SummonerLeague from './SummonerLeague'
import SummonerMatchItem from './SummonerMatchItem'

class SummonerMatch extends Component {
  constructor(props){
    super(props)
  }
  state = {

  }


  componentWillReceiveProps = async (nextProps) => {
    if(this.state.id !== nextProps.id){

    }
  }


  render(){
    const {  endIndex   } = this.props.sumMatchList;

    return(
      <React.Fragment>
        <Section>
           <Row >
              <span>{endIndex} derniers matchs </span>


              {this.props.sumMatchList.matches.map((matches) =>
                  <SummonerMatchItem key = {matches.gameId} gameId = {matches.gameId} id ={this.props.id} sumMatchItem = {matches} />
                )}
          </Row>
      </Section>
      </React.Fragment>
    )
  }
}

export default SummonerMatch;
