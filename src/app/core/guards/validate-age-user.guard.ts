import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { UserAgeDialogComponent } from 'src/app/shared/components/dialogs/user-age-dialog/user-age-dialog.component';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateAgeUserGuard implements CanActivate {
  constructor(private _userService: UserService, private _modalService: NgbModal) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._userService.isDateConfiguredByUser) {
      return true;
    }
    return this.openValidateAgeUserDialog();
  }

  public openValidateAgeUserDialog(): Promise<boolean> {
    return this._modalService.open(UserAgeDialogComponent, {
      backdrop: 'static',
      centered: true
    }).result;
  }
}
