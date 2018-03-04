import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {HeaderLink} from '../../interfaces/header-link';
import {Post} from '../../interfaces/post';
import bind from '../../utils/bind.decorator';
import autoUnsubscribe from '../../utils/auto-unsubscribe.decorator';
import {HeaderLinkItem} from '../../interfaces/header-link-item';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {EventBusService} from '../../services/event-bus.service';

@autoUnsubscribe
@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit, OnDestroy {
  currentRouteBase = 'posts';
  tagSlug = '';
  routeChangeQueryParamSubscription: Subscription;
  routeChangeParamSubscription: Subscription;
  routeUrlSubscription: Subscription;
  searchForPostsSubscription: Subscription;
  isLoading = true;
  pagination: HeaderLink;
  queryString = '';
  currentPage = 1;
  items: Post[];

  constructor(private postsService: PostsService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private eventBus: EventBusService) {
  }

  ngOnInit() {
    this.searchForPostsSubscription = this.eventBus
      .searchForPosts
      .subscribe(payload => {
        this.queryString = payload.query;
      });

    // query param
    this.routeChangeQueryParamSubscription = this.activatedRoute
      .queryParamMap
      .subscribe(this.onRouteQueryParamChange);

    // url
    this.routeUrlSubscription = this.activatedRoute
      .url
      .subscribe((segments) => {
        this.currentRouteBase = segments[0].path;
      });

    // param
    this.routeChangeParamSubscription = this.activatedRoute
      .paramMap
      .subscribe(params => {
        this.tagSlug = params.get('tagSlug') || '';
        this.queryString = '';
        this.currentPage = 1;
        this.getPosts();
      });
  }

  @bind
  onRouteQueryParamChange(params) {
    const text = (params.get('q') || '').trim();
    const page = Number(params.get('page')) || 1;
    this.queryString = text;
    this.currentPage = page;
    this.getPosts();
  }

  getPosts() {
    this.isLoading = true;
    this.postsService
      .getPosts(this.currentPage, this.queryString, this.tagSlug)
      .subscribe(this.onPostsSuccess);
  }

  ngOnDestroy() {
  }

  @bind
  onPostsSuccess(results) {
    this.items = results.items;
    this.pagination = results.pagination;
    this.isLoading = false;
  }

  onPagination(payload: HeaderLinkItem) {
    const queryParams = {
      page: parseInt(String(payload._page), 10) || 1,
      q: payload.q
    };
    if (queryParams.page <= 1) {
      delete queryParams.page;
    }
    if (!queryParams.q) {
      delete queryParams.q;
    }
    const route = 'view/' + this.currentRouteBase;
    this.router.navigate([route], {queryParams});

    // without the router it would work like this:
    // this.postsService.getPostsByHeaderLink(payload).subscribe(this.onPostsSuccess);
  }
}
