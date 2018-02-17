import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {HeaderLink} from '../../interfaces/header-link';
import {Post} from '../../interfaces/post';
import bind from '../../utils/bind.decorator';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {
  pagination: HeaderLink;
  items: Post[];

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.postsService.getPosts().subscribe(this.onPostsSuccess);
  }

  @bind
  onPostsSuccess(results) {
    this.items = results.items;
    this.pagination = results.pagination;
  }
}
