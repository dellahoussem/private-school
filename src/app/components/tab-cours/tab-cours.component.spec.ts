import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCoursComponent } from './tab-cours.component';

describe('TabCoursComponent', () => {
  let component: TabCoursComponent;
  let fixture: ComponentFixture<TabCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabCoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
