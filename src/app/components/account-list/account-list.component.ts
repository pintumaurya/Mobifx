import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ApiService } from '../../services/api.service';
import { CommonToasterService } from '../../../app/services/common-toaster.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  showSpinner: boolean = false;
  userAccount: any = [];
  countAccount = 0;
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
  }

  userAccountList() {
    this.showSpinner = true;
    this.apiService.getUserAllAccountList().subscribe((res) => {
      if (res?.status == true) {
        this.userAccount = res?.data;
        this.userAccount.forEach((element: { account_type: number; }) => {
          if (element.account_type == 1) {
            this.countAccount++;
          }
        });
      }
      this.showSpinner = false;
    });
  }

}
