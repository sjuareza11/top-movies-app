import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, filter, Subject, takeUntil } from 'rxjs';
import { TopRatedService } from 'src/app/core/services/top-rated.service';
import { Certification } from '../../core/models/certification';
import { Movie } from '../../core/models/movie';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  providers: [TopRatedService],
  styleUrls: ['./top-rated.component.scss']
})
export class TopRatedComponent implements OnInit, OnDestroy {
  public movies: Movie[] = [];
  public certifications: Certification[] = [];
  private _ngUnsubscribe$: Subject<void> = new Subject();

  constructor(private _topRatedService: TopRatedService, private _userService: UserService) {
  }

  public ngOnInit(): void {
    this.listenerGetMovies();
    this.listenerIsAdultUser();
  }

  public ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }

  public onScroll(): void {
    this.getMovies();
  }

  public onSaveFilter($event: Certification[]): void {
    this.reset();
    this.certifications = [...$event];
    this.getMovies();
  }

  private listenerGetMovies(): void {
    this._topRatedService.movies$.pipe(
      takeUntil(this._ngUnsubscribe$),
    ).subscribe(movies => {
      this.movies = [...this.movies, ...movies];
    });
  }

  private listenerIsAdultUser(): void {
    this._userService.isAdult$.pipe(
      takeUntil(this._ngUnsubscribe$),
      distinctUntilChanged(),
      filter(() => this._userService.isDateConfiguredByUser)
    ).subscribe(() => {
      this.reset();
      this.getMovies();
    });
  }

  private reset(): void {
    this.certifications = [];
    this.movies = [];
    this._topRatedService.resetPagination();
  }

  private getMovies(): void {
    this._topRatedService.getMoviesByUserAge(this.certifications);
  }
}
