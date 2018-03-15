import React, { Component } from 'react';
import {staticDataServer} from '../config' ;
import api from '../riotAPI'

class Error extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  handleChange = (event) => {
   
  }

  handleSubmit = (event) => {
    
  }

  componentDidMount() {

  }



  render() {
    const currentServer = api.getServers()[api.getCurrentServer()]
    return (
        <h3>Summoner not found on {currentServer}</h3>
    );
  }
}

export default Error;
