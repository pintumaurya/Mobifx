import { Component } from '@angular/core';
// import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
// import { Country } from '@angular-material-extensions/select-country';
import { SharedService } from '../app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mobifx';

  constructor(
    public sharedservice: SharedService,
    public router: Router
  ) {

  }

  // separateDialCode = true;
  // SearchCountryField = SearchCountryField;
  // CountryISO = CountryISO;
  // PhoneNumberFormat = PhoneNumberFormat;
  // preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  // onCountrySelected($event: Country) {
  //   console.log($event);
  // }
}
