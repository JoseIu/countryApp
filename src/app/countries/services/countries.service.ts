import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiURL: string = 'https://restcountries.com/v3.1';
  constructor(private http: HttpClient) {}

  searchCountryByID(id: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiURL}/alpha/${id}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((error) => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiURL}/capital/${term}`)
      .pipe(catchError((error) => of([])));
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiURL}/name/${term}`)
      .pipe(catchError((error) => of([])));
  }

  seratchRegion(term: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiURL}/region/${term}`)
      .pipe(catchError((error) => of([])));
  }
}
