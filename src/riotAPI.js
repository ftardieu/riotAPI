
var config = require('./config')
class riotAPI {
	constructor(){
		this.version = null
		this.getVersion()
		this.locale = "fr_FR"
	}

	getVersion = async () => {
		fetch('https://ddragon.leagueoflegends.com/api/versions.json')
		.then(res => res.json())
		.then(version => this.version = version[0])

	}

	 getSummonerByName = ( server, name ) => {
		return fetch(`https://${server}.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=${config.key}`)
	}
	
	 getSUmmonerProfileIcon = (profileIconId) => {
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


	getChampionInfo(championId , champData , tags ){
		return fetch(`https://{server}.api.riotgames.com/lol/static-data/v3/champions/${championId}?champData=${champData}&version=${this.version}&tags=${tags}`)
	}

	getChampionImg(championName){
		return `http://ddragon.leagueoflegends.com/cdn/${this.version}/img/champion/${championName}.png`
	}


}	


const api = new riotAPI()
export default api;
