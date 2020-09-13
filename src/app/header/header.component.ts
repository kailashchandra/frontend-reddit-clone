import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';
import { UserState } from '../auth/store/user.state';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faUser = faUser;
  isLoggedIn: boolean;
  username: string;
  
  constructor(private authService: AuthService, private router: Router, private store: Store<{ stateObj:UserState }>) { }

  ngOnInit(): void {
    this.store.pipe(select('stateObj')).subscribe(data=>{
      this.isLoggedIn = data.isLoggedIn;
      this.username = data.username;
    });//loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    //this.isLoggedIn = this.loginData.isLoggedIn;
    //this.username = this.loginData.username;
    //this.authService.username.subscribe((data: string) => this.username = data);
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/'+this.username);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
}
