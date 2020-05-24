import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VotePayload } from './vote-button/vote-payload';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  
  //URL: string = 'http://localhost:8080/api/votes/';
  URL: string = 'https://kdcoder-reddit-clone.herokuapp.com/api/votes/';

  constructor(private http: HttpClient) { }

  vote(votePayload: VotePayload): Observable<any> {
    return this.http.post(this.URL, votePayload);
  }
}
