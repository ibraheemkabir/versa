import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/httpservice.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaystackService {

  constructor(
    private httpService:HttpService
  ) { }

//   upload(base64SString: string) {
//     return new Observable<any>(observable=>{
//       this.httpService.baseURL = "https://api.cloudinary.com";
//       var data = {
//           "file":base64SString,
//           "upload_preset":"vprr7erl"
//       }
//       this.httpService.postRequest('v1_1/crystalbit-technology/image/upload',data)
//       .subscribe(resp=>{
//           if(resp){
//               this.httpService.baseURL = "https://versabackend.adebiyipaul.com/api";
//               observable.next(resp.secure_url);
//           }
//       })
//     })
//   }
}