import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { ApiService } from '../../../services/api.service';
import { CommonToasterService } from '../../../../app/services/common-toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-change',
  templateUrl: './phone-change.component.html',
  styleUrls: ['./phone-change.component.scss']
})
export class PhoneChangeComponent implements OnInit {

  phone: any;
  countryCode: any;
  showSpinner: boolean = false;
  phoneNo = "";
  isValid: boolean = false;

  constructor(
    public sharedService: SharedService,
    public apiService: ApiService,
    public toaster: CommonToasterService,
    public router: Router,
  ) {
    this.sharedService.sidebar = true;
    this.sharedService.isHeader = false;

    this.phone = localStorage.getItem("phone");
    this.countryCode = localStorage.getItem("countryCode");
  }

  ngOnInit(): void {

  }

  change() {
    let payload = {
      // "firstname": "charley",
      // "lastname": "martin",
      // "nickname": "charlo",
      // "email": "charley@gmail.com",
      // "country_id": "1",
      // "country_code": "USA",
      phone: this.phoneNo,
      // "city": "Chicago",
      // "street_address": "9898989898"
    }
    console.log('payload', payload);
    if (this.phoneNo == "") {
      this.isValid = true;
    }
    this.apiService.updateProfile(JSON.stringify(payload)).subscribe((res) => {
      if (res?.status == true) {
        this.isValid = false;
        this.toaster.showSuccess(res?.message);
        this.router.navigate(['/dashboard']);
      }
      this.toaster.showError(res?.message);
    });
  }

}
