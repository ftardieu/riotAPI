import React, { Component } from 'react';
import {  Row , Section } from 'react-materialize'
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
    endIndex : 5
  }


   getSummonerInfo = async(id,accountId) => {
    const response = await api.getSummonerLeague('euw1', id)
    const sumLeagueInfo = await response.json()

    const response2 = await api.getSummonerMatches('euw1' , accountId , this.state.startIndex, this.state.endIndex)
    const sumMatchList = await response2.json()


     this.setState({ id , sumLeagueInfo , sumMatchList  })
  }    


  componentWillReceiveProps = async (nextProps) => {
    if(this.state.id !== nextProps.id){
      this.getSummonerInfo(nextProps.id, nextProps.accountId)
    }
  }
 



  render(){
    const { sumLeagueInfo ,id  , sumMatchList } = this.state
    const { name , profileIconId , revisionDate,summonerLevel  } = this.props.sumData;
    const profileIcon  = api.getSUmmonerProfileIcon(profileIconId)
    

    return(
      <React.Fragment>
        <Section>
           <Row >
            <span>{name}</span>
            <img alt = 'profileIcon' src = {profileIcon}></img>
            <p>{revisionDate}</p>
            <p>{summonerLevel}</p>
            { sumLeagueInfo && sumLeagueInfo.length > 0  ? <SummonerLeague sumLeagueInfo={sumLeagueInfo} id={id}/> : <BlankComponent />}   
            { sumMatchList && sumMatchList.matches.length > 0  ? <SummonerMatch sumMatchList={sumMatchList} id={id} /> : <BlankComponent />}   

           </Row>
        </Section>
      </React.Fragment>
    )
  }
}

export default Summoner;