import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Country } from '../interfaces/country';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiURL: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private http: HttpClient) {}

  private searchCountryRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(catchError((error) => of([])));
  }

  searchCountryByID(id: string): Observable<Country | null> {
    const url = `${this.apiURL}/alpha/${id}`;

    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((error) => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/capital/${term}`;
    return this.searchCountryRequest(url).pipe(
      tap((countries) => (this.cacheStore.byCapital = { term, countries }))
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/name/${term}`;

    return this.searchCountryRequest(url).pipe(
      tap((countries) => (this.cacheStore.byCountries = { term, countries }))
    );
  }

  seratchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiURL}/region/${region}`;

    return this.searchCountryRequest(url).pipe(
      tap((countries) => (this.cacheStore.byRegion = { region, countries }))
    );
  }
}
