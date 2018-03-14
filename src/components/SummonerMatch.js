import React, { Component } from 'react';
import SummonerMatchItem from './SummonerMatchItem'


const initialState = {
  
      name: null,
      id : null ,
      gameIdTable : [] ,
      totalGames: 0,
      totalWin : 0,
      totalLose : 0 , 
      totalKill : 0,
      totalDeath : 0,
      totalAssist : 0,
      averageKill : 0,
      averageDeath : 0,
      averageAssist : 0,
      moyWin : 0
  
};

class SummonerMatch extends Component {
  constructor(props) {
        super(props)
        this.state = initialState;
    }
    state = {

  }


  getResetState = async () => {
     return {
        name: null,
        id : null ,
        gameIdTable : [] ,
        totalGames: 0,
        totalWin : 0,
        totalLose : 0 , 
        totalKill : 0,
        totalDeath : 0,
        totalAssist : 0,
        averageKill : 0,
        averageDeath : 0,
        averageAssist : 0,
        moyWin : 0
     } 
  }

  changeButtonState = async (datas , gameId, name) => {
    let isNotFound = true
    if( this.state.name && this.state.name !== name){
      this.state = await this.getResetState()
    }

    if ( this.state.gameIdTable &&  this.state.gameIdTable.length > 0 ) {
      this.state.gameIdTable.forEach(function(game){
        if(game === gameId){
          isNotFound = false
        }
      })
    }


    if (  isNotFound ) {
      const { gameIdTable } = this.state
      gameIdTable.push(gameId)
      let totalGames = this.state.totalGames + 1 
      let totalWin = this.state.totalWin 
      let totalLose = this.state.totalLose
      let totalKill = this.state.totalKill
      let totalDeath = this.state.totalDeath 
      let totalAssist = this.state.totalAssist
      let averageKill 
      let averageDeath 
      let averageAssist 

      if (datas.stats.win) {
        totalWin++
      }else{
        totalLose++
      }
      totalKill +=  datas.stats.kills
      totalDeath +=  datas.stats.deaths 
      totalAssist += datas.stats.assists 

      averageKill = (totalKill / totalGames).toFixed(1)
      averageDeath = (totalDeath / totalGames).toFixed(1)
      averageAssist = (totalAssist / totalGames).toFixed(1)

      let moyWin = Math.round(totalWin / totalGames * 100 )   



     
      this.setState({ name,gameIdTable ,totalGames , totalWin ,  totalLose , totalKill ,totalDeath,totalAssist , moyWin ,averageKill,averageDeath ,averageAssist})
    }

   
  }

  render(){
    const {totalGames , totalWin ,  totalLose ,  moyWin ,averageKill,averageDeath ,averageAssist} = this.state

    return(
      <React.Fragment>
        <div className = "row stats">
            <span>gamePlayed : {totalGames}</span>
            <span>gamewin : {totalWin}</span>
            <span>gameLose : {totalLose}</span>
            <span>win % : {moyWin}</span>
            <span>{averageKill} / {averageDeath} / {averageAssist} </span>
        </div>


        <div className=" row matchItemList">
        {this.props.sumMatchList.matches.map((matches) =>
            <SummonerMatchItem buttonclick ={this.changeButtonState} key = {matches.gameId} name = {this.props.name} gameId = {matches.gameId} id ={this.props.id} sumMatchItem = {matches} />
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default SummonerMatch;
