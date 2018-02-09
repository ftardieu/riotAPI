import React, { Component } from 'react';
import {  Icon , Row , Col  , Input , Section ,Button } from 'react-materialize'

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    }

  }

  componentDidMount() {

  }



  render() {
    return (
      <Section>
        <Row className='center'>
        <Col offset="s4" s={4}>
          <Row>
            <Input s={12} label="Name1"><Button className='right'><Icon>search</Icon></Button></Input>
          </Row>         
        </Col>

        </Row>
      </Section>
    );
  }
}

export default Home;
