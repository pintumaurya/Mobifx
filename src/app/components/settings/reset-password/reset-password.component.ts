import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { ApiService } from '../../..//services/api.service';
import { CommonToasterService } from '../../../../app/services/common-toaster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../providers/CustomValidators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPassword: FormGroup;
  userAccount: any = [];
  isShowError: boolean = false;
  showOptions: boolean = false;
  radioChangeValue: any;

  constructor(
    public _formBuilder: FormBuilder,
    public sharedService: SharedService,
    public apiService: ApiService,
    public toaster: CommonToasterService
  ) {
    this.resetPassword = this._formBuilder.group({
      currentPass: [''],
      newPass: ['', Validators.required],
      confirmPass: ['', Validators.required],
    },
      CustomValidators.mustMatch('newPass', 'confirmPass')
    );
    this.sharedService.sidebar = true;
    this.sharedService.isHeader = false;
  }

  ngOnInit() {
    this.showOptions = false;
    this.userAccountList();
  }

  userAccountList() {
    this.apiService.getUserAllAccountList().subscribe((res) => {
      if (res?.status == true) {
        this.userAccount = res?.data;
      }
    });
  }

  radioChange(event: any) {
    this.radioChangeValue = event.value;
    if (event.value == 1 || event.value == 2 || event.value == 3) {
      this.showOptions = true;
    } else {
      this.showOptions = false;
    }
  }

  change() {
    if (this.resetPassword.invalid == true) {
      this.isShowError = true;
    } else {
      if (this.radioChangeValue == 2) {
        let payload = {
          email: localStorage.getItem("email"),
          current_password: this.resetPassword.get('currentPass').value,
          update_password: this.resetPassword.get('newPass').value
        }
        this.apiService.resetPassword(JSON.stringify(payload)).subscribe((res) => {
          if (res?.status == true) {
            this.isShowError = false;
            this.toaster.showSuccess(res?.message)
            localStorage.clear();
          } else {
            this.isShowError = false;
            this.toaster.showError(res?.message);
          }
        });
      }
      if (this.radioChangeValue == 3) {
        let payload = {
          user_id: localStorage.getItem("id"),
          trading_password: this.resetPassword.get('newPass').value
        }
        this.apiService.resetAccountPassword(JSON.stringify(payload)).subscribe((res) => {
          if (res?.status == true) {
            this.isShowError = false;
            this.toaster.showSuccess(res?.message)
            localStorage.clear();
          } else {
            this.isShowError = false;
            this.toaster.showError(res?.message);
          }
        });
      }
    }
  }
}
