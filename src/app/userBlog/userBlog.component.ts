import { Component, OnInit } from '@angular/core';
import { DemoService } from '../demo.service';
import jwt_decode from 'jwt-decode';
import { Location } from '@angular/common';

interface DecodedType{
  user_id:number
}

@Component({
  selector: 'app-userBlog',
  templateUrl: './userBlog.component.html',
  styleUrls: ['./userBlog.component.css'],
})
export class UserBlogComponent implements OnInit {
  data: any;
  userId!:number
  allBlogLists:any[]=[]
  constructor(private _apiService: DemoService, private location: Location) {}

  ngOnInit() {
  /* This code is retrieving the JWT token from the local storage of the browser, decoding it using the
  `jwt-decode` library, and extracting the `user_id` from the decoded token. The `user_id` is then
  assigned to the `userId` property of the component. Finally, the `getList()` method is called to
  retrieve a list of blog posts from the server, filtered by the `userId`. */

/* This line of code is retrieving a JWT token from the local storage of the browser, parsing it from a
JSON string to a JavaScript object using `JSON.parse()`, and assigning it to the `encodedToken`
constant. If the `auth_token` key is not found in the local storage, an empty string is used as a
fallback value. */
    const encodedToken = JSON.parse(localStorage.getItem('auth_token') || '');
/* This line of code is decoding a JWT token retrieved from the local storage of the browser using the
`jwt-decode` library. The decoded token is then assigned to the `decodedToken` variable with the
type `DecodedType`, which is an interface defined earlier in the code. The `DecodedType` interface
specifies that the decoded token should have a `user_id` property of type `number`. */

    const decodedToken:DecodedType = jwt_decode(encodedToken.refresh);
    this.userId=decodedToken.user_id
    this.getList()
  }

  getList() {
    this._apiService.getBlogList().subscribe((res: any) => {
      const filteredList=res.results.filter((item:any)=> item.user_id===this.userId)
      this.allBlogLists=filteredList
    });
  }

  back() {
    this.location.back();
  }
}
