import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import autoUnsubscribe from '../../utils/auto-unsubscribe.decorator';
import {Subscription} from 'rxjs/Subscription';
import {PostsService} from '../../services/posts.service';
import {Post} from '../../interfaces/post';
import {DomUtilsService} from '../../services/dom-utils.service';

@autoUnsubscribe
@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {
  item: Post;
  isLoading = true;
  routeChangeSubscription: Subscription;
  id: number;

  constructor(private activatedRoute: ActivatedRoute,
              private postsService: PostsService,
              private dom: DomUtilsService) {
  }

  ngOnInit() {
    this.routeChangeSubscription = this.activatedRoute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.getPost();
    });
  }

  ngOnDestroy() {
  }

  getPost() {
    this.dom.scrollToTop();
    this.isLoading = true;
    this.postsService
      .getPost(this.id)
      .subscribe(response => {
        this.item = response.items[0];
        this.isLoading = false;
      });
  }

}
