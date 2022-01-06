import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivesComponent } from './receives.component';

describe('ReceivesComponent', () => {
  let component: ReceivesComponent;
  let fixture: ComponentFixture<ReceivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
