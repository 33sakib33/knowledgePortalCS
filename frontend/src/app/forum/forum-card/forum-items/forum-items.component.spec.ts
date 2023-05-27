import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumItemsComponent } from './forum-items.component';

describe('ForumItemsComponent', () => {
  let component: ForumItemsComponent;
  let fixture: ComponentFixture<ForumItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
