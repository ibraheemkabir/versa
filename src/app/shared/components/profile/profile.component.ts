import { Component,Input,Output, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/modules/user/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{

  @Input() public user:User={email:'',password:'',country:'',first_name:'',last_name:'',bank_name:''};
  @Input() public editable:boolean;
  isSubmitting;
  isLoading:boolean=true;
  countries:string[]=['Nigeria','Ghana']
  bankList:string[]=['Gt Bank','First Bank','Fidelity','UBA','Diamond Bank','FCMB']
  dateModel:Date;
  opt1selected:boolean=false;
  opt2selected:boolean=false;
  dayComponent = ['1','2','3','4','5','6','7','8','9','10',
                  '11','12','13','14','15','16','17','18','19','20',
                  '21','22','23','24','25','26','27','28','29','30','31'];
  monthComponent = [{count:'1',title:'Jan'},{count:'2',title:'Feb'},
  {count:'3',title:'Mar'},{count:'4',title:'Apr'},
  {count:'5',title:'May'},{count:'6',title:'Jun'},
  {count:'7',title:'Jul'},{count:'8',title:'Aug'},
  {count:'9',title:'Jan'},{count:'10',title:'Oct'},
  {count:'11',title:'Nov'},{count:'12',title:'Dec'}]


  constructor(private userService:UserService) { }

  ngOnInit(){
      this.isLoading = false;
  }

  updateProfile(){
      // console.log(JSON.stringify(this.user))
      this.isSubmitting = this.userService.updateProfile(this.user).subscribe(resp=>{
        if(resp && resp.success){
          alert(resp.success.Message)
        }
      });
  }

  updateAccountPreference(){
    this.user.updates_on_new_plans = this.opt1selected?1:0;
    this.user.email_updates_on_investment_process = this.opt2selected?1:0;
    this.isSubmitting = this.userService.updatePreference(this.user).subscribe(resp=>{
      if(resp && resp.success){
        alert(resp.success.Message)
      }
    });
  }

  updateBankDetails(){
    this.isSubmitting = this.userService.updateBankDetails(this.user).subscribe(resp=>{
      if(resp && resp.success){
        alert(resp.success.Message)
      }
    });
  }

}
