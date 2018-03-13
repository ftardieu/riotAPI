
import React, { Component } from 'react';
import {  Link } from "react-router-dom";

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
            <ul className='ulItemParticipant'>
              {team.map((participant,i) =>
                  <React.Fragment key = {'react ' + gameId + i } >
                    <li>
                        <img height = '16px' key= { gameId + participant[2] + i} alt ='championIcon' src = {participant[2]} />
                        <Link to={`/player/${participant[1]}`}>
                            <span key= { gameId + participant[1] + i} className  = { participant[3] ? 'target' : null}>
                                {participant[1]}
                            </span>
                        </Link>
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
