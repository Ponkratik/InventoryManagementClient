import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleUpdateComponent } from './responsible-update.component';

describe('ResponsibleUpdateComponent', () => {
  let component: ResponsibleUpdateComponent;
  let fixture: ComponentFixture<ResponsibleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsibleUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsibleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
