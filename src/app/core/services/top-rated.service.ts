import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, finalize, first, Observable } from 'rxjs';
import { Movie } from 'src/app/core/models/movie';
import { Certification } from '../models/certification';
import { TopRatedApiService } from './top-rated-api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TopRatedService {
  public currentPage: number = 0;
  private _limit: number = 5;
  private _loading: boolean = false;

  constructor(
    private _topRatedApiService: TopRatedApiService,
    private _userService: UserService
  ) {}

  private _movies$: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);

  public get movies$(): Observable<Movie[]> {
    return this._movies$.asObservable();
  }

  public getAllMovies(): void {
    this.currentPage++;
    if (!this._loading) {
      this._loading = true;
      this._topRatedApiService
        .getTopRatedMovies(this.currentPage)
        .pipe(
          first(),
          filter(() => this.currentPage <= this._limit),
          finalize(() => (this._loading = false))
        )
        .subscribe((data) => {
          this._limit = data.total_pages;
          this._movies$.next(data.results);
        });
    }
  }

  public getMoviesByAgeRecomendations(
    isAdult: boolean,
    certifications: Certification[]
  ): void {
    this.currentPage++;
    if (!this._loading) {
      this._loading = true;
      this._topRatedApiService
        .getMoviesByAgeRecomendations(this.currentPage, isAdult, certifications)
        .pipe(
          first(),
          filter(() => this.currentPage <= this._limit),
          finalize(() => (this._loading = false))
        )
        .subscribe((data) => {
          this._limit = data.total_pages;
          this._movies$.next(data.results);
        });
    }
  }

  public getMoviesByUserAge(certifications: Certification[] = []): void {
    if (this._userService.isAdult() && !certifications.length) {
      this.getAllMovies();
    } else {
      this.getMoviesByAgeRecomendations(
        this._userService.isAdult(),
        certifications
      );
    }
  }

  public resetPagination(): void {
    this.currentPage = 0;
  }
}
