import React, { Component } from 'react'
import MainContainer from './MainContainer';
import ProjectsPanel from './ProjectsPanel';
import TeamsPanel from './TeamsPanel';
import EmployeesPanel from './EmployeesPanel';


class Overview extends Component {
    render() {
      return(
        <MainContainer sidebar={this.props.title}>
          <h1 className="page-header">Overview</h1>
          <div className="row">
            <div className="col-md-4">
              <ProjectsPanel title="Projects"/>
            </div>
            <div className="col-md-4">
              <TeamsPanel title="Teams"/>
            </div>
            <div className="col-md-4">
              <EmployeesPanel title="Employees"/>
            </div>
          </div>
      
        </MainContainer>
      );
    }
}

export default Overview;