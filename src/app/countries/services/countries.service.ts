import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiURL: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { term: '', countries: [] },
  };

  private searchCountryRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(catchError((error) => of([])));
  }

  constructor(private http: HttpClient) {}

  searchCountryByID(id: string): Observable<Country | null> {
    const url = `${this.apiURL}/alpha/${id}`;

    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((error) => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/capital/${term}`;
    return this.searchCountryRequest(url);
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/name/${term}`;

    return this.searchCountryRequest(url);
  }

  seratchRegion(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/region/${term}`;

    return this.searchCountryRequest(url);
  }
}
