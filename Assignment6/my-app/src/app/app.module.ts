import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav.component';
import { ContentComponent } from './content.component';
import { FooterComponent } from './footer.component';

import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { PositionsComponent } from './positions/positions.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { PositionService } from './data/position.service';
import { EmployeeService } from './data/employee.service';
import { EmployeeComponent } from './employee/employee.component';
import { PositionComponent } from './position/position.component';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ContentComponent,
    FooterComponent,
    HomeComponent,
    EmployeesComponent,
    PositionsComponent,
    PageNotFoundComponent,
    EmployeeComponent,
    PositionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PositionService, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
