import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Store, select } from '@ngrx/store';
import { UserState } from 'src/app/auth/store/user.state';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(private router: Router, private authService: AuthService, private store: Store<{ stateObj: UserState }>) { }

  ngOnInit(): void {
    /*this.authService.loggedIn.subscribe((data: boolean) => {
      this.isLoggedIn = data
    }, () => {
      console.log('error occured');
    });*/
    this.store.pipe(select('stateObj')).subscribe(data=>{
      this.isLoggedIn = data.isLoggedIn;
    });
  }

  goToCreatePost() {
    this.router.navigateByUrl('/create-post');
    console.log('logged In :: '+this.isLoggedIn);
  }

  goToCreateSubreddit() {
    this.router.navigateByUrl('/create-subreddit');
    console.log('logged In :: '+this.isLoggedIn);
  }
}