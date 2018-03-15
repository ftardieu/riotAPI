import React, { Component } from 'react';
import { Image , Badge } from 'react-bootstrap';
import api from '../riotAPI'
import SummonerLeague from './SummonerLeague'
import SummonerMatch from './SummonerMatch'

export const BlankComponent = () => <div>None</div>

class Summoner extends Component {
  constructor(props){
    super(props)
    this.state.startIndex = 0
    this.state.endIndex = 1

  }
  state = {
    name : this.props.name,
    id: this.props.id,
    accountId : this.props.accountId,
    sumLeagueInfo: null,
    sumMatchList: null,
    startIndex : 0,
    endIndex : 1,
    addCount : 1 , 
    favorites : JSON.parse(localStorage.getItem('favorites'))
  }



  getsummonerLeagueInfo = async (id) => {

    const response = await api.getSummonerLeague('euw1', id)
    const sumLeagueInfo = await response.json()
    this.setState({  sumLeagueInfo })

  }

  getSummonerInfo = async(id,accountId, addCount = 0 , newSummoner = true) => {

    const { endIndex , startIndex} = this.state
    let indexE
    let indexS
    if (!newSummoner) {
      indexE = endIndex + addCount
      indexS = startIndex + addCount
    }else{
      indexE = 1
      indexS = 0
    }
    const response2 = await api.getSummonerMatches('euw1' , accountId , indexS, indexE)
    const sumMatchList = await response2.json()

    this.setState({ id ,accountId , sumMatchList, endIndex : indexE , startIndex  : indexS })
  }    

  componentWillMount = async() =>{
    this.getSummonerInfo( this.props.id ,   this.props.accountId)
    this.getsummonerLeagueInfo(  this.props.id )
  }
  componentWillReceiveProps = async (nextProps) => {
    if(this.state.id !== nextProps.id  ){
      this.getSummonerInfo(nextProps.id, nextProps.accountId)
      this.getsummonerLeagueInfo( nextProps.id )
    }
  }
  
   handleClick = () => {
      this.getSummonerInfo(this.state.id , this.state.accountId, this.state.addCount , false)
  }

    handleClickLocal = () => {
      var favorites = this.state.favorites || []
      let isFound = true
      let favoriteName =  this.props.sumData.name
      if (favorites && favorites.length > 0) {
        favorites.forEach(function(favoris){
        if(favoris === favoriteName){
          isFound = false
        }
      })
      }
      
      if (isFound) {
        favorites.push(this.props.sumData.name )
        localStorage.setItem('favorites' , JSON.stringify(favorites))
         this.setState({ favorites })
      }
    }

    isFavoris(){
      var favorites = this.state.favorites
      let isFound = false
      let favoriteName =  this.props.sumData.name
      if (favorites && favorites.length > 0) {
        favorites.forEach(function(favoris){
          if(favoris === favoriteName){
            isFound = true
          }
        })
      }

      return isFound
    }

    onClickDeleteLocal = async () => {
      let  favorites = this.state.favorites
      let newFavoris = []
      let favoriteName = this.props.sumData.name
      favorites.forEach(function(fav){
        if (fav !== favoriteName) {
            newFavoris.push(fav)
        }
      })
      localStorage.setItem('favorites' , JSON.stringify(newFavoris))
      this.setState({ favorites :  newFavoris})
    }

  render(){
    const { sumLeagueInfo ,id  , sumMatchList } = this.state;
    const { name, profileIconId, summonerLevel  } = this.props.sumData;
    const profileIcon  = api.getSummonerProfileIcon(profileIconId)
    return(
      <React.Fragment>
       <div className='summoner-info col-xs-12'>
           <div className="summoner-face">
               <Image className="summoner-icon" alt='profileIcon' src={profileIcon} thumbnail />
           </div>
           <div className="summoner-profile col-xs-8">
               <div className="summoner-information">
                   <span className="summoner-name">{ name.length > 13 ? name.substr(0,12) + '...' : name }</span>
                   <Badge className="summoner-level">{summonerLevel}</Badge>

                   {this.isFavoris() ? <button onClick={this.onClickDeleteLocal}><span className="glyphicon glyphicon-star"></span></button> : <button onClick={this.handleClickLocal}><span className="glyphicon glyphicon-star-empty"></span></button>}
               </div>
               <SummonerLeague className="col-xs-12" sumLeagueInfo={sumLeagueInfo} id={id}/>
           </div>
       </div>

        { sumMatchList && sumMatchList.matches && sumMatchList.matches.length > 0  ?
            <div className="col-xs-12">
                <SummonerMatch name = {name} sumMatchList={sumMatchList} id={id} />
                <button onClick={this.handleClick} className="btn btn-default" >More games.. </button>
            </div> :
            <BlankComponent />}

      </React.Fragment>
    )
  }
}

export default Summoner;