import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';
import MainContainer from './MainContainer';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }

    componentDidMount() {    
        axios.get("http://warm-ocean-35680.herokuapp.com/projects").then((res) => {  
        this.setState({
              projects: res.data,
              dataLoaded: true
            })
        }).catch((err) => {
            this.setState({
              dataLoaded: true
            })
        });
    }

    render() {
      return (
        <MainContainer sidebar={this.props.title}>

          <h1 className="page-header">{this.props.title}</h1>


            <table className="table table-striped table-bordered">
              <tbody>

                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                    </tr>
                    { this.state.projects.map((project, index) => {
                            return (
                                <tr>
                                <td key={index}>{project.ProjectName}</td>
                                <td key={index}>{project.ProjectDescription}</td>
                                <td key={index}>{project.ProjectStartDate}</td>
                                <td key={index}>{project.ProjectEndDate}</td>
                                </tr>
                            );
                    })}
              </tbody>
            </table>
          
 
        </MainContainer>
  
      );
    }
  }
  
  export default Projects;

