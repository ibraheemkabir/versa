import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AdminService } from '../admin.service';
import { UserService } from '../../user/user.service';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users:[User]
  selectedUser:User
  isLoading:boolean=true;
  constructor(
     private userService:UserService,
     private adminService:AdminService,
     private authService:AppAuthService,
     private dynamicScrLoader:DynamicScriptLoaderService
     ) { }

  ngOnInit() {
    this.adminService.getUsers().subscribe(resp=>{
      if(resp && resp.success){
        this.users = resp.success.Data;
        this.isLoading =  false;
        this.dynamicScrLoader.loadSingle('data-table');   
        this.dynamicScrLoader.loadSingle('trigger-data-table');    
      }
    })
  }

  viewUserDetail(userIndex){
    this.selectedUser = this.users[userIndex]
  }

  updateUser(user,operation){
    if(operation=='enable'){
      this.userService.activateUser(user).subscribe(resp=>{
        if(resp && resp.success){
          // alert(resp.success.Message)
          // this.users[userIndex].email_is_verified=1
        }
      })
    }else{
      this.userService.deactivateUser(user).subscribe(resp=>{
        if(resp && resp.success){
          // alert(resp.success.Message)
          // this.users[userIndex].email_is_verified=0
        }
      })
    }
    
  }

}
