import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelDetailComponent } from './level-detail.component';

describe('LevelDetailComponent', () => {
  let component: LevelDetailComponent;
  let fixture: ComponentFixture<LevelDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
