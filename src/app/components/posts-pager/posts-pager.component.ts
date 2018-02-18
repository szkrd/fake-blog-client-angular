import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HeaderLink} from '../../interfaces/header-link';
import {HeaderLinkItem} from '../../interfaces/header-link-item';

@Component({
  selector: 'app-posts-pager',
  templateUrl: './posts-pager.component.html',
  styleUrls: ['./posts-pager.component.scss']
})
export class PostsPagerComponent {
  @Input('header-link') headerLink: HeaderLink;

  @Output('link-select') headerLinkSelectEmitter = new EventEmitter<HeaderLinkItem>();

  onClick(headerLinkItem: HeaderLinkItem) {
    const payload: HeaderLinkItem = Object.assign({}, headerLinkItem);
    this.headerLinkSelectEmitter.emit(payload);
  }
}
