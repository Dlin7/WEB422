import { Component, OnInit } from '@angular/core';
import { EmployeeRaw } from '../data/employeeRaw';
import { EmployeeService } from '../data/employee.service';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../data/position.service';
import { Position } from '../data/vm-typicode';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  paramSubscription: any;
  employeeSubscription: any;
  getPositionSubscription: any;
  saveEmployeeSubscription: any;
  employee: EmployeeRaw = new EmployeeRaw;
  positions: Position[];
  successMessage: boolean = false;
  failMessage: boolean = false;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private positionService: PositionService) { }

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(params => {
      console.log(params);
      this.employeeSubscription = this.employeeService.getEmployee(params['_id']).subscribe((emp) => {
        console.log(emp[0]);
        this.employee = emp[0];

        this.getPositionSubscription = this.positionService.getPositions().subscribe( data => {
          this.positions = data;
        })
      })
    });
  }

  onSubmit(): void {
    this.saveEmployeeSubscription = this.employeeService.saveEmployee(this.employee).subscribe(emp => {
      this.successMessage = true;
      setTimeout(()=>{this.successMessage = false}, 2500);
    }, error =>{
      this.failMessage = true;
      setTimeout(()=>{this.failMessage=false}, 2500);
    })
  }

  ngOnDestry() {
    if (this.saveEmployeeSubscription != null) {this.saveEmployeeSubscription.unsubcribe()}
    if (this.getPositionSubscription != null) {this.getPositionSubscription.unsubscribe()}
    if (this.paramSubscription != null) {this.paramSubscription.unsubscribe()}
    if (this.employeeSubscription != null) {this.employeeSubscription.unsubscribe()}
  }
}
