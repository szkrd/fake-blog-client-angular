import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../interfaces/post';

@Component({
  selector: 'app-posts-page-current-tag-info',
  templateUrl: './posts-page-current-tag-info.component.html',
  styleUrls: ['./posts-page-current-tag-info.component.scss']
})
export class PostsPageCurrentTagInfoComponent implements OnInit {
  @Input() name: String;

  constructor() { }

  ngOnInit() {
  }

}
