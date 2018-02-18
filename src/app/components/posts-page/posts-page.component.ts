import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {HeaderLink} from '../../interfaces/header-link';
import {Post} from '../../interfaces/post';
import bind from '../../utils/bind.decorator';
import {HeaderLinkItem} from '../../interfaces/header-link-item';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit, OnDestroy {
  routeChangeSubscription: Subscription;
  pagination: HeaderLink;
  queryString = '';
  currentPage = 1;
  items: Post[];

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeChangeSubscription = this.route
      .queryParams
      .subscribe(this.onRouteQueryParamChange);
  }

  @bind
  onRouteQueryParamChange (params) {
    const text = (params['q'] || '').trim();
    const page = Number(params['page']) || 1;
    this.queryString = text;
    this.currentPage = page;
    this.postsService.getPosts(page).subscribe(this.onPostsSuccess);
  }

  ngOnDestroy () {
    this.routeChangeSubscription.unsubscribe();
  }

  @bind
  onPostsSuccess(results) {
    this.items = results.items;
    this.pagination = results.pagination;
  }

  onPagination(payload: HeaderLinkItem) {
    const queryParams = { page: null };
    const page = parseInt(String(payload._page), 10) || 1;
    if (page > 1) {
      queryParams.page = page;
    }
    this.router.navigate(['posts'], {queryParams});

    // without the router it would work like this:
    // this.postsService.getPostsByHeaderLink(payload).subscribe(this.onPostsSuccess);
  }
}
