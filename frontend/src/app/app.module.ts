import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BlogsComponent } from './blogs/blogs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FeedComponent } from './feed/feed.component';
import { BlogcardsComponent } from './blogcards/blogcards.component';
import { BlogComponent } from './blog/blog.component';
import { RecommendedFeedComponent } from './recommended-feed/recommended-feed.component';
import { RatingComponent } from './rating/rating.component';
import { ForumComponent } from './forum/forum.component';
import { ForumCardComponent } from './forum/forum-card/forum-card.component';
import { ForumItemsComponent } from './forum/forum-card/forum-items/forum-items.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserProfileComponent,
    BlogsComponent,
    SidebarComponent,
    FeedComponent,
    BlogcardsComponent,
    BlogComponent,
    RecommendedFeedComponent,
    RatingComponent,
    ForumComponent,
    ForumCardComponent,
    ForumItemsComponent,
    CreateBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
