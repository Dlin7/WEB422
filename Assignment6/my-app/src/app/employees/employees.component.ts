import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../data/employee.service";
import { PositionService } from "../data/position.service";
import { DatePipe } from '@angular/common';

import { Employee } from "../data/vm-typicode";
import { Router } from "@angular/router";
 
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  getEmployeesSub: any;
  loadingError = false;
  filteredEmployees: Employee[]

  constructor(private m: EmployeeService, private router: Router) { }

  ngOnInit() {
    try {
      this.getEmployeesSub = this.m.getEmployees().subscribe(employees => {
        this.employees = employees;
        this.filteredEmployees = employees;
      })
    }
    catch(err) {
      this.loadingError = true;
    }
  }

  ngOnDestroy() {
    if (this.getEmployeesSub) {
      this.getEmployeesSub.unsubscribe();
    }
  }

  routeEmployee(id: String) {
    this.router.navigate(['/employee', id]);
  }

  onEmployeeSearchKeyUP(event:any) {
    this.filteredEmployees = this.employees.filter((employee) => {
      return employee.FirstName.toLowerCase().includes(event.target.value) 
      || employee.LastName.toLowerCase().includes(event.target.value)
      || employee.Position.PositionName.toLowerCase().includes(event.target.value);
    });
  }

}
