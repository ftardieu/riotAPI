
import champions from './champions.json'

var config = require('./config')

class riotAPI {
	constructor(){
		this.version = null
		this.champions = null
		this.getVersion()
		this.setChampions()
		this.locale = "en_GB"
		this.servers = [
			{'euw1' : 'EUW'},
			{'ru' : 'RU'},
			{'kr' : 'KR'},
			{'br1' : 'BR'},
			{'oc1' : 'OC'},
			{'jp1' : 'JP'},
			{'na1' : 'NA'},
			{'eun1' : 'EUN'},
			{'la2' : 'LAS'},
			{'la1' : 'LAN'}
		]
		console.log()
	}

	getServers(){
		return this.servers
	}

	setChampions = async () =>{
		this.champions = champions
		//  fetch(`https://{$server.api.riotgames.com/lol/static-data/v3/champions?champData=image&tags=image&api_key=${config.key}&dataById=true`)
		//  .then(res => res.ok ? res.json() : null)
		// .then(champions => this.champions = champions)
	}

	getVersion = async () => {
		const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json')
		const [ lastVersion ] = await res.json()
		this.version = lastVersion
	}

	 getSummonerByName = ( server, name ) => {
		return fetch(`https://${server}.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=${config.key}`)
	}
	
	 getSummonerProfileIcon = (profileIconId) => {
		return `http://ddragon.leagueoflegends.com/cdn/${this.version}/img/profileicon/${profileIconId}.png`
	}

	 getSummonerLeague = (server,summonerId) => {
		return fetch(`https://${server}.api.riotgames.com/lol/league/v3/positions/by-summoner/${summonerId}?api_key=${config.key}`)

	}	
	 getSummonerMatches = (server,accountId , startIndex, endIndex) => {
		return fetch(`https://${server}.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?api_key=${config.key}&endIndex=${endIndex}&startIndex=${startIndex}`)

	}

	getSummonerMatch(server , gameId){
		return fetch(`https://${server}.api.riotgames.com/lol/match/v3/matches/${gameId}?api_key=${config.key}`)
	}


	getChampionById(championId){
		return this.champions ? this.champions.data[championId] : null;
	}

	getChampionImg(championName){
		return `http://ddragon.leagueoflegends.com/cdn/${this.version}/img/champion/${championName}`
	}


}	


const api = new riotAPI()
export default api;
