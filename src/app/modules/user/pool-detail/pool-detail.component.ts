import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/shared/models/Investment';
import { ActivatedRoute,Router} from '@angular/router';
import {InvestmentService} from './../../investment/investment.service'

@Component({
  selector: 'app-pool-detail',
  templateUrl: './pool-detail.component.html',
  styleUrls: ['./pool-detail.component.css']
})
export class PoolDetailComponent implements OnInit {
pool:Investment


  constructor(private route:ActivatedRoute,
    private router:Router,
    private investmentService:InvestmentService
    ) { 
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.fetchPool(id);
  }

  fetchPool(poolId:string){
    this.investmentService.getInvestment(poolId).subscribe(poolDetails=>{
      if(poolDetails && poolDetails.success){
        if(poolDetails.success.Data){
          this.router.navigate(['./', {}]);
        }else{
          this.pool = poolDetails.success.Data[0];
        }
      }else{
        
      }
    })
  }

}
