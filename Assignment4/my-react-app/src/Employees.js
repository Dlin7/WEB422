import React, { Component } from 'react'
import axios from 'axios'
import Moment from 'moment'
import MainContainer from './MainContainer';

class Employees extends Component {
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
          <MainContainer sidebar={this.props.title}>  
            <h1 className="page-header">{this.props.title}</h1>

              <table className="table table-striped table-bordered">
                <tbody>
                    <tr>
                        <th>Name & Position</th>
                        <th>Address</th>
                        <th>Phone Num</th>
                        <th>Hire Date</th>
                        <th>Salary Bonus</th>
                    </tr> 
                    {this.state.employees.map((employee, index) => {
                      return (
                        <tr>
                          <td key={index}>{employee.FirstName} {employee.LastName} - {employee.Position.PositionName}</td>
                          <td key={index}>{employee.AddressStreet}, {employee.AddressCity}, {employee.AddressState}, {employee.AddressZip}</td>
                          <td key={index}>{employee.PhoneNum} ext {employee.Extension}</td>
                          <td key={index}>{Moment(employee.HireDate).format('LL')}</td>
                          <td key={index}>${employee.SalaryBonus}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

           

          </MainContainer>
        );
    }
}

export default Employees;
