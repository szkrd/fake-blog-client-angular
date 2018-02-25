import {Component, OnInit} from '@angular/core';
import {Category} from '../../interfaces/category';
import {CategoriesService} from '../../services/categories.service';
import bind from '../../utils/bind.decorator';
import 'rxjs/add/operator/finally';
import {Subscription} from 'rxjs/Subscription';
import autoUnsubscribe from '../../utils/auto-unsubscribe.decorator';

@autoUnsubscribe
@Component({
  selector: 'app-categories-widget',
  templateUrl: './categories-widget.component.html',
  styleUrls: ['./categories-widget.component.scss']
})
export class CategoriesWidgetComponent implements OnInit {
  categoriesSubscription: Subscription;
  isLoading = true;
  isBroken = false;
  itemsLoaded = false;
  items: Category[] = [];

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categoriesSubscription = this.categoriesService
      .getCategories()
      .finally(this.onCategoriesFinally)
      .subscribe(this.onCategoriesSuccess);
  }

  @bind
  onCategoriesSuccess(response) {
    this.items = response;
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
