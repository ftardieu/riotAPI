import React, { Component } from 'react'
import { Navbar,  FormControl } from 'react-bootstrap';
import Summoner from './Summoner'
import SummonerError from './Error'
import api from '../riotAPI'

import {  Link } from "react-router-dom";

class Home extends Component {
  constructor(props){
    super(props)
    this.makeRequest(props.match.params.playerName)

   }
    state = {
        name: "",
        sumData: null,
        error:false,
        valid: false,
        summonerName: "",
        favorites : JSON.parse(localStorage.getItem('favorites'))
    }

    componentWillReceiveProps = async (nextProps) => {

        if(this.state.summonerName !== nextProps.match.params.playerName){
            this.makeRequest(nextProps.match.params.playerName)
        }
    }


    handleEnterKey = (e) => {
      if (e.key === 'Enter') {
        this.props.history.push('/player/'+ this.state.name)        }
      }

    handleClick = () => {
        const { name } = this.state
        this.props.history.push('/player/'+ name)
    }




    makeRequest = async (name) =>{
        if(name) {
            var error = this.state.error;
            var sumData = this.state.sumData;
            const response = await api.getSummonerByName("euw1",name);
            const statutResponse = response.ok ;
            if (statutResponse) {
                sumData = await response.json()
                error = false;
            }else{
                sumData = "";
                error = true;
            }

            this.setState({ sumData , error, valid: !error, summonerName: name, name : ""})
        }

    }

    onClickDeleteLocal(favoris){
     let  favorites = JSON.parse(localStorage.getItem('favorites'))
     let newFavoris = []
      favorites.forEach(function(fav){
        if (fav !== favoris) {
            newFavoris.push(fav)
        }
      })
      localStorage.setItem('favorites' , JSON.stringify(newFavoris))
      this.setState({ favorites :  newFavoris})
    }

  render(){
    const { name, sumData, error, valid , favorites} = this.state
    return(
      <React.Fragment>
        <Navbar collapseOnSelect>
          <Navbar.Header className = 'col-xs-3'>
            <Navbar.Brand>
              <a href="/">RiotAPI</a>
            </Navbar.Brand>
          </Navbar.Header>
            { valid ?
                <Navbar.Form className='input-group' eventkey={1} href="#">
                  <FormControl
                      required
                      autoFocus="true"
                      type="text"
                      value = { name }
                      onKeyPress={this.handleEnterKey}
                      placeholder="Your summoner name.."
                      onChange={(e) => this.setState({ name: e.target.value })}
                  />
                  <div className="input-group-btn btn-search" >
                    <button onClick={this.handleClick} className ="btn btn-default" ><i className="glyphicon glyphicon-search" /></button>
                  </div>
                </Navbar.Form>
                : null }
        </Navbar>

        <div className="container">
            { !valid ?
              <div>
                  <img src="https://i.pinimg.com/originals/04/e6/96/04e696bacd8524e9da6f641727800e14.png" style={{height:"350px", margin: "0 auto",display: "block"}}/>
                <div className="input-group col-lg-6 col-lg-offset-3 add-on">
                  <FormControl
                      required
                      autoFocus="true"
                      type="text"
                      value = { name }
                      onKeyPress={this.handleEnterKey}
                      placeholder="Your summoner name.."
                      onChange={(e) => this.setState({ name: e.target.value })}
                  />
                  <div className="input-group-btn">
                    <button onClick={this.handleClick} className ="btn btn-default" ><i className="glyphicon glyphicon-search" /></button>
                  </div>
                  

                </div> 
                <div className ='col-lg-offset-4 col-lg-4'>
                 {favorites && favorites.length > 0  ?  <div className ='col-lg-12 '><span>Favoris : </span></div> :null }
                  {favorites ? favorites.map((favoris,i) => 
                    <div className ='col-lg-4 ' key = {i} >
                      <Link to={`/player/${favoris}`}>
                        <span >{favoris}</span>
                      </Link>
                      <button onClick={(e) => this.onClickDeleteLocal(favoris)} ><i className = 'glyphicon glyphicon-star' /></button>
                    </div>
                  )  
                  : null }
                </div>
              </div>

                : null }
            {sumData ? <Summoner name= {name} sumData={sumData} id={sumData.id} accountId = {sumData.accountId} /> : null}
            {error ? <SummonerError /> : null}
        </div>
      </React.Fragment>
      )
  }
}

export default Home;
