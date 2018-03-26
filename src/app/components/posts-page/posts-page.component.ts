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
import {combineLatest} from 'rxjs/observable/combineLatest';

@autoUnsubscribe
@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit, OnDestroy {
  currentRouteBase = 'posts';
  tagSlug = '';
  categorySlug = '';
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

    // main url (/foo)
    this.routeUrlSubscription = this.activatedRoute
      .url
      .subscribe((segments) => {
        this.currentRouteBase = segments[0].path;
      });

    // both route param and query param
    combineLatest(
      this.activatedRoute.queryParamMap,
      this.activatedRoute.paramMap
    ).subscribe(this.onRouteAnyParamChange);
  }

  @bind
  onRouteAnyParamChange(paramMaps) {
    const qpMap = paramMaps[0]; // ?foo=1 -> pagination, search text
    const pMap = paramMaps[1]; // /bar/:id/ -> subpage, like tags or categories

    this.queryString = (qpMap.get('q') || '').trim(); // ?q=NEEDLE
    this.currentPage = Number(qpMap.get('page')) || 1; // ?page=42
    this.tagSlug = pMap.get('tagSlug') || ''; // /tag/FOO
    this.categorySlug = pMap.get('categorySlug') || ''; // /category/FOO

    this.getPosts();
  }

  getPosts() {
    this.isLoading = true;
    this.postsService
      .getPosts(this.currentPage, this.queryString, this.tagSlug, this.categorySlug)
      .subscribe(this.onPostsSuccess);
  }

  ngOnDestroy() {
    // do not remove
  }

  @bind
  onPostsSuccess(results) {
    this.items = results.items;
    this.pagination = results.pagination;
    this.isLoading = false;
  }

  onPagination(payload: HeaderLinkItem) {
    const tagSlug = payload['tags@slug_includes']; // same as this.tagSlug
    const categorySlug = payload['category@slug_includes']; // same as this.categorySlug
    const sub = tagSlug || categorySlug;

    const queryParams = {
      page: parseInt(String(payload._page), 10) || 1,
      q: payload.q // for search mode
    };
    if (queryParams.page <= 1) {
      delete queryParams.page;
    }
    if (!queryParams.q) {
      delete queryParams.q;
    }
    const route = 'view/' + this.currentRouteBase + (sub ? `/${sub}` : '');
    this.router.navigate([route], {queryParams});
  }
}
