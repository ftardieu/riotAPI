import React, { Component } from 'react';
import {  Row , Section } from 'react-materialize'
import SummonerMatchItem from './SummonerMatchItem'

class SummonerMatch extends Component {

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



              <div id = "gameitemList" className="col-xs-12">
              {this.props.sumMatchList.matches.map((matches) =>
                  <SummonerMatchItem key = {matches.gameId} gameId = {matches.gameId} id ={this.props.id} sumMatchItem = {matches} />
                )}
              </div>

      </React.Fragment>
    )
  }
}

export default SummonerMatch;
