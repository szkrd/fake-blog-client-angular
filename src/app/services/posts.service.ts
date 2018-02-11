import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {environment} from '../../environments/environment';
import {Posts} from '../interfaces/posts';
import {ResponseHeader} from '../models/response-header';
import {Post} from '../interfaces/post';
import {ArchiveYears} from '../models/archive-years';

@Injectable()
export class PostsService {
  private url = `${environment.apiUrl}/posts`;

  constructor(protected httpClient: HttpClient) {
  }

  getPosts(page = 1): Observable<Posts> {

    let params = new HttpParams()
      .set('_limit', '10')
      .set('_page', String(page))
      .set('_include', 'tags');

    // this would not work in the set chain above!
    params = params.append('_expand', 'category');
    params = params.append('_expand', 'user');

    return this.httpClient
      .get<any>(this.url, {
        params, //  listing here with inline set will choke on same named items, like _expand
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

  getArchiveYears(): Observable<ArchiveYears> {
    const params = new HttpParams()
      .set('_only', 'createdAt');

    return this.httpClient
      .get<any>(this.url, {params})
      .map(response => {
        return new ArchiveYears(response);
      });
  }
}
