import React, { Component } from 'react';
import MainContainer from './MainContainer';

class NotFound extends Component {
  render() {
    return (

        <div>
        <MainContainer>
            <h1 className="page-header">{this.props.title}</h1>
            Page Not Found
        </ MainContainer>
        </div>

    );
  }
}

export default NotFound;