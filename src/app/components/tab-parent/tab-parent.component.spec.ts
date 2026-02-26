import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabParentComponent } from './tab-parent.component';

describe('TabParentComponent', () => {
  let component: TabParentComponent;
  let fixture: ComponentFixture<TabParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabParentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
