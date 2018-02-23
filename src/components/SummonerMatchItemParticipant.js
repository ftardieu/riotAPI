
import React, { Component } from 'react';
import {  Row , Section ,Col} from 'react-materialize'
import api from '../riotAPI'
import SummonerLeague from './SummonerLeague'

class SummonerMatchItemParticipant extends Component {
  constructor(props){
    super(props)
  }
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
