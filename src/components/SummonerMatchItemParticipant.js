
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from '../App'

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
                        <img height = '25px' key= { gameId + participant[1] + i} alt ='championIcon' src = {participant[1]} />
                        <Link to={`/player/${participant[0]}`}>
                            <span key= { gameId + participant[0] + i} className  = { participant[2] ? 'target' : null}>
                                {participant[0]}
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
