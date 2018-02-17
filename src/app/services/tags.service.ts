import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WidgetTag} from '../interfaces/widget-tag';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class TagsService {
  private url = `${environment.apiUrl}/tags`;

  constructor(protected httpClient: HttpClient) {
  }

  getTags(): Observable<WidgetTag[]> {
    const params = new HttpParams()
      .set('_include', 'posts')
      .set('_count', 'posts');

    return this.httpClient
      .get<any>(this.url, {params});
  }
}
