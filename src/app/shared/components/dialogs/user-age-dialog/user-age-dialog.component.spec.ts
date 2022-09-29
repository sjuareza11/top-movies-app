import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAgeDialogComponent } from './user-age-dialog.component';

describe('UserAgeDialogComponent', () => {
  let component: UserAgeDialogComponent;
  let fixture: ComponentFixture<UserAgeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAgeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAgeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
