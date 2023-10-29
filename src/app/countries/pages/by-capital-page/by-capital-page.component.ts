import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.scss'],
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = [];
  public initialValue: string = '';

  //No hay busqueda
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital(value: string) {
    //empezo la busqeuda
    this.isLoading = true;

    this.countriesService.searchCapital(value).subscribe((countries) => {
      this.countries = countries;
      console.log(this.countries);
      //Termino la busqueda
      this.isLoading = false;
    });
  }
}
