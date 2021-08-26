import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { PostsPage } from './posts.page';
import { PostsPageRoutingModule } from './posts-routing.module';
import { PostItemComponentModule } from './components/post-item/post-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostItemComponentModule,
    PostsPageRoutingModule,
  ],
  declarations: [PostsPage],
})
export class PostsPageModule {}
