import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DemoService } from '../demo.service';
import { BlogList } from '../data';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /* `form!: FormGroup;` is declaring a property named `form` of type `FormGroup`. The exclamation mark
  (`!`) is a non-null assertion operator, which tells TypeScript that the `form` property will be
  initialized at some point before it is used, even though it is currently undefined. This is useful
  when working with Angular templates, which may access component properties before they are fully
  initialized. */
  form!: FormGroup;

  accessToken: any = '';
  refreshToken: any = '';
  data: BlogList[] = [];

  constructor(private _apiService: DemoService, private router: Router) {}

 /* `ngOnInit()` is a lifecycle hook in Angular that is called after the component has been
 initialized. In this code, it is used to call the `createForm()` method, which creates a new
 instance of `FormGroup` and assigns it to the `form` property of the component. The `FormGroup` is
 used to create a form with two form controls, `username` and `password`, which are initialized with
 empty string values. This form is used to capture user input for the login process. */
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }


/**
 * The login function sends a login request to an API service and handles the response, storing the
 * authentication token in local storage and navigating to the user blog page if successful, or
 * displaying an error message if the request fails with a 401 status code.
 */
  login() {
   /* This code is sending a login request to an API service using the `_apiService` instance, passing
   in the form values as the request payload. The `subscribe()` method is used to handle the
   response from the API service. If the response is successful, the authentication token is stored
   in local storage using `localStorage.setItem()`, an alert message is displayed to the user, and
   the user is navigated to the `/userBlog` page using the `this.router.navigate()` method. If the
   response fails with a 401 status code, an error message is displayed to the user using the
   `alert()` method. */
    this._apiService.login(this.form.value).subscribe({
      next: (res) => {
        localStorage.setItem('auth_token', JSON.stringify(res));
        alert("Logged in successfully");
        this.router.navigate(['/userBlog']);
      },
      error: (error: HttpErrorResponse) => {
          if(error.status===401 || error){
            alert(error.error.detail || "Enter valid details");
          }
      },
    });

  }

  register() {
    this.router.navigate(['/register']);
  }
}
