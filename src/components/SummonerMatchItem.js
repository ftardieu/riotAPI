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
    summonerIcon : null , 
    summonerSpellName1 : null,
    summonerSpellName2 : null , 
    perk : null , 
    perkSubStyle : null , 
    kills:null,
    deaths:null,
    assists :null

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
        var summonerIcon = iconName

        let spell1 = await api.getSpellById(sumMatchItemInfo.participants[i].spell1Id)
        let spellName1 = spell1.image.full 
        var summonerSpellName1 = api.getSummonerSpellImg(spellName1)

        let spell2 = await api.getSpellById(sumMatchItemInfo.participants[i].spell2Id)
        let spellName2 = spell2.image.full 
        var summonerSpellName2 = api.getSummonerSpellImg(spellName2)

        var perk = sumMatchItemInfo.participants[i].stats.perk0
        var perkSubStyle = sumMatchItemInfo.participants[i].stats.perkSubStyle

        var kills = sumMatchItemInfo.participants[i].stats.kills
        var deaths = sumMatchItemInfo.participants[i].stats.deaths
        var assists = sumMatchItemInfo.participants[i].stats.assists

      }

      if (sumMatchItemInfo.participants[i].teamId === 100 ) {

        team1[i] = [ sumMatchItemInfo.participantIdentities[i].player.summonerName ,  iconName  , isSummonerTarget, isWin]
      }else{
        team2[i] = [ sumMatchItemInfo.participantIdentities[i].player.summonerName ,  iconName  , isSummonerTarget , isWin]
      }
    }
        this.setState({ team1 , team2  ,gameId,  sumMatchItemInfo  , isSummonerWin ,summonerIcon , summonerSpellName1 , summonerSpellName2 , perk , perkSubStyle , kills ,deaths,assists })
  }

  componentWillReceiveProps = async (nextProps) => {
    if(this.state.gameId !== nextProps.gameId){
      this.getSummonerInfoMatch( nextProps.gameId)
    }
  }
 

  render(){

    const { team1 , team2 , gameId , sumMatchItemInfo, isSummonerWin , summonerIcon , summonerSpellName1 , summonerSpellName2  , perk , perkSubStyle , kills ,deaths ,assists} = this.state
    const { sumMatchItem } = this.props

    if (sumMatchItemInfo) {
      const { gameDuration } = sumMatchItemInfo
      var quotient = Math.floor(gameDuration/60);
      var remainder = gameDuration % 60;
      var gameResult =  isSummonerWin ? 'Victory' : 'Defeat' 
      var gameMode = api.getGameMode(sumMatchItemInfo.queueId)
      
      var perkImg = "../images/perk/" + perk +'.png'
      var perkSubStyleImg = "../images/perkStyle/" + perkSubStyle + '.png'

      var kda = deaths > 0 ? ((kills+assists) / deaths ).toFixed(2) +":1" : "Perfect"

      console.log(sumMatchItemInfo)
    }
 
    return(
      <div id = 'gameItem' className = { isSummonerWin ? 'gameWin' : 'gameLose' } data-game-id = {gameId} >

     
          { sumMatchItemInfo ? 
            <div id= "content">
                <div id = "gameInfo" >
                  <div> {gameMode}</div>
                  <div> { quotient }m {remainder}s </div>
                  <div>  {gameResult} </div>
                </div>

                <div id = "gameSettingInfo">
                  <div id ='summonerChamp'>
                    <img height = '50px' alt ='championIcon' id ="summonerIcon" src = {summonerIcon}></img>
                  </div>
                  <div id ="summonerSpell">
                    <div id ='spell'>
                      <img height = '25px' alt ='summonerSpell1' id ="summonerSpell" src = {summonerSpellName1}></img>
                    </div>
                    <div id ='spell'>
                      <img height = '25px' alt ='summonerSpell2' id ="summonerSpell" src = {summonerSpellName2}></img>
                    </div>
                  </div>
                  <div id='summonerRune'>
                    <div id ='rune'>
                      <img height = '25px' alt ='summonerSpell2' id ="summonerSpell" src = {perkImg} ></img>
                    </div>
                    <div id ='rune'>
                      <img height = '25px' alt ='summonerSpell2' id ="summonerSpell" src = {perkSubStyleImg} ></img>
                    </div>
                  </div>
                </div>
                <div id = "KDA">
                  <div id="stat">
                    <span> { kills +"/" + deaths + "/" +  assists }</span>
                  </div>
                  <div id ="statRatio">
                    <span> {kda.trim()} KDA </span>
                  </div>

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

// stats / perkSubStyle
// stats / perk0