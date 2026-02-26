import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabStudentComponent } from './tab-student.component';

describe('TabStudentComponent', () => {
  let component: TabStudentComponent;
  let fixture: ComponentFixture<TabStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
