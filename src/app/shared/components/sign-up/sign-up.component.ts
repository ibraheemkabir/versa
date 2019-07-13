import { Component, OnInit, NgZone } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { User } from './../../models/user';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';
import { VerifyUserService } from '../verify-user/verify-user.service';
import { ToastrService } from 'ngx-toastr';
import { SignInService } from '../sign-in/sign-in.service';
const userBackbone = { email: '', password: '' };
declare const gapi: any;

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    public auth2: any;
    user: User = userBackbone;
    passwordConfim = '';
    isSubmitting;
    signUpText = 'Register';

    constructor(
        private signUpService: SignUpService,
        private authService: AppAuthService,
        private router: Router,
        private verifyService: VerifyUserService,
        private dynamicScriptLoader: DynamicScriptLoaderService,
        private toastrService: ToastrService,
        private signInService: SignInService

        // ngZone:NgZone
    ) {
        // window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));
    }

    ngOnInit() {
        this.installScript();
    }



    signUp(): void {
        if (this.passwordConfim === this.user.password) {
            this.isSubmitting = new Promise((resolve, reject) => {
                this.signUpText = 'Submitting...';
                this.user.authentication_type = 'E';
                this.signUpService.register(this.user)
                    .subscribe(UserDetails => {
                        if (UserDetails) {
                            // alert("Registeration Succesfull, check mail to verify");
                            this.toastrService.success('Registeration Succesfull, check mail to verify');
                            this.user = { email: '', password: '' };
                            this.router.navigateByUrl('signin');
                        }
                        this.passwordConfim = '';
                        this.signUpText = 'Register';
                        resolve();
                    });
            });
        } else {
            // alert('Passwords do not match');
            this.toastrService.error('Passwords do not match');
        }

    }

    public googleInit() {
        this.signInService.sininWithGoogle()
            .then((authData) => {
                console.log(authData);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    public yahooSignup() {
        this.signInService.sininWithYahoo()
            .then((authData) => {
                console.log(authData);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    public attachSignin(element) {
        this.auth2.attachClickHandler(element, {},
            (googleUser) => {

                const profile = googleUser.getBasicProfile();
                const socialUser = {
                    last_name: profile.getName().split(' ')[1],
                    email: profile.getEmail(),
                    first_name: profile.getName().split(' ')[0],
                    user_category: 'User',
                    authentication_type: 'G',
                    // password:googleUser.getAuthResponse().id_token
                };
                this.signUpService.register(socialUser)
                    .subscribe(UserDetails => {
                        if (UserDetails) {
                            this.authService.login(socialUser)
                                .subscribe(UserDetails => {
                                    if (UserDetails) {
                                        this.user = UserDetails;
                                        // alert(`Welcome ${this.user.first_name}`);
                                        this.toastrService.success(`Welcome ${this.user.first_name}`);
                                        window.location.href = `${UserDetails.user_category.toLowerCase()}`;
                                    }
                                });
                        }
                        this.passwordConfim = '';
                    });


            }, (error) => {
            });
    }

    installScript() {
        this.dynamicScriptLoader.load('platform');
    }

}
