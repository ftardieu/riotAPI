import React, { Component } from 'react';
import {  Row , Section } from 'react-materialize'
import SummonerMatchItem from './SummonerMatchItem'

class SummonerMatch extends Component {
  constructor(props){
    super(props)

  }
  state = {
    name : this.props.name
  }


  componentWillReceiveProps = async (nextProps) => {
    if(this.state.id !== nextProps.id){

    }
  }


  render(){
    const {  endIndex   } = this.props.sumMatchList;

    return(
      <React.Fragment>
        <div id = "gameitemList">
        {this.props.sumMatchList.matches.map((matches) =>
            <SummonerMatchItem key = {matches.gameId} name = {this.state.name} gameId = {matches.gameId} id ={this.props.id} sumMatchItem = {matches} />
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default SummonerMatch;
