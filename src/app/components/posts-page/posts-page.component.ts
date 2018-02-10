import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {autobind} from 'core-decorators';
import {HeaderLink} from '../../interfaces/header-link';
import {Post} from '../../interfaces/post';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {
  private pagination: HeaderLink;
  private items: Post[];

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.postsService.getPosts().subscribe(this.onPostsSuccess);
  }

  @autobind
  onPostsSuccess(results) {
    this.items = results.items;
    this.pagination = results.pagination;
  }
}
