import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Certification } from '../../../core/models/certification';
import { MovieCertificationsService } from '../../../core/services/movie-certifications.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CertificationsComponent implements OnInit, OnDestroy {
  @Output()
  public saveFilter: EventEmitter<Certification[]> = new EventEmitter<Certification[]>();
  public certifications: Certification[] = [];
  public certificationsPrev: Certification[] = [];
  public isSelectionChanged: boolean = false;
  private _ngUnsubscribe$: Subject<void> = new Subject();


  constructor(private _certificationService: MovieCertificationsService, private _userService: UserService) {
  }

  public ngOnInit(): void {
    this.listenerIsAdultUser();
    this.listenerGetCertifications();
  }

  public ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }

  public onChangeSelection($event: string): void {
    this.certifications.map(certification => certification.certification === $event && (certification.selected = !certification.selected));
    this.setIsSelectionChanged();
  }

  public onSave(): void {
    this.saveFilter.emit(this.certifications);
    this.certificationsPrev = structuredClone(this.certifications);
    this.setIsSelectionChanged();
  }

  private listenerIsAdultUser(): void {
    this._userService.isAdult$.pipe(
      takeUntil(this._ngUnsubscribe$),
      distinctUntilChanged()
    ).subscribe(() => this._certificationService.getMovieCertifications());
  }

  private listenerGetCertifications(): void {
    this._certificationService.certifications$.pipe(
      takeUntil(this._ngUnsubscribe$)
    ).subscribe(certifications => {
      this.certifications = structuredClone(certifications);
      this.certificationsPrev = structuredClone(certifications);
    });
  }

  private setIsSelectionChanged(): void {
    this.isSelectionChanged = JSON.stringify(this.certifications) !== JSON.stringify(this.certificationsPrev);
  }

}
