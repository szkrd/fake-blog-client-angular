import {Post} from './post';
import {Pageable} from './pageable';

export interface Posts extends Pageable {
  items: Post[];
}
