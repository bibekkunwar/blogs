import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogList, LoginResponse } from './data';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  apiUrl =
    'https://blog-api-django-rest-framework-production.up.railway.app/api/v1';

  accessToken: string = '';
  constructor(private http: HttpClient) {
    /* `const auth_token= JSON.parse(localStorage.getItem('token') || '')` is retrieving the value of
    the 'token' key from the browser's local storage and parsing it as a JSON object. If the value is
    not found or is empty, it sets the value of `auth_token` to an empty string. */
    //  const auth_token= JSON.parse(localStorage.getItem('token') || '')
    // this.accessToken = auth_token.access
    // console.log("access token", this.accessToken)
  }

  /**
   * This function returns an object containing an authorization header with a bearer token.
   * @returns The function `getHeaders()` is returning an object `headers` which contains an
   * `Authorization` property with a value of `'Bearer '` concatenated with the value of
   * `this.accessToken`.
   */
  getHeaders() {
    let headers = {
      Authorization: 'Bearer ' + this.accessToken,
    };
    return headers;
  }

  login(data: { username: string; password: string }) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/`, data);
  }

  getBlogList() {
    // let headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/list/`);
  }
}

