import { Injectable } from '@angular/core';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CERTIFICATION_ADULTS } from '../constants/certification-adult';
import { Certification } from '../models/certification';
import { CertificationCountryCode } from '../models/certification-country-code';
import { TopRatedApiService } from './top-rated-api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class MovieCertificationsService {
  private readonly _countryCode: string = environment.countryCode;

  constructor(
    private _topRatedApiService: TopRatedApiService,
    private _userService: UserService
  ) {}

  private _certifications$: BehaviorSubject<Certification[]> =
    new BehaviorSubject<Certification[]>([]);

  public get certifications$(): Observable<Certification[]> {
    return this._certifications$.asObservable();
  }

  public getMovieCertifications(): void {
    this._topRatedApiService
      .getMoviesCertifications()
      .pipe(
        first(),
        map(
          (response) =>
            response.certifications[
              this._countryCode as keyof CertificationCountryCode
            ]
        )
      )
      .subscribe((data) => {
        data = data.map((certification) => ({
          ...certification,
          disabled: this.iSDisabledCertification(certification),
          selected: false,
        }));
        this._certifications$.next(data.sort((a, b) => a.order - b.order));
      });
  }

  private iSDisabledCertification(certification: Certification): boolean {
    return (
      !this._userService.isAdult() &&
      CERTIFICATION_ADULTS.some((item) => item === certification.certification)
    );
  }
}
