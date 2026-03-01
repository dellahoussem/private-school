import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAddCourseComponent } from './teacher-add-course.component';

describe('TeacherAddCourseComponent', () => {
  let component: TeacherAddCourseComponent;
  let fixture: ComponentFixture<TeacherAddCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherAddCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherAddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
