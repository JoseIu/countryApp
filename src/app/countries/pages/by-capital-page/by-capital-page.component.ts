import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.scss'],
})
export class ByCapitalPageComponent {
  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}
  searchByCapital(value: string) {
    this.countriesService.searchCapital(value).subscribe((countries) => {
      this.countries = countries;
      console.log(this.countries);
    });
  }
}
