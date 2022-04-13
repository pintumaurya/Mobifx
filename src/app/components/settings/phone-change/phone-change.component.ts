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
  email: any;

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
    this.email = localStorage.getItem("email");
  }

  ngOnInit(): void {

  }

  change() {
    let payload = {
      // "firstname": "charley",
      // "lastname": "martin",
      // "nickname": "charlo",
      email: this.email,
      // "country_id": "1",
      // "country_code": "USA",
      phone: this.phoneNo,
      // "city": "Chicago",
      // "street_address": "9898989898"
    }
    if (this.phoneNo == "") {
      this.isValid = true;
    }
    this.apiService.updateProfile(JSON.stringify(payload)).subscribe((res) => {
      if (res?.status == true) {
        this.isValid = false;
        localStorage.setItem('phone', res.data?.user_info?.phone);
        this.toaster.showSuccess(res?.message);
        this.router.navigate(['/dashboard']);
      }
      else {
        this.toaster.showError(res?.message);
      }
    });
  }

}
