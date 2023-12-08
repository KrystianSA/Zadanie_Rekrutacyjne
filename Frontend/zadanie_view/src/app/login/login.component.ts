import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../Model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  buttonResetPassword = true;
  isLoggedIn: boolean = false;
  loginMessage: string = '';

  constructor(private http: HttpClient) { };

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email', 'password') ? 'Empty or non valid value' : '';
  }

  loginUser(email: string, password: string) {

    if (this.email.invalid || this.password.invalid) {
      this.loginMessage = ('Invalid email or password. Please check your data.');
      return;
    }

    let user : User ={
      email: email,
      password:password
    }

    this.http.post<any>('http://localhost:8080/auth/login', user).subscribe(
      data => {
        console.log('succes', data);
        this.isLoggedIn = true;
        this.loginMessage = 'Użytkownik zalogowany !';
      },
      error => {
        console.log('oops', error);
        this.isLoggedIn = false;
        this.loginMessage = 'Nieprawidłowe dane logowania';
      });
      
  }

  resetPassword(email: string){

    if (this.email.invalid) {
      this.loginMessage = ('Invalid email. Please check your data.');
      return;
    }

    let user = {
      email: email
    };

    this.http.post<any>('http://localhost:8080/users/resetPassword', user).subscribe(
      data => {
        console.log('succes', data);
        this.isLoggedIn = true;
        this.loginMessage = 'Link do zmiany hasła został wysłany na adres email !';
      },
      error => {
        console.log('oops', error);
        this.isLoggedIn = false;
        this.loginMessage = 'Wystąpił błąd';
      });
  }
  
}
