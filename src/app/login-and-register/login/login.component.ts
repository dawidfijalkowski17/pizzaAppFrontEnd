import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: any;
  user!: SocialUser;

  credentials = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;

    })
  }

  async logIn() {
    const loginData = {
      username: this.credentials.controls.username.value,
      password: this.credentials.controls.password.value,
    };
    this.authService.login(loginData).subscribe(
      async () => {
        this.router.navigate(['home']);
        setTimeout(() => {
          this.onActive()
        })
      },
      async () => {
      },
    );
  }

  onActive() {
    window.scroll(0, 0)
  }
  googleSignin(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((x) => {
      this.authService.isAuthenticated.next(true)
      localStorage.setItem('my-token', this.user.idToken)
      this.router.navigate(['home'])
      this.onActive()

    })

  }
}
