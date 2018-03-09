
import React, { Component } from 'react';
// import {  Row , Section ,Col} from 'react-materialize'
// import api from '../riotAPI'
// import SummonerLeague from './SummonerLeague'

class SummonerMatchItemParticipant extends Component {

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

    const { team , gameId } = this.props
    const style = {display: 'inline-block'}

    return(
      <React.Fragment>
      		
			<div style = {style} >
        <ul className = 'ulItemParticipant'>
	  			{team.map((participant,i) =>
	  				<React.Fragment key = {'react ' + gameId + i } >
            <li>
		  				<img height = '25px' key= { gameId + participant[1] + i} alt ='championIcon' src = {participant[1]}></img>
		  				<span 
                key= { gameId + participant[0] + i}
                className  = { participant[2] ? 'target' : null}
                > 
               
                {participant[0]}
              </span>
             </li>
	  				</React.Fragment>
          )}
          </ul>
			</div>
          
      			
      </React.Fragment>
    )
  }
}

export default SummonerMatchItemParticipant;
