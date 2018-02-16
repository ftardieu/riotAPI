import React, { Component } from 'react';
import {  Section , Row } from 'react-materialize'

class Summoner extends Component {

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
    const { name , profileIconId , revisionDate,summonerLevel  } = this.props.SummonerDatas;
    return (
      <Section>
         <Row >
          <span>{name}</span>
          <p>{profileIconId}</p>
          <p>{revisionDate}</p>
          <p>{summonerLevel}</p>
       </Row>
      </Section>
    );
  }
}

export default Summoner;
