import { Component, OnInit } from '@angular/core';
import { SubredditService } from '../subreddit.service';
import { SubredditModel } from '../subreddit-response';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { throws } from 'assert';

@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.css']
})
export class ViewSubredditComponent implements OnInit {

  subredditId: number;
  subreddit: SubredditModel;

  constructor(private subredditService : SubredditService,
    private activateRoute : ActivatedRoute) {
      this.subredditId = activateRoute.snapshot.params.id;

      this.getSubreddit(this.subredditId);
     }

  ngOnInit(): void {
    
  }

  getSubreddit(id : number) {
    this.subredditService.getAllSubreddit(id).subscribe(
      data => {
        this.subreddit = data;
      }, error => {
        console.log('error while fetching subreddit for '+id);
        throws(error);
      }
    );
  }

}
