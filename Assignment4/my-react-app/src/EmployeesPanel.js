import React, { Component } from 'react'
import axios from 'axios'
import Moment from 'moment'

class EmployeesPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        axios.get("http://warm-ocean-35680.herokuapp.com/employees").then((res) => {
            this.setState({
              employees: res.data,
              dataLoaded: true
            })
        }).catch((err) => {
            this.setState({
              dataLoaded: true
            })
        });
    }

    render() {
        return(
          <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Employees</h3>
          </div>
          <div className="panel-body">
            <div className="table-responsive overview-table">
              <table className="table table-striped table-bordered">
                <tbody>
                    {this.state.employees.map((employee, index) => {
                      return (
                        <tr>
                          <td key={index}>{employee.FirstName} {employee.LastName}</td>
                          <td key={index}>{employee.Position.PositionName}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <a href="/employees" className="btn btn-primary form-control">View All Employee Data</a>
          </div>
          </div>
        );
    }
}

export default EmployeesPanel;
