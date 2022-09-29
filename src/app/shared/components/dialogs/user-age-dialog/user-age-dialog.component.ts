import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../core/services/user.service';

const TODAY = new Date();

@Component({
  selector: 'app-user-age-dialog',
  templateUrl: './user-age-dialog.component.html',
  styleUrls: ['./user-age-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserAgeDialogComponent implements OnInit {
  public MIN_DATE: NgbDate = new NgbDate(1936, 1, 1);
  public MAX_DATE: NgbDate = new NgbDate(TODAY.getFullYear(), TODAY.getMonth() + 1, TODAY.getDate());
  public dateDefault: NgbDate = {} as NgbDate;

  constructor(public activeModal: NgbActiveModal, private _userService: UserService) {
  }

  ngOnInit(): void {
    this.setDefaultDateByUserDate();
  }

  public setDefaultDateByUserDate(): void {
    if (this._userService.bornDate) {
      this.dateDefault = new NgbDate(this._userService.bornDate.getFullYear(), this._userService.bornDate.getMonth() + 1, this._userService.bornDate.getDate());
    }
  }

  public close(): void {
    this._userService.updateBornDate(this.dateDefault.day, this.dateDefault.month, this.dateDefault.year);
    this.activeModal.close(true);
  }
}
