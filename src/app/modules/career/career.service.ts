import { Injectable } from '@angular/core';
import {HttpService} from '../../core/http/httpservice.service';
import { Career } from 'src/app/shared/models/Career';
import { CareerApplication } from 'src/app/shared/models/CareerApplication';
// import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private httpService:HttpService) { }


  getCareers(){
    return this.httpService.postRequest(`career/list`,null);
  }  

  //Admin
  getCareerById(id:string){
    return this.httpService.postRequest(`career_application/show
    ?career_application_id=${id}`,null);
  }

  craeteCareer(careerData:Career){
    return this.httpService.postRequest(`career/create?career_title=${careerData.career_title}
    &career_description=${careerData.career_description}
    &deadline=${careerData.deadline}
    &position_type=${careerData.position_type}
    &number_of_application=${careerData.number_of_application}
    &career_responsibilities=${careerData.career_responsibilities}`,null);
  }

  applyForCareer(careerApplication:CareerApplication){
    return this.httpService.postRequest(`career_application/create?
    first_name=${careerApplication.first_name}
    &last_name=${careerApplication.last_name}
    &email=${careerApplication.email}
    &career_id=${careerApplication.career_id}
    &phone_number=${careerApplication.phone_number}
    &career_brief=${careerApplication.career_brief}
    &curriculum_vitae=${careerApplication.cv_base64}`,null);
  }

  getCareerApplications(){
    return this.httpService.postRequest(`career_application/list`,null);
  }

}