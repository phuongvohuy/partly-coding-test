import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmySelectorComponent } from './mmy-selector.component';

describe('MmySelectorComponent', () => {
  let component: MmySelectorComponent;
  let fixture: ComponentFixture<MmySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MmySelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MmySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
