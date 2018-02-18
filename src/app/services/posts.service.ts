import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {environment} from '../../environments/environment';
import {Posts} from '../interfaces/posts';
import {ResponseHeader} from '../models/response-header';
import {Post} from '../interfaces/post';
import {ArchiveYears} from '../models/archive-years';
import {ArchiveMonth} from '../interfaces/archive-month';
import {ArchiveTitle} from '../interfaces/archive-title';
import {HeaderLink} from '../interfaces/header-link';
import {HeaderLinkItem} from '../interfaces/header-link-item';
import {HttpUtilsService} from './http-utils.service';

@Injectable()
export class PostsService {
  private url = `${environment.apiUrl}/posts`;

  constructor(
    private httpClient: HttpClient,
    private httpUtilsService: HttpUtilsService
  ) {
  }

  getPostsByHeaderLink(params: HeaderLinkItem): Observable<Posts> {
    const httpParams = this.httpUtilsService.headerLinkItemToHttpParams(params);
    return this.httpClient
      .get<any>(this.url, {
        params: httpParams,
        observe: 'response'
      }).map(response => {
        const header = new ResponseHeader(response.headers);
        const pagination = header.link;
        const items: Post[] = response.body;
        return {
          pagination,
          items
        };
      });
  }

  getPosts(page = 1): Observable<Posts> {
    return this.getPostsByHeaderLink({
      _limit: 10,
      _page: page,
      _include: 'tags',
      _expand: ['user', 'category']
    } as HeaderLinkItem);
  }

  getArchiveYears(): Observable<ArchiveYears> {
    const params = new HttpParams()
      .set('_only', 'createdAt');

    return this.httpClient
      .get<any>(this.url, {params})
      .map(response => {
        return new ArchiveYears(response);
      });
  }

  getTitlesInMonth(minDate: number, maxDate: number): Observable<ArchiveTitle[]> {
    const params = new HttpParams()
      .set('_only', 'title,id')
      .set('createdAt_gte', String(minDate))
      .set('createdAt_lte', String(maxDate));

    return this.httpClient
      .get<any>(this.url, {params});
  }
}
