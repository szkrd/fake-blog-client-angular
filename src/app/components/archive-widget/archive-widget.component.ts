import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {ArchiveYears} from '../../models/archive-years';
import {SessionStorageService} from '../../services/session-storage.service';
import {ArchiveMonth} from '../../interfaces/archive-month';
import {ArchiveTitle} from '../../interfaces/archive-title';
import {ArchiveYear} from '../../interfaces/archive-year';

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
  openedMonth = 0;
  currentArchiveTitles: ArchiveTitle[] = [];

  constructor(
    private postsService: PostsService,
    private sessionStorageService: SessionStorageService
  ) {
    this.openedYears = sessionStorageService.getItem('openedYears', []);
    this.openedMonth = sessionStorageService.getItem('openedMonth', 0);
  }

  ngOnInit() {
    this.postsService
      .getArchiveYears()
      .subscribe(response => {
        this.items = response;
        if (this.openedMonth) {
          this.openMonthById(this.openedMonth);
        }
      });
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

  openMonthById(id: number) {
    // we have to fool ts a bit, for this reduce to work. why?
    const archiveMonth: ArchiveMonth = [...this.items].reduce((acc: any, yearItem: ArchiveYear) => {
      acc = [...acc, ...yearItem.months];
      return acc;
    }, []).find(item => item.id === id);

    if (archiveMonth) {
      this.onMonthToggleClick(archiveMonth, true);
    }
  }

  onMonthToggleClick(archiveMonth: ArchiveMonth, forceOpen?: boolean) {
    const currentId = archiveMonth.id;
    if (forceOpen || this.openedMonth !== currentId) {
      this.openedMonth = archiveMonth.id;
      const { minDate, maxDate } = archiveMonth;
      this.postsService
        .getTitlesInMonth(minDate, maxDate)
        .subscribe(response => this.currentArchiveTitles = response);
    } else {
      this.openedMonth = -1;
      this.currentArchiveTitles = [];
    }

    this.sessionStorageService.setItem('openedMonth', this.openedMonth);
  }

}
