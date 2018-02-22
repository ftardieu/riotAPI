
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
    const { team , teamId } = this.props
    const style = {display: 'inline-block'}
    return(
      <React.Fragment>
      		
			<div style={style} >
	  			{team.map((participant,i) =>
	  				<p key={i}>{participant}</p>
	  			)}
			</div>
          
      			
      </React.Fragment>
    )
  }
}

export default SummonerMatchItemParticipant;
