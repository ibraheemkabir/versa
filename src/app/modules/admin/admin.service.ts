import { Injectable } from '@angular/core';
import {HttpService} from '../../core/http/httpservice.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { Investment } from 'src/app/shared/models/Investment';
import { Category } from 'src/app/shared/models/Category';
import { Admin } from 'src/app/shared/models/Admin';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpService:HttpService) { }


  getDashBoardData(){
    return this.httpService.postRequest(`report/adminDashboard`,null);
  }

  getUsers(){
    return this.httpService.postRequest(`user/list`,null);
  }  

  getAdminUsers(){
    return this.httpService.postRequest(`list_admin`,null);
  } 

  createAdminUser(admin:Admin){
    return this.httpService.postRequest(`register_admin`,admin,true);
  }

  updateAdminUser(admin:Admin,userType:string){
    var reqBody = {"id": admin.id,"user_category":userType};   
    return this.httpService.postRequest(`update_admin`,reqBody,true);
  }

}