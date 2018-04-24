import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { Employee, Position } from "./vm-typicode"

@Injectable()
export class EmployeeService {
  private url = "https://warm-ocean-35680.herokuapp.com";

  private employees: string[] = [];

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.url}/employees`)
  }


}
