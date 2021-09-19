import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { iif, Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: any;
  isRegistered = false;


  credentials = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    roles: 'ROLE_USER'
  })

  roles = ['user'];

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) {

  }

  ngOnInit(): void {

  }

  async createNewUser() {
    const registerData = {
      username: this.credentials.controls.username.value,
      password: this.credentials.controls.password.value,
      email: this.credentials.controls.email.value,
      roles: [this.credentials.controls.roles.value]
    };
    this.authService.register(registerData).subscribe(
      async () => {
        this.router.navigate(['home']);
        setTimeout(() => {
          this.onActive()
        })
      },
      async (res) => {
      }
    );


  }

  onActive() {
    window.scroll(0, 0)
  }


}
