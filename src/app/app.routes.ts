import { RouterModule, Routes } from '@angular/router';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { PostPageComponent } from './components/post-page/post-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import {ViewComponent} from './components/view/view.component';

const routes: Routes = [
  { path: '', redirectTo: 'view/posts', pathMatch: 'full' },
  {
    path: 'view',
    component: ViewComponent,
    children: [
      { path: 'posts', component: PostsPageComponent },
      { path: 'post/:id', component: PostPageComponent },
      { path: 'profile', component: ProfilePageComponent }
    ]
  }
];

export const routing = RouterModule.forRoot(routes);
