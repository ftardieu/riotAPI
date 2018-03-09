import React, { Component } from 'react';
import api from '../riotAPI'
import SummonerLeague from './SummonerLeague'
import SummonerMatch from './SummonerMatch'

export const BlankComponent = () => <div>None</div>

class Summoner extends Component {
  constructor(props){
    super(props)
     this.getSummonerInfo( props.id ,  props.accountId)
  }
  state = {
    id: this.props.id,
    accountId : this.props.accountId,
    sumLeagueInfo: null,
    sumMatchList: null,
    startIndex : 0,
    endIndex : 1
  }


  getSummonerInfo = async(id,accountId, addCount = 1) => {
    const { endIndex , startIndex} = this.state

    const response = await api.getSummonerLeague('euw1', id)
    const sumLeagueInfo = await response.json()

    const response2 = await api.getSummonerMatches('euw1' , accountId , this.state.startIndex, this.state.endIndex)
    const sumMatchList = await response2.json()

    let indexE = endIndex + addCount
    let indexS = startIndex + addCount

    this.setState({ id , sumLeagueInfo , sumMatchList, endIndex : indexE , startIndex  : indexS })
  }    


  componentWillReceiveProps = async (nextProps) => {
    if(this.state.id !== nextProps.id){
      this.getSummonerInfo(nextProps.id, nextProps.accountId)
    }
  }
  
   handleClick = () => {
      this.getSummonerInfo(this.state.id , this.state.accountId)
  }


  render(){
    const { sumLeagueInfo ,id  , sumMatchList } = this.state
    const { name, profileIconId, summonerLevel  } = this.props.sumData;
    const profileIcon  = api.getSummonerProfileIcon(profileIconId)
    return(
      <React.Fragment>
       <div className="summoner-info">
           <div className="">
               <div className="summoner-face">
                   <img className="summoner-icon" alt='profileIcon' src={profileIcon}></img>
                   <span className="summoner-level">{summonerLevel}</span>
               </div>
               <span className="summoner-name">{ name.length > 13 ? name.substr(0,12) + '...' : name }</span>
           </div>
           <div className="summoner-profile">
               <div>
               </div>
               <div>
                   <SummonerLeague sumLeagueInfo={sumLeagueInfo} id={id}/>
               </div>
           </div>
       </div>

        { sumMatchList && sumMatchList.matches && sumMatchList.matches.length > 0  ? <div><SummonerMatch name = {this.state.name} sumMatchList={sumMatchList} id={id} /> <button onClick={this.handleClick} className ="btn btn-default" >Voir plus de match </button></div> : <BlankComponent />}

      </React.Fragment>
    )
  }
}

export default Summoner;