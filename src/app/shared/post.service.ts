import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';
import { CreatePostPayload } from '../post/create-post/create-post.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  //URL: string = 'http://localhost:8080/api';
  URL: string = 'https://kdcoder-reddit-clone.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(this.URL+'/posts/');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post(this.URL+'/posts/', postPayload);
  }

  getPosts(postId: number):Observable<PostModel> {
    return this.http.get<PostModel>(this.URL+'/posts/'+postId);
  }

  getAllPostByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.URL+'/posts/by-user/'+name);
  }
}
