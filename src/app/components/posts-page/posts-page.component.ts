import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {HeaderLink} from '../../interfaces/header-link';
import {Post} from '../../interfaces/post';
import bind from '../../utils/bind.decorator';
import autoUnsubscribe from '../../utils/auto-unsubscribe.decorator';
import {HeaderLinkItem} from '../../interfaces/header-link-item';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@autoUnsubscribe
@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit, OnDestroy {
  currentRouteBase = 'posts';
  routeChangeSubscription: Subscription;
  routeUrlSubscription: Subscription;
  pagination: HeaderLink;
  queryString = '';
  currentPage = 1;
  items: Post[];

  constructor(private postsService: PostsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.routeChangeSubscription = this.route
      .queryParams
      .subscribe(this.onRouteQueryParamChange);

    this.routeUrlSubscription = this.route
      .url
      .subscribe((segments) => {
        this.currentRouteBase = segments[0].path;
      });
  }

  @bind
  onRouteQueryParamChange(params) {
    const text = (params['q'] || '').trim();
    const page = Number(params['page']) || 1;
    this.queryString = text;
    this.currentPage = page;
    this.postsService
      .getPosts(page)
      .subscribe(this.onPostsSuccess);
  }

  ngOnDestroy() {
  }

  @bind
  onPostsSuccess(results) {
    this.items = results.items;
    this.pagination = results.pagination;
  }

  onPagination(payload: HeaderLinkItem) {
    const queryParams = {page: null};
    const page = parseInt(String(payload._page), 10) || 1;
    if (page > 1) {
      queryParams.page = page;
    }
    this.router.navigate([this.currentRouteBase], {queryParams});

    // without the router it would work like this:
    // this.postsService.getPostsByHeaderLink(payload).subscribe(this.onPostsSuccess);
  }
}
