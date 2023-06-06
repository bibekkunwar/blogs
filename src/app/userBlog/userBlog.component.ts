import { Component, OnInit } from '@angular/core';
import { DemoService } from '../demo.service';
import jwt_decode from 'jwt-decode';

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
  constructor(private _apiService: DemoService) {}

  ngOnInit() {
  /* This code is retrieving the JWT token from the local storage of the browser, decoding it using the
  `jwt-decode` library, and extracting the `user_id` from the decoded token. The `user_id` is then
  assigned to the `userId` property of the component. Finally, the `getList()` method is called to
  retrieve a list of blog posts from the server, filtered by the `userId`. */
    const encodedToken = JSON.parse(localStorage.getItem('auth_token') || '');
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
}
