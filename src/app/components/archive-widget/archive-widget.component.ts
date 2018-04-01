import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {ArchiveYears} from '../../models/archive-years';
import {SessionStorageService} from '../../services/session-storage.service';
import {ArchiveMonth} from '../../interfaces/archive-month';
import {ArchiveTitle} from '../../interfaces/archive-title';
import {ArchiveYear} from '../../interfaces/archive-year';
import bind from '../../utils/bind.decorator';
import 'rxjs/add/operator/finally';
import {Subscription} from 'rxjs/Subscription';
import autoUnsubscribe from '../../utils/auto-unsubscribe.decorator';

@autoUnsubscribe
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
export class ArchiveWidgetComponent implements OnInit, OnDestroy {
  items: ArchiveYears;
  isItemsLoading = true;
  itemsLoaded = false;
  isTitlesLoading = 0;
  titlesLoaded = false;
  openedYears: number[] = [];
  openedMonth = 0;
  currentArchiveTitles: ArchiveTitle[] = [];
  archiveYearsSubscription: Subscription;
  postTitlesSubscription: Subscription;

  constructor(private postsService: PostsService,
              private sessionStorageService: SessionStorageService) {
    this.openedYears = sessionStorageService.getItem('openedYears', []);
    this.openedMonth = sessionStorageService.getItem('openedMonth', 0);
  }

  ngOnInit() {
    this.archiveYearsSubscription = this.postsService
      .getArchiveYears()
      .finally(this.onGetArchiveYearsFinally)
      .subscribe(this.onGetArchiveYearsSuccess);
  }

  ngOnDestroy() {
    // do not remove
  }

  // multiple year items may be opened, we store the opened ones' ids in storage
  onYearToggleClick(year: number) {
    const idx = this.openedYears.indexOf(year);
    if (idx === -1) {
      this.openedYears.push(year);
    } else {
      this.openedYears.splice(idx, 1);
    }

    this.sessionStorageService.setItem('openedYears', this.openedYears);
  }

  // open or close a month and show its posts, only one month may be open at a time
  onMonthToggleClick(archiveMonth: ArchiveMonth, forceOpen?: boolean) {
    const {minDate, maxDate, id} = archiveMonth;
    const open = forceOpen || this.openedMonth !== id;

    if (this.postTitlesSubscription) {
      this.postTitlesSubscription.unsubscribe();
    }

    if (open) {
      this.openMonth(id, minDate, maxDate);
    } else {
      this.closeMonth();
    }
  }

  @bind
  protected onGetArchiveYearsSuccess(response) {
    this.items = response;
    if (this.openedMonth) {
      this.openMonthById(this.openedMonth);
    }
  }

  @bind
  protected onGetArchiveYearsFinally() {
    this.itemsLoaded = true;
    this.isItemsLoading = false;
  }

  // find a month by id (201512) and then force toggle it on the ui
  protected openMonthById(id: number) {
    // we have to fool ts a bit, for this reduce to work. why?
    const archiveMonth: ArchiveMonth = [...this.items].reduce((acc: any, yearItem: ArchiveYear) => {
      acc = [...acc, ...yearItem.months];
      return acc;
    }, []).find(item => item.id === id);

    if (archiveMonth) {
      this.onMonthToggleClick(archiveMonth, true);
    }
  }

  // download post titles for the month range that is about to be opened
  protected openMonth(monthId: number, minDate: number, maxDate: number) {
    this.titlesLoaded = false;
    this.openedMonth = monthId;
    this.isTitlesLoading = this.openedMonth;
    this.postTitlesSubscription = this.postsService
      .getTitlesInMonth(minDate, maxDate)
      .finally(this.onGetTitlesInMonthFinally)
      .subscribe(this.onGetTitlesInMonthSuccess);

    this.sessionStorageService.setItem('openedMonth', this.openedMonth);
  }

  // flush post names, close list of titles
  protected closeMonth() {
    this.openedMonth = -1;
    this.currentArchiveTitles = [];
    this.sessionStorageService.setItem('openedMonth', this.openedMonth);
  }

  @bind
  protected onGetTitlesInMonthSuccess(response) {
    this.currentArchiveTitles = response;
  }

  @bind
  protected onGetTitlesInMonthFinally() {
    this.titlesLoaded = true;
    this.isTitlesLoading = 0;
  }

}
