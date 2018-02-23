import React, { Component } from 'react';
import {  Row , Section } from 'react-materialize'
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

    this.setState({ gameId,  sumMatchItemInfo   })

    this.getTeam()
  }   

  getTeam = async ( ) => {
    const { sumMatchItemInfo } = this.state
      let team1 = []
      let team2 = []
      let iconTeam1 = []
      let iconTeam2 = []
    for (var i = sumMatchItemInfo.participants.length - 1; i >= 0; i--) {

      let icon = await api.getChampionById(sumMatchItemInfo.participants[i].championId)
       let iconName = icon.image.full 
       iconName = api.getChampionImg(iconName)


      if (sumMatchItemInfo.participants[i].teamId === 100 ) {
        team1[i] = [ [sumMatchItemInfo.participantIdentities[i].player.summonerName] , [ iconName ]]
      }else{
        team2[i] = [ [sumMatchItemInfo.participantIdentities[i].player.summonerName] , [ iconName ]]
      }
    }
        this.setState({ team1 , team2   })
  }

  componentWillReceiveProps = async (nextProps) => {
    if(this.state.gameId !== nextProps.gameId){
      this.getSummonerInfoMatch( nextProps.gameId)
    }
  }
 


  render(){
    const { sumMatchItemInfo ,team1 , team2 } = this.state


    return(
      <React.Fragment>
        <Section>
           <div >
            { team1 ?  <SummonerMatchItemParticipant key = 'team1' team = { team1 }  /> : null } 
            { team2 ?  <SummonerMatchItemParticipant key = 'team2' team = { team2 }  /> : null }
          </div>
      </Section>
      </React.Fragment>
    )
  }
}

export default SummonerMatchItem;
