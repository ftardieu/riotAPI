
import React, { Component } from 'react';
import {  Link } from "react-router-dom";
import SummonerMatchItemInfoParticipant from './SummonerMatchItemInfoParticipant'


class SummonerMatchItemInfo extends Component {

  state = {
    dataParticipant : this.props.datas
  }

   getSummonerInfoMatch = async ( gameId) => {

  }   

  componentWillReceiveProps = async (nextProps) => {
    if(this.state.id !== nextProps.id){

    }
  }
  
  componentWillMount = async () => {

  }


  render(){

    const { datas ,team ,info  } = this.props
    console.log(team)
    return(
      <React.Fragment>


        { info === 'team1' ? 
          <div className ='row'>
             <table id = { team && team[0][4] ?  'tableSum1' : 'tableSum2' } className ="table table-bordered table-hover">
             <thead>
              <tr>
                <th className ='nameTableSum' >{ team && team[0][4] ? 'Victory' : 'Defeat'} (Blue team) -- { team ? team[0][5] +'/' + team[0][6] +'/' + team[0][7] : null }</th>
                <th className ='itemTableSum'>Item</th>
                <th className ='kdaTableSum'>KDA</th>
                <th className ='damageTableSum'>Damage</th>
                <th className ='csTableSum'>CS</th>
                <th className ='goldTableSum'>Gold</th>
              </tr>
              </thead>
               {team ? team.map((value, i1) => 
                 <tbody key = {'table' + i1} >
                    <SummonerMatchItemInfoParticipant key = {i1} data = {datas.participants[value[0]-1]} teamId = {team} team = {value} /> 
                  </tbody>
                ) : null }
            

           </table>

          </div>
            
        : 
        <div className ='row' >
          <table id = { team && team[5][4] ?  'tableSum1' : 'tableSum2' } className ="table table-bordered table-hover">
          <thead>
          <tr>
              <th className ='nameTableSum' >{ team && team[5][4] ? 'Victory' : 'Defeat'} (Red team) -- { team ? team[5][5] +'/' + team[5][6] +'/' + team[5][7] : null }</th>
              <th className ='itemTableSum'>Item</th>
              <th className ='kdaTableSum'>KDA</th>
              <th className ='damageTableSum'>Damage</th>
              <th className ='csTableSum'>CS</th>
              <th className ='goldTableSum'>Gold</th>
          </tr>
          </thead>

             {team ? team.map((value, i2) => 
                 <tbody key = {'table' + i2}>
                  <SummonerMatchItemInfoParticipant key = {i2} data = {datas.participants[value[0]-1]} teamId = {team} team = {value} /> 
                  </tbody>
              ) : null }
           </table>
        </div>


        }


      </React.Fragment>
    )
  }
}

export default SummonerMatchItemInfo;

//  