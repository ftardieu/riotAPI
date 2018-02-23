
import React, { Component } from 'react';
// import {  Row , Section ,Col} from 'react-materialize'
// import api from '../riotAPI'
// import SummonerLeague from './SummonerLeague'

class SummonerMatchItemParticipant extends Component {
<<<<<<< HEAD
  constructor(props){
    super(props)
  }
=======

>>>>>>> 395d64b8f1d5bff6688a8d470daf0e1fb3b4cfa9
  state = {
    sumMatchItemInfo:null
  }

   getSummonerInfoMatch = async ( gameId) => {

  }   

  componentWillReceiveProps = async (nextProps) => {
    if(this.state.id !== nextProps.id){

    }
  }
 


  render(){

    const { team } = this.props
    const style = {display: 'inline-block'}
    console.log(team);
    return(
      <React.Fragment>
      		
			<div style={style} >
	  			{team.map((participant,i) =>
	  				<React.Fragment key = {'react ' + gameId + i } >
		  				<img height = '25px' key= { gameId + participant[1] + i} alt ='championIcon' src = {participant[1]}></img>
		  				<span 
                key= { gameId + participant[0] + i}
                className  = { participant[2] ? 'target' : null}
                > 
                
                {participant[0]}
              </span>
	  				</React.Fragment>
	  			)}
			</div>
          
      			
      </React.Fragment>
    )
  }
}

export default SummonerMatchItemParticipant;
