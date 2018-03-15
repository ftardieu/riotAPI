import React, { Component } from 'react';
import {  Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import api from '../riotAPI'
class SummonerMatchItemInfoParticipant extends Component {

	state = {
		id : this.props.id,
		gameId : this.props.gameId,
		isTeam1 : null,
		data : this.props.data,
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
		toggleMatch : false,
		goldEarned : null
	}

	getSummonerInfoMatch = async ( gameId) => {

	}   

	componentWillReceiveProps = async (nextProps) => {
		if(this.state.id !== nextProps.id){
		}
	}

	componentWillMount = async() =>{
		const { data } = this.state
		let sumTeam1Kills = 0
		let sumTeam2Kills = 0

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
		let goldEarned

		let isWin = data.stats.win
		let champion = await api.getChampionById(data.championId)
		let iconName = champion.image.full
		iconName = api.getChampionImg(iconName)
 		var championName = champion.name


        isSummonerWin = isWin
        summonerIcon = iconName

        let spell1 = await api.getSpellById(data.spell1Id)
        let spellName1 = spell1.image.full 
        summonerSpellName1 = api.getSummonerSpellImg(spellName1)

        let spell2 = await api.getSpellById(data.spell2Id)
        let spellName2 = spell2.image.full
        summonerSpellName2 = api.getSummonerSpellImg(spellName2)

        perk = data.stats.perk0
        perkSubStyle = data.stats.perkSubStyle

        kills = data.stats.kills
        deaths = data.stats.deaths
        assists = data.stats.assists
        goldEarned = data.stats.goldEarned

        champLevel = data.stats.champLevel
        items = []

        for (let j = 0; j < 7; j++) {
            let item = '../images/opacity.png';
            if(data.stats['item'+j])
              item = api.getSummonerItemImg(data.stats['item'+j] + '.png');
            items.push(item);
        }

        csNumber =  data.stats.totalMinionsKilled  
        csNumberNeutral =  data.stats.neutralMinionsKilled  
        isTeam1 = data.teamId === 100
        totalDamageDealtToChampions = data.stats.totalDamageDealtToChampions

        visionWardsBoughtInGame = data.stats.visionWardsBoughtInGame

        wardsKilled = data.stats.wardsKilled

        wardsPlaced = data.stats.wardsPlaced

        this.setState({   isSummonerWin ,summonerIcon , summonerSpellName1 , summonerSpellName2 , perk , perkSubStyle , kills ,deaths,assists , champLevel ,
         items  , csNumber, csNumberNeutral , sumTeam1Kills , sumTeam2Kills , isTeam1 , wardsPlaced  ,wardsKilled , visionWardsBoughtInGame, championName , totalDamageDealtToChampions , goldEarned})
	}

	render(){
	    const { gameId , data, isSummonerWin , summonerIcon , summonerSpellName1 , summonerSpellName2  , perk , perkSubStyle , kills ,deaths ,assists , champLevel , 
	     items , csNumber , csNumberNeutral , isTeam1 , sumTeam1Kills , sumTeam2Kills  , wardsPlaced , wardsKilled  , visionWardsBoughtInGame, championName , toggleMatch , totalDamageDealtToChampions , goldEarned} = this.state
		const {  team ,gameDuration} = this.props
	    if (data) {
	      var quotient = Math.floor(gameDuration/60);
	      var remainder = gameDuration % 60;
	      var gameResult =  isSummonerWin ? 'Victory' : 'Defeat' 
	      var gameMode = api.getGameMode(data.queueId)
	      
	      var perkImg = "../images/perk/" + perk +'.png'
	      var perkSubStyleImg = "../images/perkStyle/" + perkSubStyle + '.png'

	      var kda = deaths > 0 ? ((kills+assists) / deaths ).toFixed(2) +":1" : "Perfect"
	      var totalCs = csNumber + csNumberNeutral
	      var totalCsPerMinute = (totalCs / quotient).toFixed(1)

	      var participationKills = isTeam1 ? Math.round( (kills + assists) / sumTeam1Kills *100 )  :  Math.round( (kills + assists) / sumTeam2Kills *100 )
	    }

        const tooltip = (
			<Tooltip id="tooltip">
				<span>{ championName }</span>
			</Tooltip>
        );


		return(
			<React.Fragment>

				<tr className="participant-row">
					<td>
						<div className = "gameSettingInfo">
							  <div className ='summoner-champ-summary'>
								  <OverlayTrigger placement="right" overlay={tooltip}>
									<img height = '32px' alt ='championIcon' className ="summonerIcon" src = {summonerIcon}/>
								  </OverlayTrigger>
								  <div className ='summoner-level-summary'>
									  <span>{champLevel}</span>
								  </div>
							  </div>
							  <div className ="summoner-spell-summary">
								<div className ='spell'>
								  <img height = '20px' alt ='summonerSpell1' className ="summonerSpell" src = {summonerSpellName1}/>
								</div>
								<div className ='spell'>
								  <img height = '20px' alt ='summonerSpell2' className ="summonerSpell" src = {summonerSpellName2}/>
								</div>
							  </div>
							  <div className='summoner-rune-summary'>
								<div className ='rune'>
								  <img height = '20px' alt ='summonerRune1' className ="summonerRune" src = {perkImg} />
								</div>
								<div className ='rune'>
								  <img height = '20px' alt ='summonerRune2' className ="summonerRune" src = {perkSubStyleImg} />
								</div>
							  </div>
							</div>
						<div className ={ 'summonerName ' + (team[3] ? 'target' : '')} > {team[1]}</div>
					</td>

					<td>
						{items ? 
		                    <div className ='summoner-items-list'>
	                      		<div className ='summoner-items'>
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
							</div> : null }
					</td>
					<td>
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


					</td>
					<td>{ totalDamageDealtToChampions }</td>
					<td>
	                    <div className= "statsChamp" >
		                    <div className='cs'>
		                      <span>{totalCs + " (" + totalCsPerMinute + ") CS" }</span>
		                    </div>                  
		                    <div className ='participationKills'>
		                      <span> P/Kills {participationKills} %</span>
		                    </div>

                  		</div>
					</td>
					<td>{ goldEarned }</td>
				</tr>
			</React.Fragment>
		)
	}
}

export default SummonerMatchItemInfoParticipant;
