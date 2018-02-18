import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Category} from '../interfaces/category';

@Injectable()
export class CategoriesService {
  private url = `${environment.apiUrl}/categories`;

  constructor(protected httpClient: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<any>(this.url);
  }
}
