import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-open-demo-account',
  templateUrl: './open-demo-account.component.html',
  styleUrls: ['./open-demo-account.component.scss']
})
export class OpenDemoAccountComponent implements OnInit {

  planData = [];
  leverageData = [];
  isShowBalance: boolean = false;
  isHideFixedRate: boolean = true;
  isHideAccType: boolean = true;
  isHideCurrency: boolean = true;
  currencySign = "$";
  Leverage = "1";
  leverageValue = "1";
  currencyValue = "USD";
  fixedRateValue = "1";
  balanceValue = "5000";
  acc_type = "1";

  constructor(
    public sharedService: SharedService,
    public apiService: ApiService
  ) {
    this.sharedService.sidebar = true;
    this.sharedService.isHeader = false;
  }

  ngOnInit(): void {
    this.getPlans();
    this.getLeverage();
  }

  getPlans() {
    this.apiService.getPlan().subscribe((res) => {
      if (res) {
        this.planData = res?.data;
      }
    });
  }

  getLeverage() {
    this.apiService.getLeverage().subscribe((res) => {
      if (res) {
        this.leverageData = res?.data;
      }
    });
  }
  onSelectChange(searchValue: string) {
    this.acc_type = searchValue;
    if (searchValue == "0") {
      this.isShowBalance = true;
      this.isHideFixedRate = false;
    }
    else {
      this.isShowBalance = false;
      this.isHideFixedRate = true;
    }
  }

  onSelectChange1(searchValue: string) {
    this.currencyValue = searchValue;
    if (searchValue == "EUR") {
      this.isHideFixedRate = false;
      this.currencySign = "€";
    } else {
      this.currencySign = "$";
      this.isHideFixedRate = true;
    }
  }

  onSelectChange2(searchValue: string) {
    if (searchValue == "1") {
      this.fixedRateValue = searchValue;
      this.isHideAccType = false;
      this.isHideCurrency = false;
    } else {
      this.isHideAccType = true;
      this.isHideCurrency = true;
    }
  }

  onSelectLeverage(event: any) {
    this.leverageValue = event.value;
  }

}
