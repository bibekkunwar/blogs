import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DemoService } from '../demo.service';

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

  constructor(private _apiService: DemoService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  token = '';

  login() {
    console.log(this.form.value);

    localStorage.setItem('token', JSON.stringify(this.token));
    /* This code is making a HTTP POST request to the API service's `login` endpoint with the form data
    as the request body. The `subscribe` method is used to handle the response from the server. When
    the response is received, it logs the response to the console and sets the token in the local
    storage. It also has a commented out line that would display an alert message if the login was
    successful. */
    this._apiService.login(this.form.value).subscribe((res) => {
      console.log('login response', res);
      localStorage.setItem('token', JSON.stringify(this.token));
      // alert("Logged in Successfully !")
    });
  }

  getList() {
    this._apiService.getBlogList().subscribe((res) => console.log(res));
    console.log('api access',this.getList);
  }
}
