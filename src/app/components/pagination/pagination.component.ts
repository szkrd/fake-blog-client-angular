import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import {HeaderLink} from '../../interfaces/header-link';
import {HeaderLinkItem} from '../../interfaces/header-link-item';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input('header-link') headerLink: HeaderLink;

  @Output('link-select') headerLinkSelectEmitter = new EventEmitter<HeaderLinkItem>();

  currentPageNumber = 0;

  ngOnChanges (changes) {
    if (changes.headerLink) {
      this.setCurrentPageNumber(changes.headerLink.currentValue);
    }
  }

  // dumb heuristics to find the current page number for the UI
  setCurrentPageNumber (incomingHeaderLink: HeaderLink) {
    if (incomingHeaderLink.next) {
      this.currentPageNumber = Number(incomingHeaderLink.next.page) - 1;
    } else if (incomingHeaderLink.prev) {
      this.currentPageNumber = Number(incomingHeaderLink.prev.page) + 1;
    }
  }

  onClick (event: MouseEvent, headerLinkItem: HeaderLinkItem) {
    event.preventDefault();
    const payload: HeaderLinkItem = Object.assign({}, headerLinkItem);
    this.headerLinkSelectEmitter.emit(payload);
  }

}
