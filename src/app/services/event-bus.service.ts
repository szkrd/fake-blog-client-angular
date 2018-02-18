// not used, search form launches the routing itself
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

export interface SearchForPostsEvent {
  query: string;
}

@Injectable()
export class EventBusService {
  // channels
  searchForPosts: Subject<SearchForPostsEvent> = new Subject();

  constructor() {
  }

}
