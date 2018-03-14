import React, { Component } from 'react';
import api from '../riotAPI'
import SummonerMatchItemParticipant from './SummonerMatchItemParticipant'
import SummonerMatchItemInfo from './SummonerMatchItemInfo'

class SummonerMatchItem extends Component {

  state = {
    name : this.props.name,
    gameId : null,
    isTeam1 : null,
    sumMatchItemInfo: null,
    team1 : [] , 
    team2 : [],
    isSummonerWin : null , 
    summonerIcon : null , 
    summonerSpellName1 : null,
    summonerSpellName2 : null , 
    perk : null , 
    perkSubStyle : null , 
    kills:null,
    deaths:null,
    assists :null,
    champLevel : null,
    championName: '',
    items: [],
    csNumber : null,
    csNumberNeutral : null,
    sumTeam1Kills:null,
    sumTeam2Kills:null,
    visionWardsBoughtInGame:null,
    wardsKilled:null,
    wardsPlaced:null,
    toggleMatch : false


  }

   getSummonerInfoMatch = async ( gameId) => {
    const response = await api.getSummonerMatch('euw1', gameId)
    const sumMatchItemInfo = await response.json()

    this.getTeam(gameId,  sumMatchItemInfo)  
  }   

  getTeam = async ( gameId,  sumMatchItemInfo) => {
      let team1 = []
      let team2 = []
      let sumTeam1Kills = 0
      let sumTeam1Deaths = 0
      let sumTeam1Assists = 0
      let sumTeam2Kills = 0
      let sumTeam2Deaths = 0
      let sumTeam2Assists = 0
      let summonerSpellName1
      let summonerSpellName2
      let isSummonerWin
      let summonerIcon
      let perk
      let perkSubStyle
      let kills
      let deaths
      let assists
      let champLevel
      let csNumber
      let csNumberNeutral
      let isTeam1
      let totalDamageDealtToChampions
      let visionWardsBoughtInGame
      let wardsKilled
      let wardsPlaced
      let items 
    for (var i = sumMatchItemInfo.participants.length - 1; i >= 0; i--) {
      let isSummonerTarget = false
      let isWin = sumMatchItemInfo.participants[i].stats.win
      let champion = await api.getChampionById(sumMatchItemInfo.participants[i].championId)
      let iconName = champion.image.full
      iconName = api.getChampionImg(iconName)

      if (sumMatchItemInfo.participantIdentities[i].player.summonerId === this.props.id) {
        var championName = champion.name

        isSummonerTarget = true;
        isSummonerWin = isWin
        summonerIcon = iconName

        let spell1 = await api.getSpellById(sumMatchItemInfo.participants[i].spell1Id)
        let spellName1 = spell1.image.full 
        summonerSpellName1 = api.getSummonerSpellImg(spellName1)

        let spell2 = await api.getSpellById(sumMatchItemInfo.participants[i].spell2Id)
        let spellName2 = spell2.image.full
        summonerSpellName2 = api.getSummonerSpellImg(spellName2)

        perk = sumMatchItemInfo.participants[i].stats.perk0
        perkSubStyle = sumMatchItemInfo.participants[i].stats.perkSubStyle

        kills = sumMatchItemInfo.participants[i].stats.kills
        deaths = sumMatchItemInfo.participants[i].stats.deaths
        assists = sumMatchItemInfo.participants[i].stats.assists

        champLevel = sumMatchItemInfo.participants[i].stats.champLevel
        items = []

        for (let j = 0; j < 7; j++) {
            let item = '../images/opacity.png';
            if(sumMatchItemInfo.participants[i].stats['item'+j])
              item = api.getSummonerItemImg(sumMatchItemInfo.participants[i].stats['item'+j] + '.png');
            items.push(item);
        }

        csNumber =  sumMatchItemInfo.participants[i].stats.totalMinionsKilled  
        csNumberNeutral =  sumMatchItemInfo.participants[i].stats.neutralMinionsKilled  
        isTeam1 = sumMatchItemInfo.participants[i].teamId === 100
        totalDamageDealtToChampions = sumMatchItemInfo.participants[i].stats.totalDamageDealtToChampions

         visionWardsBoughtInGame = sumMatchItemInfo.participants[i].stats.visionWardsBoughtInGame

          wardsKilled = sumMatchItemInfo.participants[i].stats.wardsKilled

         wardsPlaced = sumMatchItemInfo.participants[i].stats.wardsPlaced

      }

      if (sumMatchItemInfo.participants[i].teamId === 100 ) {

        sumTeam1Kills += sumMatchItemInfo.participants[i].stats.kills
        sumTeam1Deaths += sumMatchItemInfo.participants[i].stats.deaths
        sumTeam1Assists += sumMatchItemInfo.participants[i].stats.assists
        team1[i] = [ sumMatchItemInfo.participantIdentities[i].participantId,sumMatchItemInfo.participantIdentities[i].player.summonerName ,  iconName  , isSummonerTarget, isWin , sumTeam1Kills , sumTeam1Deaths ,sumTeam1Assists]
      }else{

        sumTeam2Kills += sumMatchItemInfo.participants[i].stats.kills
        sumTeam2Deaths += sumMatchItemInfo.participants[i].stats.deaths
        sumTeam2Assists += sumMatchItemInfo.participants[i].stats.assists
        team2[i] = [ sumMatchItemInfo.participantIdentities[i].participantId,sumMatchItemInfo.participantIdentities[i].player.summonerName ,  iconName  , isSummonerTarget , isWin , sumTeam2Kills , sumTeam2Deaths ,sumTeam2Assists]
      }
    }
        this.setState({ team1 , team2  ,gameId,  sumMatchItemInfo  , isSummonerWin ,summonerIcon , summonerSpellName1 , summonerSpellName2 , perk , perkSubStyle , kills ,deaths,assists , champLevel ,
         items  , csNumber, csNumberNeutral , sumTeam1Kills , sumTeam2Kills , isTeam1 , wardsPlaced  ,wardsKilled , visionWardsBoughtInGame, championName })
  }


