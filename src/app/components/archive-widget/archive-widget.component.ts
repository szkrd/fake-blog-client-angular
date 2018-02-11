import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {ArchiveYears} from '../../models/archive-years';
import {SessionStorageService} from '../../services/session-storage.service';

@Component({
  selector: 'app-archive-widget',
  templateUrl: './archive-widget.component.html',
  styleUrls: ['./archive-widget.component.scss'],
  providers: [
    {
      provide: SessionStorageService,
      useFactory: () => new SessionStorageService('ArchiveWidget')
    }
  ]
})
export class ArchiveWidgetComponent implements OnInit {
  items: ArchiveYears;
  openedYears: number[] = [];

  constructor(
    private postsService: PostsService,
    private sessionStorageService: SessionStorageService
  ) {
    this.openedYears = sessionStorageService.getItem('openedYears', []);
  }

  ngOnInit() {
    this.postsService.getArchiveYears().subscribe(response => this.items = response);
  }

  onYearToggleClick(year: number) {
    const idx = this.openedYears.indexOf(year);
    if (idx === -1) {
      this.openedYears.push(year);
    } else {
      this.openedYears.splice(idx, 1);
    }
    this.sessionStorageService.setItem('openedYears', this.openedYears);
  }

}
