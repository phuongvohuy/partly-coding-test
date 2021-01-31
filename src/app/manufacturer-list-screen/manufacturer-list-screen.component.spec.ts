import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerListScreenComponent } from './manufacturer-list-screen.component';

describe('ManufacturerListScreenComponent', () => {
  let component: ManufacturerListScreenComponent;
  let fixture: ComponentFixture<ManufacturerListScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturerListScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
