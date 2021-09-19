import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelieveryComponent } from './delievery.component';

describe('DelieveryComponent', () => {
  let component: DelieveryComponent;
  let fixture: ComponentFixture<DelieveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelieveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelieveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
