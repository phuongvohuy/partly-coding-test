import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactorListScreenComponent } from './manufactor-list-screen.component';

describe('ManufactorListScreenComponent', () => {
  let component: ManufactorListScreenComponent;
  let fixture: ComponentFixture<ManufactorListScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufactorListScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactorListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
