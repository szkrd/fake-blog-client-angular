import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from '../../interfaces/post';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  @Input() item: Post;

  @Input() standalone = false;

  text = '';
  truncated = false;

  constructor() {
  }

  ngOnInit() {
    let text = this.item.body;
    if (this.standalone) {
      text = text.replace(/\[more]/g, '');
    }
    if (text.includes('[more]')) {
      this.truncated = true;
      text = text.split('[more]')[0];
    }
    this.text = text;
  }
}
