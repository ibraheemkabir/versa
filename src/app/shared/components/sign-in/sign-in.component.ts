import { Component, OnInit } from '@angular/core';
import {SignInService} from './sign-in.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user:User={email:'owolabi.sunday08@gmail.com',password:'admin@123'};
  constructor(private signInService: SignInService) { }

  ngOnInit() {

  }

  signIn(): void {
    this.signInService.login(this.user)
      .subscribe(UserDetails => {
        if(UserDetails){
          this.user = UserDetails;
          console.log(JSON.stringify("i got: "+JSON.stringify(this.user)));
        }
      });
  }
}
