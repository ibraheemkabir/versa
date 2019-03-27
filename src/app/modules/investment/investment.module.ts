import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentComponent } from './investment.component';
import { InvestmentRoutingModule } from './investment-router-module';
import {InvestmentDetailComponent} from './investment-detail/investment-detail.component';
import {FormsModule} from '@angular/forms';
import { Angular4PaystackModule } from 'angular4-paystack';

@NgModule({
  declarations: [InvestmentComponent,InvestmentDetailComponent],
  imports: [
    CommonModule,InvestmentRoutingModule,FormsModule,
    Angular4PaystackModule
  ]
})
export class InvestmentModule { }
