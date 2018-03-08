import React, { Component } from 'react';
import { Image , Badge } from 'react-bootstrap';
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
    const { name, profileIconId, summonerLevel  } = this.props.sumData;
    const profileIcon  = api.getSummonerProfileIcon(profileIconId)
    return(
      <React.Fragment>
       <div className='summoner-info col-xs-12'>
           <div className="summoner-face">
               <Image className="summoner-icon" alt='profileIcon' src={profileIcon} thumbnail />
           </div>
           <div className="summoner-profile col-xs-8">
               <div>
                   <span className="summoner-name">{ name.length > 13 ? name.substr(0,12) + '...' : name }</span>
                   <Badge className="summoner-level">{summonerLevel}</Badge>
               </div>
               <SummonerLeague className="col-xs-12" sumLeagueInfo={sumLeagueInfo} id={id}/>
           </div>
       </div>

        { sumMatchList && sumMatchList.matches && sumMatchList.matches.length > 0  ? <SummonerMatch sumMatchList={sumMatchList} id={id} /> : <BlankComponent />}
      </React.Fragment>
    )
  }
}

export default Summoner;