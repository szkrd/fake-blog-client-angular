import {Component, OnInit} from '@angular/core';
import {Category} from '../../interfaces/category';
import {CategoriesService} from '../../services/categories.service';

@Component({
  selector: 'app-categories-widget',
  templateUrl: './categories-widget.component.html',
  styleUrls: ['./categories-widget.component.scss']
})
export class CategoriesWidgetComponent implements OnInit {
  items: Category[] = [];

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categoriesService
      .getCategories()
      .subscribe(response => this.items = response);
  }
}
