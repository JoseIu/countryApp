import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.scss'],
})
export class CountryPageComponent implements OnInit {
  public country?: Country;
  constructor(
    private activateRoute: ActivatedRoute,
    private countriesservices: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(switchMap(({ id }) => this.countriesservices.searchCountryByID(id)))
      .subscribe((country) => {
        if (!country) return this.router.navigateByUrl('');

        this.country = country;
        console.log(this.country);
        return;
      });
  }
}
