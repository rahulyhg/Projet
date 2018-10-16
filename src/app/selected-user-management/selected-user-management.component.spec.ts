import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedUserManagementComponent } from './selected-user-management.component';

describe('SelectedUserManagementComponent', () => {
  let component: SelectedUserManagementComponent;
  let fixture: ComponentFixture<SelectedUserManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedUserManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
