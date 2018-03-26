import {Component, OnDestroy, OnInit} from '@angular/core';
import {TagsService} from '../../services/tags.service';
import {WidgetTag} from '../../interfaces/widget-tag';
import autoUnsubscribe from '../../utils/auto-unsubscribe.decorator';
import {Subscription} from 'rxjs/Subscription';
import bind from '../../utils/bind.decorator';
import 'rxjs/add/operator/finally';

const sortByTagName = (a: WidgetTag, b: WidgetTag) => a.name.localeCompare(b.name);

@autoUnsubscribe
@Component({
  selector: 'app-tag-cloud-widget',
  templateUrl: './tag-cloud-widget.component.html',
  styleUrls: ['./tag-cloud-widget.component.scss']
})
export class TagCloudWidgetComponent implements OnInit, OnDestroy {
  tagsSubscription: Subscription;
  isLoading = true;
  isBroken = false;
  itemsLoaded = false;
  items: WidgetTag[] = [];

  constructor(private tagsService: TagsService) {
  }

  ngOnInit() {
    this.tagsSubscription = this.tagsService.getTags()
      .finally(this.onCategoriesFinally)
      .subscribe(this.onCategoriesSuccess, this.onCategoriesError);
  }

  ngOnDestroy() {
    // do not remove
  }

  @bind
  onCategoriesSuccess(response) {
    this.items = response.sort(sortByTagName);
  }

  @bind
  onCategoriesError(response) {
    this.isBroken = true;
    console.error(response);
  }

  @bind
  onCategoriesFinally() {
    this.itemsLoaded = true;
    this.isLoading = false;
  }
}
