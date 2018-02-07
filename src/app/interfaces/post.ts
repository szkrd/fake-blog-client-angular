import {User} from './user';
import {Category} from './category';
import {Tag} from './tag';

export interface Post {
  id: number;
  title: string;
  createdAt: Date;
  body: string;
  image: string;
  views: number;
  recommends: number;
  user: User;
  category: Category;
  tags: Tag[];
}
