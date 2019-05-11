import { Injectable } from '@angular/core';
import {  HttpHeaders,HttpClient  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


const httpOptions = {
    headers: new HttpHeaders({ 
        'Accept':'application/json'
    })
};

@Injectable({ providedIn: 'root' })
export class HttpService {
  headers: any;
  requestOption:any;
  response:{};
  baseURL:string = "https://versabackend.adebiyipaul.com/api";
  

    constructor(
        private http: HttpClient,
        private toastrService:ToastrService
    ) { }


    getRequest(api:string) : Observable<any> {
        return this.http.get<any>(`${this.baseURL}/${api}`)
        .pipe(
            tap(resp=> this.log('GET=> response :: '+resp)),
            catchError(
                this.handleError<any>(api, [])
            )
        );    
    }

    postRequest(api:string,data:any):Observable<any>  {
        return this.http.post<any>(`${this.baseURL}/${api}`,data,httpOptions)
        .pipe(
            tap(resp=> this.log('POST=> response :: '+resp)),
            catchError(
                this.handleError<any>(api,null)
            )
        );  
    }

    putRequest(api:string,data:any) {
        return this.http.put<any>(`${this.baseURL}/${api}`,data,httpOptions)
        .pipe(
            tap(resp => this.log('PUT=> response :: '+resp)),
            catchError(
                this.handleError<any>(api,{})
            )
        );  
    }

    deleterequest(){
        
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            if(error.status==0){
                // alert('Could not connect to services')
                this.toastrService.error(`Kindly Login First`)
            }else{
                console.log("Error occurred is:: "+JSON.stringify(error))
                if(error.error && error.error.errors){
                    // alert(JSON.stringify(error.error.errors))
                    this.toastrService.error(JSON.stringify(error.error.errors))
                }else if(error.error && error.error.error){
                    if(error.error.error.message){
                        // alert(error.error.error.message)
                        this.toastrService.error(error.error.error.message)
                    }else{
                        // alert(JSON.stringify(error.error.error.Message))
                        this.toastrService.error(JSON.stringify(error.error.error.Message))
                    } 
                }
            }
            return of(result as T);

        };
    }

    private log(message: string) {
        // console.log(`HeroService: ${message}`);
    }
}
