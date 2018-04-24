import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';
import MainContainer from './MainContainer';

class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        }
    }

    componentDidMount() {    
        axios.get("http://warm-ocean-35680.herokuapp.com/teams").then((res) => {
            this.setState({
              teams: res.data,
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
                      <th>Projects</th>
                      <th>Employees</th>
                      <th>TeamLead</th>
                    </tr>
                    {this.state.teams.map((team, index) => {
                        return (
                        <tr>
                            <td key={index}>{team.TeamName}</td>
                            <td key={index}>
                            {team.Projects.map((project, index) => {
                                return (
                                    <li key={index}>{project.ProjectName}</li>
                                );
                            })}
                            </td>
                            <td key={index}>{team.Employees.length} Employees</td>
                            <td key={index}>{team.TeamLead.FirstName} {team.TeamLead.LastName}</td>
                        </tr>
                        );
                    })}

                  );

                
              </tbody>
            </table>


        </MainContainer>
      );
    }
}
  
  export default Teams;


