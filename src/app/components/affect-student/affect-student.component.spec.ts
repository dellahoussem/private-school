import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectStudentComponent } from './affect-student.component';

describe('AffectStudentComponent', () => {
  let component: AffectStudentComponent;
  let fixture: ComponentFixture<AffectStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffectStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
