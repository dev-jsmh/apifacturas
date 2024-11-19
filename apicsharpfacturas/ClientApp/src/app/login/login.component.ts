import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loggingForm = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }


  onSubmit() {

    console.log(this.loggingForm.value);
    // check if the user input field is not empty
    if (this.name.value != "" && this.name.value != null) {
      // store the name and password into localstorage
      localStorage.setItem("name", this.name.value);
    }
    // check if the password input field is not empty
    if (this.password.value != "" && this.password.value != null) {
      // store the name and password into localstorage
      localStorage.setItem("password", this.password.value);
    }
    // take user to admind dashboard
    this.router.navigateByUrl("/home");

  }

  // form control values
  public get name() { return this.loggingForm.controls['user'] };
  public get password() { return this.loggingForm.controls['password'] };
}

