import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {PostsPageComponent} from './components/posts-page/posts-page.component';
import {PostPageComponent} from './components/post-page/post-page.component';
import {ProfilePageComponent} from './components/profile-page/profile-page.component';
import {PostItemComponent} from './components/post-item/post-item.component';
import {SearchPostsComponent} from './components/search-posts/search-posts.component';
import {HeaderComponent} from './components/header/header.component';
import {UserMenuComponent} from './components/user-menu/user-menu.component';
import {routing} from './app.routes';
import {MarkdownDirective} from './directives/markdown.directive';
import {HttpClientModule} from '@angular/common/http';
import {PostsService} from './services/posts.service';
import {PostsPagerComponent} from './components/posts-pager/posts-pager.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArchiveWidgetComponent} from './components/archive-widget/archive-widget.component';
import {MonthNamePipe} from './pipes/month-name.pipe';
import {Marked} from './interfaces/marked';
import {TagCloudWidgetComponent} from './components/tag-cloud-widget/tag-cloud-widget.component';
import {TagsService} from './services/tags.service';
import {CategoriesWidgetComponent} from './components/categories-widget/categories-widget.component';
import {CategoriesService} from './services/categories.service';
import {HttpUtilsService} from './services/http-utils.service';
import {EventBusService} from './services/event-bus.service';
import {LoaderComponent} from './components/loader/loader.component';
import {DomUtilsService} from './services/dom-utils.service';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    PostsPageComponent,
    PostPageComponent,
    ProfilePageComponent,
    PostItemComponent,
    SearchPostsComponent,
    HeaderComponent,
    UserMenuComponent,
    PostsPagerComponent,
    MarkdownDirective,
    SidebarComponent,
    ArchiveWidgetComponent,
    MonthNamePipe,
    TagCloudWidgetComponent,
    CategoriesWidgetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    routing
  ],
  providers: [
    EventBusService,
    DomUtilsService,
    HttpUtilsService,
    PostsService,
    TagsService,
    CategoriesService,
    Marked
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
