import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';
import { PostModel } from '../post-model';
import { faArrowUp, faArrowDown, faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { throws } from 'assert';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {
  
  faComments = faComments;
  @Input() posts: PostModel[];

  constructor(private router: Router, private postService : PostService ) { }

  ngOnInit(): void {
    this.getPost();
  }

  goToPost(id: number) {
    this.router.navigateByUrl('/view-post/' +id);
  }

  getPost() {
    this.postService.getAllPosts().subscribe(
      data => {
        this.posts = data;
      }, error => {
        console.log('There is error while fetching posts for home page...');
        throws(error);
      }
    );
  }

}
