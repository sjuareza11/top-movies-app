import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserAgeDialogComponent } from '../dialogs/user-age-dialog/user-age-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  constructor(private _modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  public openValidateAgeUserDialog(): void {
    this._modalService.open(UserAgeDialogComponent, {
      backdrop: 'static',
      centered: true
    }).result;
  }
}
