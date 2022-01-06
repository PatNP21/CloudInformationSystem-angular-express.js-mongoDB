import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestesComponent } from './nestes.component';

describe('NestesComponent', () => {
  let component: NestesComponent;
  let fixture: ComponentFixture<NestesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NestesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NestesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
