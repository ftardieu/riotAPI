import React, { Component } from 'react'
import { Navbar,  FormControl, Label, DropdownButton, MenuItem } from 'react-bootstrap';
import Summoner from './Summoner'
import SummonerError from './Error'
import api from '../riotAPI'

import { Link } from "react-router-dom";

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
        server: "euw1",
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

    changeServer = (serverKey) => {
        if(serverKey !== api.getCurrentServer()) {
            api.setCurrentServer(serverKey);
            this.makeRequest(this.state.summonerName, serverKey)
        }
    }


    makeRequest = async (name, server = this.state.server) =>{
        if(name) {
            var error = this.state.error;
            var sumData = this.state.sumData;
            const response = await api.getSummonerByName(name);
            const statutResponse = response.ok ;
            if (statutResponse) {
                sumData = await response.json()
                error = false;
            } else {
                sumData = "";
                error = true;
            }

            // = { sumData , error, valid: !error, summonerName: name, name : ""}

            this.setState({ sumData , error, valid: !error, summonerName: name, name : "", server: server})
        }

    }

    onClickDeleteLocal = (favoris) => {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
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
        const servers = api.getServers()
        const currentServer = api.getCurrentServer()
        return(
            <React.Fragment>
                <Navbar collapseOnSelect>
                    <Navbar.Header className='col-xs-6'>
                        <Navbar.Brand>
                            <a href="/">FAKER STATS (Anciennement RiotOPGG EZ)</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <div className="col-xs-6">
                        { valid ?
                            <div className="col-xs-12">
                                <DropdownButton title="Servers" key="1" id={`dropdown-basic-1`}>
                                    {servers ? Object.keys(servers).map((key, index) =>
                                        <MenuItem eventKey={index} key={key} onClick={() => this.changeServer(key)} className={ key === currentServer ? "active" : "" } >{servers[key]}</MenuItem>
                                    ) : null}
                                </DropdownButton>
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
                            </div>
                            : null }
                    </div>
                </Navbar>

                <div className="container">
                    { !valid ?
                        <div>
                            <img src="https://i.pinimg.com/originals/04/e6/96/04e696bacd8524e9da6f641727800e14.png" style={{height:"350px", margin: "0 auto",display: "block"}}/>
                            <div className="col-lg-12" style={{ textAlign: "center", marginBottom: "10px" }}>
                                {servers ? Object.keys(servers).map((key, index) =>
                                    <div key={index} style={{ display: "inline-block"}} onClick={() => this.changeServer(key)}>
                                        <Label className={ currentServer === key ? 'label-info' : ''}>{servers[key]}</Label>
                                    </div>
                                  ) : null}
                            </div>
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
                            <div className ='col-lg-offset-3 col-lg-3'>
                                <div className="panel panel-default">
                                    <div className="panel-heading">Favoris</div>
                                    <ul className="list-group">
                                        {favorites ? favorites.map((favoris,i) =>
                                            <li className="list-group-item" key={i}>
                                                <Link to={`/player/${favoris}`}>
                                                    <span >{favoris}</span>
                                                </Link>
                                                <button className="fav-btn" onClick={() => {this.onClickDeleteLocal(favoris)}}><img className="fav-btn-img" src="https://vignette.wikia.nocookie.net/leagueoflegends/images/8/8f/Poro_Luv_Emote.png/revision/latest?cb=20170812223500"/></button>
                                            </li>
                                        ) : null }
                                    </ul>
                                </div>
                            </div>
                            <div className ='col-lg-3'>
                                <div className="panel panel-default">
                                    <div className="panel-heading">Recent searches</div>
                                    <ul className="list-group">
                                        <li className="list-group-item">No recent searches</li>
                                    </ul>
                                </div>
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
