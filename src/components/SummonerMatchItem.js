import React, { Component } from 'react';
import { Section } from 'react-materialize'
import api from '../riotAPI'
import SummonerMatchItemParticipant from './SummonerMatchItemParticipant'

class SummonerMatchItem extends Component {
  constructor(props){
    super(props)
     this.getSummonerInfoMatch( props.gameId)

  }
  state = {
    gameId : null,
    sumMatchItemInfo: null,
    team1 : [] , 
    team2 : [],
    gameMode : null , 
    date : null, 
    gameTime : null , 
    isSummonerWin : null , 

  }

   getSummonerInfoMatch = async ( gameId) => {
    const response = await api.getSummonerMatch('euw1', gameId)
    const sumMatchItemInfo = await response.json()

    this.getTeam(gameId,  sumMatchItemInfo)
  }   

  getTeam = async ( gameId,  sumMatchItemInfo) => {
      let team1 = []
      let team2 = []
    for (var i = sumMatchItemInfo.participants.length - 1; i >= 0; i--) {
      let isSummonerTarget = false
      let isWin = sumMatchItemInfo.participants[i].stats.win
      let icon = await api.getChampionById(sumMatchItemInfo.participants[i].championId)
      let iconName = icon.image.full 
      iconName = api.getChampionImg(iconName)

      if (sumMatchItemInfo.participantIdentities[i].player.summonerId === this.props.id) {
          isSummonerTarget = true;
         var isSummonerWin = isWin

      }

      if (sumMatchItemInfo.participants[i].teamId === 100 ) {

        team1[i] = [ sumMatchItemInfo.participantIdentities[i].player.summonerName ,  iconName  , isSummonerTarget, isWin]
      }else{
        team2[i] = [ sumMatchItemInfo.participantIdentities[i].player.summonerName ,  iconName  , isSummonerTarget , isWin]
      }
    }
        this.setState({ team1 , team2  ,gameId,  sumMatchItemInfo  , isSummonerWin })
  }

  componentWillReceiveProps = async (nextProps) => {
    if(this.state.gameId !== nextProps.gameId){
      this.getSummonerInfoMatch( nextProps.gameId)
    }
  }
 

  render(){

    const { team1 , team2 , gameId , sumMatchItemInfo, isSummonerWin} = this.state
    const { sumMatchItem } = this.props

    if (sumMatchItemInfo) {
      const { gameDuration } = sumMatchItemInfo
      var quotient = Math.floor(gameDuration/60);
      var remainder = gameDuration % 60;
    }

    return(
      <div id = 'gameItem' data-game-id = {gameId} >

     
          { sumMatchItemInfo ? 
            <div id= "content">
            <div id = "gameInfo" >
             <div >{sumMatchItemInfo.gameMode}</div>
             <div> { quotient }m {remainder}s </div>
            </div>
 
          <div id = 'gameParticipant'>
           <SummonerMatchItemParticipant key = {gameId + 'team1'} id ={this.props.id} gameId = {gameId} team = { team1 }  />   
           <SummonerMatchItemParticipant key = {gameId + 'team2'} id ={this.props.id} gameId = {gameId}  team = { team2 }  /> 
         </div>  
         </div>
       : null } 
      </div>
    )
  }
}

export default SummonerMatchItem;
