import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../employee.service";
import { PositionService } from "../position.service";
import { DatePipe } from '@angular/common';

import { Employee } from "../vm-typicode";
 
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  getEmployeesSub: any;
  loadingError = false;

  constructor(private m: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  ngOnDestroy() {
    if (this.getEmployeesSub) {
      this.getEmployeesSub.unsubscribe();
    }
  }

  getEmployees(): void {
    try {
      this.getEmployeesSub = this.m.getEmployees().subscribe(employees => this.employees = employees)
    }
    catch(err) {
      this.loadingError = true;
    }
  }

}
