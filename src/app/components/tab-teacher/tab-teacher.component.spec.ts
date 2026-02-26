import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTeacherComponent } from './tab-teacher.component';

describe('TabTeacherComponent', () => {
  let component: TabTeacherComponent;
  let fixture: ComponentFixture<TabTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabTeacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
