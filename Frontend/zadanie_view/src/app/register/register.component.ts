import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../Model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  showLogin = true;
  isRegister: boolean = false;
  loginMessage: string = "";
  id: number = 4;
  
  constructor(private http: HttpClient) { };

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]);
  password2 = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' : '';
  }
  getErrorMessage1() {
    return this.password.hasError('required') ?
      'Password have to at least one big and small letter, digit and 8 signs' : '';
  }
  getErrorMessage2() {
    return this.password.hasError('required') ? 'Passwords are not the same' : '';
  }

  registerUser(email: string, password: string) {

    if (this.email.invalid || this.password.invalid || this.password2.invalid) {
      this.loginMessage = ('Invalid email or password. Please check your data.');
      return;
    }

    let user : User ={
      id:this.id,
      email: email,
      password:password
    }

    this.http.post<any>('http://localhost:8080/users', user).subscribe(
      data => {
        console.log('succes', data);
        this.isRegister = true;
        this.showLogin = false;
      },
      error => {
        console.log('oops', error);
        this.isRegister = false;
        this.loginMessage = 'Email or Password is not correct';
      });

    this.incrementId();
  }

  incrementId() {
    this.id = this.id + 1;
  }
}
