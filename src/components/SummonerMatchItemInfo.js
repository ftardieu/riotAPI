
import React, { Component } from 'react';
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

    const { datas ,team ,info  ,id, maxDamage } = this.props
    const gameDuration = datas.gameDuration

    return(
      <React.Fragment>


        { info === 'team1' ? 
          <div className ='row'>
            <table className= { "table table-bordered table-hover table-participants " + (team && team[0][4] ?  'table-participants-1' : 'table-participants-2') }>
             <thead>
              <tr>
                <th className ='name-table-summary' >{ team && team[0][4] ? 'Victory' : 'Defeat'} (Blue team) -- { team ? team[0][5] +'/' + team[0][6] +'/' + team[0][7] : null }</th>
                <th className ='item-table-summary'>Item</th>
                <th className ='kda-table-summary'>KDA</th>
                <th className ='damage-table-summary'>Damage</th>
                <th className ='cs-table-summary'>CS</th>
                <th className ='gold-table-summary'>Gold</th>
              </tr>
              </thead>
                 <tbody key = {'table' } >
               {team ? team.map((value, i1) => 
                    <SummonerMatchItemInfoParticipant id = {id} key = {i1} sumKill = {team[0][5]} data = {datas.participants[value[0]-1]} maxDamage={maxDamage} teamId = {team} gameDuration = {gameDuration} team = {value} />
                ) : null }
                  </tbody>
            

           </table>

          </div>
            
        : 
        <div className ='row' >
          <table className= { "table table-bordered table-hover table-participants " + (team && team[5][4] ?  'table-participants-1' : 'table-participants-2') }>
          <thead>
          <tr>
              <th className ='name-table-summary' >{ team && team[5][4] ? 'Victory' : 'Defeat'} (Red team) -- { team ? team[5][5] +'/' + team[5][6] +'/' + team[5][7] : null }</th>
              <th className ='item-table-summary'>Item</th>
              <th className ='kda-table-summary'>KDA</th>
              <th className ='damage-table-summary'>Damage</th>
              <th className ='cs-table-summary'>CS</th>
              <th className ='gold-table-summary'>Gold</th>
          </tr>
          </thead>
                 <tbody key = {'table2' }>
             {team ? team.map((value, i2) => 
                  <SummonerMatchItemInfoParticipant id = {id} key = {i2} sumKill = {team[5][5]} data = {datas.participants[value[0]-1]} maxDamage={maxDamage} gameDuration = {gameDuration} teamId = {team} team = {value} />
              ) : null }
                  </tbody>
           </table>
        </div>


        }


      </React.Fragment>
    )
  }
}

export default SummonerMatchItemInfo;

//  