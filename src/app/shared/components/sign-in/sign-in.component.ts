import { Component, OnInit } from '@angular/core';
import {SignInService} from './sign-in.service';
import {User} from '../../models/user';
import { Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user:User={email:'',password:''};
  isSubmitting;
  loginText:string="Login";
  constructor(
    private signInService: SignInService,
    private routes:Router,
    private cookieService:CookieService) { }

  ngOnInit() {

  }


  signIn(): void {
      this.isSubmitting = new Promise((resolve, reject) => {
        this.loginText = "Authenticating...";
        this.signInService.login(this.user)
        .subscribe(UserDetails => {
          console.log(UserDetails)
          if(UserDetails){
            this.user = UserDetails;
            alert(`Welcome ${UserDetails.success.data.first_name}`);
            this.cookieService.set( 'token',UserDetails.success.token);
            this.cookieService.set( 'email',UserDetails.success.data.email);
            window.location.href = "user";
          }
          this.loginText = "Login";
          resolve();
        });
      });
    
  }
}
