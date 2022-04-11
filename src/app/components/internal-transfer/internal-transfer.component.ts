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
  }

  userAccountList() {
    this.showSpinner = true;
    this.apiService.getUserAllAccountList().subscribe(res => {
      this.showSpinner = false;
      this.userAccount = res?.data;
    },
      (error: any) => {
      });
  }

  accountByFrom(id: any) {
    this.idByFrom = id;
  }

  accountByTo(id: any) {
    this.idByTo = id
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
      this.clearForm();
      this.toaster.showSuccess(res.message);
      this.router.navigate(['/dashboard']);
    });
  }
  clearForm() {
    this.idByFrom = null;
    this.idByTo = null;
    this.ammountOfTran = null;
    this.code = null;
  }
}
