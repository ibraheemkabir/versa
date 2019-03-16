import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
