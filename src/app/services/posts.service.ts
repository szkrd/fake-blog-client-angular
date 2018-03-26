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

const arrify = x => Array.isArray(x) ? x : [x];

@Injectable()
export class PostsService {
  private url = `${environment.apiUrl}/posts`;

  constructor(
    private httpClient: HttpClient,
    private httpUtilsService: HttpUtilsService
  ) {
  }

  getPostsByHeaderLink(params: HeaderLinkItem, explicitId = -1): Observable<Posts> {
    const url = this.url + (explicitId >= 0 ? `/${explicitId}` : '');
    const httpParams = this.httpUtilsService.headerLinkItemToHttpParams(params);

    return this.httpClient
      .get<any>(url, {
        params: httpParams,
        observe: 'response'
      }).map(response => {
        const header = new ResponseHeader(response.headers);
        const pagination = header.link;
        const items: Post[] = arrify(response.body);
        return {
          pagination,
          items
        };
      });
  }

  getPosts(page = 1, text = '', tagSlug = '', categorySlug = ''): Observable<Posts> {
    const params = {
      q: text,
      _page: page,
      _limit: 10,
      _include: 'tags',
      _expand: ['user', 'category']
    };

    if (!text) {
      delete params.q;
    }

    if (!page) {
      delete params._page;
    }

    if (tagSlug) {
      params['tags@slug_includes'] = tagSlug;
    }

    if (categorySlug) {
      params['categories@slug_includes'] = categorySlug;
    }

    return this.getPostsByHeaderLink(params as HeaderLinkItem);
  }

  getPost(id: number): Observable<Posts> {
    return this.getPostsByHeaderLink({
      _include: 'tags',
      _expand: ['user', 'category']
    } as HeaderLinkItem, id);
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
