/* tslint:disable: no-floating-promises */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { HeaderLink } from '../../models/header-link';
import { HeaderLinkItem } from '../../models/header-link-item';
import { clickElement, getTextWithSelector, triggerInput } from '../../../testing/utils';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import createSpy = jasmine.createSpy;

function getHeaderLinkItem (page = 1, rel: string): HeaderLinkItem {
  return {
    page: String(page),
    per_page: '10',
    url: `http://foo.com/?q=foo&page=${page}`,
    rel,
    q: 'foo'
  };
}

function getHeaderLink (): HeaderLink {
  return {
    next: getHeaderLinkItem(5, 'next'),
    prev: getHeaderLinkItem(3, 'prev'),
    first: getHeaderLinkItem(1, 'first'),
    last: getHeaderLinkItem(100, 'last')
  };
}

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    triggerInput(fixture, 'headerLink', getHeaderLink());
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render pager links', () => {
    expect(getTextWithSelector(el, '.page-first')).toBe('First');
    expect(getTextWithSelector(el, '.page-prev')).toBe('3');
    expect(getTextWithSelector(el, '.page-current')).toBe('4');
    expect(getTextWithSelector(el, '.page-next')).toBe('5');
    expect(getTextWithSelector(el, '.page-last')).toBe('Last');
  });

  it('should hide missing links from the ui', () => {
    const hideAndCheckText = (name: string) => {
      component.headerLink[name] = null;
      fixture.detectChanges();
      expect(getTextWithSelector(el, '.page-' + name, true)).toBeFalsy();
    };

    ['first', 'prev', 'next', 'last'].forEach(hideAndCheckText);
  });

  it('should use the urls on the hrefs', () => {
    const links = el.queryAll(By.css('a')).map(dEl => dEl.nativeElement.href);
    expect(links).toEqual([
      'http://foo.com/?q=foo&page=1',
      'http://foo.com/?q=foo&page=3',
      '',
      'http://foo.com/?q=foo&page=5',
      'http://foo.com/?q=foo&page=100'
    ]);
  });

  it('should send the clicked link to the parent', () => {
    const spy = createSpy('headerLinkSelectEmitter');
    component.headerLinkSelectEmitter.subscribe(spy);

    const detectClick = (name: string) => {
      clickElement(el.query(By.css('.page-' + name)).nativeElement);
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(component.headerLink[name]);
      spy.calls.reset();
    };

    ['first', 'prev', 'next', 'last'].forEach(detectClick);
  });
});