  componentDidMount = async () => {
    this.getSummonerInfoMatch( this.props.gameId)

  }
 
  componentWillReceiveProps (nextProps) {
    if(this.state.gameId !== nextProps.gameId || this.state.name !== nextProps.name){ 
      this.getSummonerInfoMatch( nextProps.gameId)

    }
  }


    handleDropDownMatch = async () => {
      this.setState({toggleMatch : !this.state.toggleMatch})
    }
 

  render(){
    const { team1 , team2 , gameId , sumMatchItemInfo, isSummonerWin , summonerIcon , summonerSpellName1 , summonerSpellName2  , perk , perkSubStyle , kills ,deaths ,assists , champLevel , 
     items , csNumber , csNumberNeutral , isTeam1 , sumTeam1Kills , sumTeam2Kills  , wardsPlaced , wardsKilled  , visionWardsBoughtInGame, championName , toggleMatch} = this.state
    if (sumMatchItemInfo) {
      const { gameDuration } = sumMatchItemInfo
      var quotient = Math.floor(gameDuration/60);
      var remainder = gameDuration % 60;
      var gameResult =  isSummonerWin ? 'Victory' : 'Defeat' 
      var gameMode = api.getGameMode(sumMatchItemInfo.queueId)
      
      var perkImg = "../images/perk/" + perk +'.png'
      var perkSubStyleImg = "../images/perkStyle/" + perkSubStyle + '.png'

      var kda = deaths > 0 ? ((kills+assists) / deaths ).toFixed(2) +":1" : "Perfect"
      var totalCs = csNumber + csNumberNeutral
      var totalCsPerMinute = (totalCs / quotient).toFixed(1)

      var participationKills = isTeam1 ? Math.round( (kills + assists) / sumTeam1Kills *100 )  :  Math.round( (kills + assists) / sumTeam2Kills *100 )
    }

    return(
      <div className = 'col-xs-12'>
        <div className = { (isSummonerWin ? 'gameWin' : 'gameLose') + ' matchItem' } data-game-id = {gameId} >

       
            { sumMatchItemInfo ? 
              <div className="matchContent">
                  <div className = "gameInfo" >
                    <div> {gameMode}</div>
                    <div> { quotient }m {remainder}s </div>
                    <div>  {gameResult} </div>
                  </div>

                  <div className = "gameSettingInfo">
                    <div>
                      <div className ='summonerChamp'>
                        <img height = '50px' alt ='championIcon' className ="summonerIcon" src = {summonerIcon}></img>
                      </div>
                      <div className ="summonerSpell">
                        <div className ='spell'>
                          <img height = '25px' alt ='summonerSpell1' className ="summonerSpell" src = {summonerSpellName1}></img>
                        </div>
                        <div className ='spell'>
                          <img height = '25px' alt ='summonerSpell2' className ="summonerSpell" src = {summonerSpellName2}></img>
                        </div>
                      </div>
                      <div className='summonerRune'>
                        <div className ='rune'>
                          <img height = '25px' alt ='summonerRune1' className ="summonerRune" src = {perkImg} ></img>
                        </div>
                        <div className ='rune'>
                          <img height = '25px' alt ='summonerRune2' className ="summonerRune" src = {perkSubStyleImg} ></img>
                        </div>
                      </div>
                      <div>
                        <span>{ championName }</span>
                      </div>
                    </div>
                  </div>
                  <div className = "KDA">
                    <div className="stat">
                      <span className="black">{ kills }</span> /
                      <span className="red"> { deaths }</span> /
                      <span className="black"> { assists }</span>
                    </div>
                    <div className ="statRatio">
                      <span> {kda.trim()} KDA </span>
                    </div>

                  </div>
                  <div className= "statsChamp" >
                    
                    <div className ='level'>
                      <span>Level {champLevel}</span>

                    </div>
                    
                    <div className ='cs'>
                      <span>{totalCs + " (" + totalCsPerMinute + ") CS" }</span>

                    </div>                  
                    <div className ='participationKills'>
                      <span> P/Kills {participationKills} %</span>
                    </div>

                  </div>
                  { items ? 
                    <div className ='summonerItemsList'>
                      <div className ='summonerItems'>
                        <div >

                          <div className = "summonerItem" >
                               <img height = '25px' alt ='summonerItem' className="item" src = {items[0]} />
                          </div>                  
                          <div className = "summonerItem" >
                               <img height = '25px' alt ='summonerItem' className ="item" src = {items[1]} />
                          </div>                  
                          <div className = "summonerItem" >
                               <img height = '25px' alt ='summonerItem' className ="item" src = {items[2]} />
                          </div>     
                          <div className = "summonerItem" >
                               <img height = '25px' alt ='summonerItem' className ="item" src = {items[6]} />
                          </div> 
                        </div> 
                        <div>
                          <div className = "summonerItem" >
                               <img height = '25px' alt ='summonerItem' className ="item" src = {items[3]} />
                          </div>                  
                          <div className = "summonerItem" >
                               <img height = '25px' alt ='summonerItem' className ="item" src = {items[4]} />
                          </div>                  
                          <div className = "summonerItem" >
                               <img height = '25px' alt ='summonerItem' className ="item" src = {items[5]} />
                          </div>
                        </div>
                      </div>
                  </div> : null }
               { visionWardsBoughtInGame >=0 && wardsPlaced >= 0 && wardsKilled >= 0 ? 
               <div className ="summonerWards" >
                  <div className='ward'>
                    <div>
                        <span>{visionWardsBoughtInGame}</span>
                     </div>
                    <div>
                      <span>{wardsPlaced + "/" + wardsKilled}</span>
                     </div>
                  </div>
               </div>
               : null }
                <div className = 'gameParticipant'>
                  <SummonerMatchItemParticipant key = {gameId + 'team1'}  id ={this.props.id} gameId = {gameId} team = { team1 }  />   
                  <SummonerMatchItemParticipant key = {gameId + 'team2'}  id ={this.props.id} gameId = {gameId}  team = { team2 }  /> 
                </div>  
                <div className = "dropDownMatch" >
                  <button onClick = {this.handleDropDownMatch}> <i className ="  glyphicon glyphicon-menu-down" ></i></button>
                </div>

              </div>
         : null } 

        </div>
         {toggleMatch ?
            <div className='col-xs-12'>
              <SummonerMatchItemInfo key = {gameId + 'team1Info'} team = {team1} id ={this.props.id} gameId = {gameId} datas = { sumMatchItemInfo } info = 'team1' />   
              <SummonerMatchItemInfo key = {gameId + 'team2Info'} team = {team2} id ={this.props.id} gameId = {gameId} datas = { sumMatchItemInfo }  info = 'team2' />   
            </div>
           : null}
      </div>  
    )
  }
}

export default SummonerMatchItem;
