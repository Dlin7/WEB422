import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';

class ProjectsPanel extends Component {
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
  
        <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.title}</h3>
        </div>
        <div className="panel-body">
          <div className="table-responsive overview-table">
            <table className="table table-striped table-bordered">
              <tbody>
              { this.state.projects.map((project, index) => {
                  console.log(project);
                  var days = Moment().diff([project.ProjectStartDate], 'days');

                  return (
                    <tr>
                      <td key={index}>{project.ProjectName}</td>
                      <td key={index}>Active {days} days</td>
                    </tr>
                  );
                })}
                
              </tbody>
            </table>
          </div>
          <a href="/projects" className="btn btn-primary form-control">View All Project Data</a>
        </div>
        </div>  
          
  
      );
    }
  }
  
  export default ProjectsPanel;

