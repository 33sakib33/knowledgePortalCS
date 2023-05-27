import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedFeedComponent } from './recommended-feed.component';

describe('RecommendedFeedComponent', () => {
  let component: RecommendedFeedComponent;
  let fixture: ComponentFixture<RecommendedFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
