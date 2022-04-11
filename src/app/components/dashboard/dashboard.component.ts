import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ApiService } from '../../services/api.service';
import { CommonToasterService } from '../../../app/services/common-toaster.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showSpinner: boolean = false;
  userAccount: any = [];
  accountDetailsList: any = [];
  id: any;

  constructor(
    public sharedService: SharedService,
    public apiService: ApiService,
    public toaster: CommonToasterService
  ) {
    this.sharedService.sidebar = true;
    this.sharedService.isHeader = false;
  }

  ngOnInit() {
    this.userAccountList();
    if (this.id == null) {
      this.accountDetails(1);
    }
  }

  userAccountList() {
    this.showSpinner = true;
    this.apiService.getUserAllAccountList().subscribe((res) => {
      if (res?.status == true) {
        this.userAccount = res?.data;
      }
      this.showSpinner = false;
    });
  }

  accountById(id: any) {
    this.id = id;
    this.accountDetails(id);
  }

  accountDetails(id: any) {
    this.showSpinner = true;
    this.apiService.getAccountList(id).subscribe((res) => {
      if (res?.status == true) {
        this.accountDetailsList = res?.data;
      }
      this.showSpinner = false;
    });
  }

}
