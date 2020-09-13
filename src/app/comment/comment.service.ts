import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentPayload } from './comment-payload';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  //URL: string = 'http://localhost:8080/api/comments/';
  URL: string = 'https://kdcoder-reddit-clone.herokuapp.com/api/comments/';

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(this.URL+'by-post/'+postId);
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post(this.URL, commentPayload);
  }

  getAllCommentsByUser(name: string): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(this.URL+'by-user/'+name);
  }
}
