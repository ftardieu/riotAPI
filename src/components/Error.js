import React, { Component } from 'react';
import {  Section , Row } from 'react-materialize'
import {staticDataServer} from '../config' ;

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
    
    return (
      <Section>
        <Row >
          <h3>Summoner not found on {staticDataServer}</h3>
       </Row>
      </Section>
    );
  }
}

export default Error;
