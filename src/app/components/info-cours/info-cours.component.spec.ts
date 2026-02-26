import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCoursComponent } from './info-cours.component';

describe('InfoCoursComponent', () => {
  let component: InfoCoursComponent;
  let fixture: ComponentFixture<InfoCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
