
import champions from './champions.json'
import spells from './spells.json'

var config = require('./config')

class riotAPI {
	constructor(){
		this.version = null
		this.champions = null
		this.spells = null
		this.getVersion()
		this.setChampions()
		this.setSpells()
		this.locale = "en_GB"
		this.currentServer = localStorage.getItem('server') ? localStorage.getItem('server') : 'euw1'
        this.servers = {
            'euw1' : 'EUW',
            'ru' : 'RU',
            'kr' : 'KR',
            'br1' : 'BR',
            'oc1' : 'OC',
            'jp1' : 'JP',
            'na1' : 'NA',
            'eun1' : 'EUN',
            'la2' : 'LAS',
            'la1' : 'LAN'
		}
	}


	getGameMode(queueId){

		let queue = {
			420 : "Ranked Solo",
			440 : "Ranked Flex 5v5",
			470 : "Ranked Flex 3v3",
			450 : "ARAM",
			325 : "Normal",
			400 : "Normal",
			430 : "Normal",
			820 : "Co-op VS Bot"

		}
		return queue[queueId];
	}

	getServers(){
		return this.servers
	}

	getCurrentServer() {
		return this.currentServer;
	}

	setCurrentServer(key) {
		localStorage.setItem('server', key);
		this.currentServer = key;
	}

	setSpells = async () =>{
		this.spells = spells
		//  fetch(`https://{$server.api.riotgames.com/lol/static-data/v3/champions?champData=image&tags=image&api_key=${config.key}&dataById=true`)
		//  .then(res => res.ok ? res.json() : null)
		// .then(champions => this.champions = champions)
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

	 getSummonerByName = (name) => {
		return fetch(`https://${this.currentServer}.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=${config.key}`)
	}
	
	 getSummonerProfileIcon = (profileIconId) => {
		return `http://ddragon.leagueoflegends.com/cdn/${this.version}/img/profileicon/${profileIconId}.png`
	}

	 getSummonerLeague = (summonerId) => {
		return fetch(`https://${this.currentServer}.api.riotgames.com/lol/league/v3/positions/by-summoner/${summonerId}?api_key=${config.key}`)

	}	
	 getSummonerMatches = (accountId , startIndex, endIndex) => {
		return fetch(`https://${this.currentServer}.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?api_key=${config.key}&endIndex=${endIndex}&startIndex=${startIndex}`)

	}

	getSummonerMatch = (gameId) => {
		return fetch(`https://${this.currentServer}.api.riotgames.com/lol/match/v3/matches/${gameId}?api_key=${config.key}`)
	}

	getChampionById(championId){
		return this.champions ? this.champions.data[championId] : null;
	}

	getSpellById(spellsId){
		return this.spells ? this.spells.data[spellsId] : null;
	}

	getChampionImg(championName){
		return `http://ddragon.leagueoflegends.com/cdn/${this.version}/img/champion/${championName}`
	}

	getSummonerSpellImg(spellName){
		return `http://ddragon.leagueoflegends.com/cdn/${this.version}/img/spell/${spellName}`
	}

	getSummonerItemImg(item){
		return `http://ddragon.leagueoflegends.com/cdn/${this.version}/img/item/${item}`
	}

}	

	
const api = new riotAPI()
export default api;
