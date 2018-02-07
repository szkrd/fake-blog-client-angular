import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {environment} from '../../environments/environment';
import {Posts} from '../interfaces/posts';
import {ResponseHeader} from '../models/response-header';
import {Post} from '../interfaces/post';

@Injectable()
export class PostsService {
  constructor(protected httpClient: HttpClient) {
  }

  getPosts(page = 1): Observable<Posts> {
    const url = `${environment.apiUrl}/posts`;

    return this.httpClient
      .get<any>(url, {
        params: new HttpParams()
          .set('_limit', '10')
          .set('_page', String(page))
          .set('_expand', 'category')
          .set('_expand', 'user')
          .set('_include', 'tags'),
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
}
