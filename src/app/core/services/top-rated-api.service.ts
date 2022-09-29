import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from 'src/app/core/models/movie';
import { environment } from 'src/environments/environment';
import { MovieApiPath } from '../enums/movie-api-path';
import { CertificationApiRequest } from '../models/certification-api-request';
import { MovieApiRequest } from '../models/movie-api-request';
import { Certification } from './../models/certification';


@Injectable({
  providedIn: 'root'
})
export class TopRatedApiService {
  private readonly _apiUrl = environment.apiUrl;
  private readonly _apiKey = environment.apiKey;
  private readonly _imgPath = environment.imgPath;
  constructor(private _http: HttpClient) { }


  public getTopRatedMovies(page: number): Observable<MovieApiRequest> {
    const request = `${this._apiUrl}/${MovieApiPath.GET_TOP_RATED.replace('{apiKey}', this._apiKey).replace('{language}', environment.countryCode).replace('{page}', page.toString())}`
    return this._http.get(request).pipe(
      map((response: any) => {
        response.results = response.results.map((movie: Movie) => (
          {
            ...movie,
            poster_path: this._imgPath + movie.poster_path
          }

        ))
        return response;
      })
    );
  }

  public getMoviesByAgeRecomendations(page: number, isAdult: boolean, certifications: Certification[]): Observable<MovieApiRequest> {
    const certificationParam = certifications.filter(certification => certification.selected).map(certification => certification.certification).join('|');
    const request = `${this._apiUrl}/${MovieApiPath.GET_DISCOVER_MOVIE.replace('{apiKey}', this._apiKey)
      .replace('{language}', environment.countryCode).replace('{page}', page.toString()).replace('{includeAdult}', String(isAdult)).replace('{certificationCountry}', environment.countryCode).replace('{certification}', certificationParam)}`
    return this._http.get(request).pipe(
      map((response: any) => {
        response.results = response.results.map((movie: Movie) => (
          {
            ...movie,
            poster_path: movie.poster_path ? this._imgPath + movie.poster_path : ''
          }

        ))
        return response;
      })
    );
  }

  public getMoviesCertifications(): Observable<CertificationApiRequest> {
    const request = `${this._apiUrl}/${MovieApiPath.GET_CERTIFICATIONS.replace('{apiKey}', this._apiKey)}`
    return this._http.get(request).pipe(
      map((response: any) => response as CertificationApiRequest)
    );
  }
  //

}
