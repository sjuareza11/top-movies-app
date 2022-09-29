import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {
  }

  private _bornDate: Date = new Date();
  public get bornDate(): Date {
    return this._bornDate;
  }

  private _isDateConfiguredByUser = false;

  public get isDateConfiguredByUser(): boolean {
    return this._isDateConfiguredByUser;
  }

  private _isAdult$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAdult());

  public get isAdult$(): Observable<boolean> {
    return this._isAdult$.asObservable();
  }

  public isAdult(): boolean {
    const today = new Date();
    return today.getFullYear() - this.bornDate.getFullYear() >= 18;
  }

  public updateBornDate(day: number, month: number, year: number): void {
    this._bornDate?.setDate(day);
    this._bornDate?.setMonth(month - 1);
    this._bornDate?.setFullYear(year);
    this._isDateConfiguredByUser = true;
    this._isAdult$.next(this.isAdult());
  }
}
