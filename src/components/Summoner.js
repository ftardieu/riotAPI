import React, { Component } from 'react';
import {  Row , Section } from 'react-materialize'
import api from '../riotAPI'
import SummonerLeague from './SummonerLeague'
import SummonerMatch from './SummonerMatch'

export const BlankComponent = () => <div>None</div>

class Summoner extends Component {

  state = {
    id: this.props.id,
    accountId : this.props.accountId,
    sumLeagueInfo: null,
    sumMatchList: null,
    startIndex : 0,
    endIndex : 5
  }

  getSummonerLeague = async (id) => {
    const response = await api.getSummonerLeague('euw1', id)
    const sumLeagueInfo = await response.json()
    this.setState({ id: id, sumLeagueInfo  })
  }

  getSummonerMatches = async(accountId) => {
    const response = await api.getSummonerMatches('euw1' , accountId , this.state.startIndex, this.state.endIndex)
    const sumMatchList = await response.json()
    this.setState({ sumMatchList  })
    console.log(sumMatchList);
  }

  componentWillReceiveProps = async (nextProps) => {
    if(this.state.id !== nextProps.id){
      this.getSummonerLeague(nextProps.id)
      this.getSummonerMatches(nextProps.accountId)
    }
  }
 

 componentDidMount = async () => {
     this.getSummonerLeague(this.props.id)
     this.getSummonerMatches(this.props.accountId)
  }


  render(){
    const { sumLeagueInfo ,id  , sumMatchList } = this.state
    const { name , profileIconId , revisionDate,summonerLevel  } = this.props.sumData;
    const profileIcon  = api.getSUmmonerProfileIcon(profileIconId)
    console.log(this.props.sumData);
    return(
      <React.Fragment>
        <Section>
           <Row >
            <span>{name}</span>
            <img alt = 'profileIcon' src = {profileIcon}></img>
            <p>{revisionDate}</p>
            <p>{summonerLevel}</p>
            { sumLeagueInfo && sumLeagueInfo.length > 0  ? <SummonerLeague sumLeagueInfo={sumLeagueInfo} id={id}/> : <BlankComponent />}   
            { sumMatchList && sumMatchList.length > 0  ? <SummonerMatch sumMatchList={sumMatchList} id={id} /> : <BlankComponent />}   

           </Row>
        </Section>
      </React.Fragment>
    )
  }
}

export default Summoner;