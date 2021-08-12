import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlayerComponent } from './player/player.component';
import { DurationPipe } from './duration.pipe';
import { CommentReplyComponent } from './comment-reply/comment-reply.component';
import { CommentComponent } from './comment/comment.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    CommentComponent,
    AddCommentComponent,
    CommentReplyComponent,
    DurationPipe,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
