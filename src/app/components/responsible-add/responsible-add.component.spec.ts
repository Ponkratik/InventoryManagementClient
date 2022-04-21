import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleAddComponent } from './responsible-add.component';

describe('ResponsibleAddComponent', () => {
  let component: ResponsibleAddComponent;
  let fixture: ComponentFixture<ResponsibleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsibleAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsibleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
