import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonToasterService } from '../../..//app/services/common-toaster.service';

@Component({
  selector: 'app-internal-transfer',
  templateUrl: './internal-transfer.component.html',
  styleUrls: ['./internal-transfer.component.scss']
})
export class InternalTransferComponent implements OnInit {

  showSpinner: boolean = false;
  userAccount: any = [];
  idByFrom = "0";
  idByTo = "0";
  ammountOfTran: any;
  code: any;
  accountDetailFrom: any = [];
  accountDetailTo: any = [];

  constructor(
    public sharedService: SharedService,
    public apiService: ApiService,
    public router: Router,
    public toaster: CommonToasterService) {
    this.sharedService.sidebar = true;
    this.sharedService.isHeader = false;
  }

  ngOnInit() {
    this.userAccountList();
    this.clearForm();
    if (this.idByFrom == null) {
      this.accountByFrom(1)
    }
  }

  userAccountList() {
    this.showSpinner = true;
    this.apiService.getUserAllAccountList().subscribe(res => {
      this.showSpinner = false;
      this.userAccount = res?.data;
    });
  }

  accountByFrom(id: any) {
    this.idByFrom = id;
    if (this.idByFrom) {
      this.showSpinner = true;
      this.apiService.getAccountList(this.idByFrom).subscribe((res) => {
        if (res?.status == true) {
          this.accountDetailFrom = res?.data;
        }
        this.showSpinner = false;
      });
    }
  }

  accountByTo(id: any) {
    this.idByTo = id;
    if (this.idByTo) {
      this.showSpinner = true;
      this.apiService.getAccountList(this.idByTo).subscribe((res) => {
        if (res?.status == true) {
          this.accountDetailTo = res?.data;
        }
        this.showSpinner = false;
      });
    }
  }

  internalTransferSumbit() {
    let payload = {
      code: this.code,
      user_id: localStorage.getItem('id'),
      to_account_information_id: this.idByTo,
      from_account_information_id: this.idByFrom,
      amount: this.ammountOfTran
    }

    this.apiService.addInterTransfer(payload).subscribe((res) => {
      if (res?.status == true) {
        this.clearForm();
        this.toaster.showSuccess(res?.message);
        this.router.navigate(['/dashboard']);
      }
      else {
        this.toaster.showError(res?.message);
      }
    });
  }
  clearForm() {
    this.idByFrom = null;
    this.idByTo = null;
    this.ammountOfTran = null;
    this.code = null;
  }
}
