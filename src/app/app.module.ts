import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {PostsPageComponent} from './components/posts-page/posts-page.component';
import {PostPageComponent} from './components/post-page/post-page.component';
import {ProfilePageComponent} from './components/profile-page/profile-page.component';
import {PostItemComponent} from './components/post-item/post-item.component';
import {TagsWidgetComponent} from './components/tags-widget/tags-widget.component';
import {SearchComponent} from './components/search/search.component';
import {HeaderComponent} from './components/header/header.component';
import {UserMenuComponent} from './components/user-menu/user-menu.component';
import {routing} from './app.routes';
import {MarkdownDirective} from './directives/markdown.directive';
import {HttpClientModule} from '@angular/common/http';
import {PostsService} from './services/posts.service';
import {PaginationComponent} from './components/pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsPageComponent,
    PostPageComponent,
    ProfilePageComponent,
    PostItemComponent,
    TagsWidgetComponent,
    SearchComponent,
    HeaderComponent,
    UserMenuComponent,
    PaginationComponent,
    MarkdownDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing
  ],
  providers: [
    PostsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
