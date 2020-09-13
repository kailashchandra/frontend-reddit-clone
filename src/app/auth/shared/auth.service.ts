import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { Observable, throwError } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginResponse } from '../login/login-response.payload';
import { Store, select } from '@ngrx/store';
import { UserState } from '../store/user.state';
import { login, logout } from './../../auth/store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //@Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  //@Output() username: EventEmitter<string> = new EventEmitter();

  //URL:string = 'http://localhost:8080/api/auth';
  URL:string = 'https://kdcoder-reddit-clone.herokuapp.com/api/auth';
  username:string;

  /*refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.username
  };*/

  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private store: Store<{stateObj:UserState }>) {
      this.store.pipe(select('stateObj')).subscribe(data=>{
        //this.isLoggedIn = data.isLoggedIn;
        this.username = data.username;
      });
     }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(this.URL+'/signup', signupRequestPayload, { responseType: 'text' });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(this.URL+'/login', loginRequestPayload)
        .pipe(map(data => {
          this.localStorage.store('authenticationToken', data.authenticationToken);
          this.localStorage.store('username', data.username);
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('expiresAt', data.expiresAt);
          
          //this.loggedIn.emit(true);
          //this.username.emit(data.username);
          this.store.dispatch(login({ loggedInStatus: true, nameOfUser: loginRequestPayload.username }));
          return true;
        }));
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationtoken');
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>(this.URL+'/refresh/token',
    this.getRefreshTokenPayload())//this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  logout() {
    this.httpClient.post(this.URL+'/logout', this.getRefreshTokenPayload(),//this.refreshTokenPayload,
    { responseType: 'text' })
    .subscribe(data => {
      console.log(data);
    }, error => {
      throwError(error);
    })
  this.localStorage.clear('authenticationToken');
  this.localStorage.clear('username');
  this.localStorage.clear('refreshToken');
  this.localStorage.clear('expiresAt');
  this.store.dispatch(logout());
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  /*getUserName() {
    
    //return this.localStorage.retrieve('username');
  }*/

  getExpirationTime() {
    return this.localStorage.retrieve('expiresAt');
  }

  /*isLoggedIn(): Observable<UserState> {
    //var loginStatus: UserState;
    //return this.store.pipe(select('userStateObj'));
    //return loginStatus;
  }*/
  getRefreshTokenPayload() {
    return {
      refreshToken: this.getRefreshToken(),
      username: this.username
    }
  }
  
}
