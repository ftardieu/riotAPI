import React, { Component } from 'react';
import SummonerMatchItem from './SummonerMatchItem'

class SummonerMatch extends Component {

  state = {
     
  }


  componentWillReceiveProps = async (nextProps) => {
    if(this.state.id !== nextProps.id){
    }
  }


  render(){


    return(
      <React.Fragment>
        <div className=" row matchItemList">
        {this.props.sumMatchList.matches.map((matches) =>
            <SummonerMatchItem key = {matches.gameId} name = {this.props.name} gameId = {matches.gameId} id ={this.props.id} sumMatchItem = {matches} />
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default SummonerMatch;
