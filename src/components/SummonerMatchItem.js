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
    isWin : null, 
    gameTime : null , 

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
      let icon = await api.getChampionById(sumMatchItemInfo.participants[i].championId)
      let iconName = icon.image.full 
      iconName = api.getChampionImg(iconName)

      if (sumMatchItemInfo.participantIdentities[i].player.summonerId === this.props.id) {
          isSummonerTarget = true;
      }
      if (sumMatchItemInfo.participants[i].teamId === 100 ) {

        team1[i] = [ sumMatchItemInfo.participantIdentities[i].player.summonerName ,  iconName  , isSummonerTarget]
      }else{
        team2[i] = [ sumMatchItemInfo.participantIdentities[i].player.summonerName ,  iconName  , isSummonerTarget]
      }
    }
        this.setState({ team1 , team2  ,gameId,  sumMatchItemInfo   })
  }

  componentWillReceiveProps = async (nextProps) => {
    if(this.state.gameId !== nextProps.gameId){
      this.getSummonerInfoMatch( nextProps.gameId)
    }
  }
 


  render(){

    const { team1 , team2 , gameId } = this.state
    return(
      <React.Fragment>
        <Section>
           <div >    
            { team1.length > 0  ?  <SummonerMatchItemParticipant key = {gameId + 'team1'} id ={this.props.id} gameId = {gameId} team = { team1 }  /> : null } 
            { team2.length > 0  ?  <SummonerMatchItemParticipant key = {gameId + 'team2'} id ={this.props.id} gameId = {gameId}  team = { team2 }  /> : null }
          </div>
      </Section>
      </React.Fragment>
    )
  }
}

export default SummonerMatchItem;
