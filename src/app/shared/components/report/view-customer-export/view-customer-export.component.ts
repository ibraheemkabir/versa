import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../modules/user/user.service';
import { UserDashboard } from 'src/app/shared/models/UserDashboard';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { Investment } from 'src/app/shared/models/Investment';
import { InvestmentService } from 'src/app/modules/investment/investment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-view-customers-export',
  templateUrl: './view-customer-export.component.html',
  styleUrls: ['./view-customer-export.component.scss']
})
export class exportUserPoolComponent implements OnInit {
    _shown = true;
    pools:Investment[]=[];
    user: any;
    email:any;
    //user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
    investments: Investment;
    users: User[];
    dashBoardData: any = {number_of_pools: 0, investment_return: [], investment_report: []};
    userInvestment: Investment[];
    FilteredInvestment: Investment[];
    dashboardInvestment: any =[];
    alluserInvestment: any =[];
    isLoading: boolean;
    selectedInvestment = -1;
    investmentInfo: Investment = {duration: '0', investment_amount: 0};
    poolId: any;
    constructor(
      private route:ActivatedRoute,
      private investmentService: InvestmentService,
      private userService: UserService,
      private toastrService: ToastrService,
      private router: Router,
      private location: Location
      ) {
        this.email = this.route.snapshot.paramMap.get("email"); // Snapshot param
        this.isLoading = true;
        this.userService.getProfileDetails(this.email).subscribe(userx=> {
          this.user = userx.success.Data;
         // console.log(this.user.user[0].first_name, 'Hello');
          this.isLoading = false;
          
        });

      }
    ngOnInit() {
      this.investmentService.getUserInvestments(this.email).subscribe(investments=>{
        this.isLoading = true;
        this.userInvestment = investments.success.Data;
        console.log(this.userInvestment);
        //this.selectedInvestment = 0;
        //this.showDetails();
        this.isLoading = false;
      });
    }

    getPools() {
      this.isLoading = true;
      this.investmentService.getInvestments(false).subscribe(investments => {
        if (investments) {
          this.pools = investments.success.Data;
          console.log(this.pools);
          
        }
        this.isLoading = false;
      });
    }
    
   showDetails() {
     if ( this.selectedInvestment >= 0) {
         this.investmentInfo = this.userInvestment[this.selectedInvestment];
         console.log(this.investmentInfo);
         this.getUserDashBoard();
         this.selectedInvestment++;
         console.log(this.selectedInvestment);
         return this.selectedInvestment;
         } else {
         this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
         console.log(this.investmentInfo);
         }
   }

   getUserDashBoard() {
     const userEmail = this.user.email;
     const investmentId = this.investmentInfo.id;

     this.userService.getUserDashBoard(investmentId, userEmail).subscribe(resp => {
       if (resp && resp.success) {
         this.dashBoardData = resp.success.Data;
         console.log(this.dashBoardData);
         this.dashboardInvestment.push(this.dashBoardData);
       } else {
         this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
         console.log(this.dashBoardData);
       }
       console.log(this.dashboardInvestment);
       this.showDetails();
     });
   }

    Back(){
        this.location.back();
    }
    
  }
