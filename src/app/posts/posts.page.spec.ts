import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PostItemComponentModule } from '../post-item/post-item.module';

import { PostsPage } from './posts.page';

describe('PostsPage', () => {
  let component: PostsPage;
  let fixture: ComponentFixture<PostsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsPage ],
      imports: [IonicModule.forRoot(), PostItemComponentModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
