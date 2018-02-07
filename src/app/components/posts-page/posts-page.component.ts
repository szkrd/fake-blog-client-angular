import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {autobind} from 'core-decorators';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.css']
})
export class PostsPageComponent implements OnInit {

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.postsService.getPosts().subscribe(this.onPostsSuccess);
  }

  @autobind
  onPostsSuccess(results) {
    console.log('posts', results);
  }
}
