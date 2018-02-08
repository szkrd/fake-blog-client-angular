import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from '../../interfaces/post';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() item: Post;

  @Input() standalone = false;

  protected text = '';
  protected truncated = false;

  constructor() {
  }

  ngOnInit() {
    let text = this.item.body;
    if (text.includes('[more]')) {
      this.truncated = true;
      text = text.split('[more]')[0];
    }
    this.text = text;
  }
}
