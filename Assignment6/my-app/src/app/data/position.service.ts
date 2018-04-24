import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { Employee, Position } from "./vm-typicode"

@Injectable()
export class PositionService {
  private url = "https://warm-ocean-35680.herokuapp.com";

  private positions: string[] = [];

  constructor(private http: HttpClient) { }

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.url}/positions`);
  }

  savePosition(position: Position): Observable<any> {
    return this.http.put<any>("https://warm-ocean-35680.herokuapp.com/position/" + position._id, position);
  }

  getPosition(id): Observable<Position[]> {
    return this.http.get<Position[]>("https://warm-ocean-35680.herokuapp.com/position/" + id);
  }

}
