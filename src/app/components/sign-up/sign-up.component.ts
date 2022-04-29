import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { CommonToasterService } from '../../services/common-toaster.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  regForm: FormGroup;
  showSpinner: boolean = false;
  isValidForm: boolean = false;
  showPassword = false;
  textOverloapFName: boolean = false;
  textOverloapLName: boolean = false;
  textOverloapEmail: boolean = false;
  textOverloapPassword: boolean = false;

  constructor(
    public _formBuilder: FormBuilder,
    public sharedService: SharedService,
    public _authService: ApiService,
    private router: Router,
    private toastr: CommonToasterService
  ) {
    this.regForm = this._formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.sharedService.sidebar = false;
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  onKeyUpFName(event) {
    if (event.target.value) {
      this.textOverloapFName = true;
    } else {
      this.textOverloapFName = false;
    }
  }

  onKeyUpLName(event) {
    if (event.target.value) {
      this.textOverloapLName = true;
    } else {
      this.textOverloapLName = false;
    }
  }

  onKeyUpEmail(event) {
    if (event.target.value) {
      this.textOverloapEmail = true;
    } else {
      this.textOverloapEmail = false;
    }
  }

  onKeyUpPassword(event) {
    if (event.target.value) {
      this.textOverloapPassword = true;
    } else {
      this.textOverloapPassword = false;
    }
  }

  openAccount() {
    if (this.regForm?.invalid) {
      this.isValidForm = true;
      return;
    } else {
      const user = {
        firstname: this.regForm.get('fname').value,
        lastname: this.regForm.get('lname').value,
        email: this.regForm.get('email').value,
        password: this.regForm.get('password').value,
        login_type: "system"
      };
      this.showSpinner = true;
      this._authService.signup(user).subscribe((res) => {
        if (res?.status == true) {
          localStorage.setItem('email', this.regForm.get('email').value);
          this.regForm.reset();
          this.isValidForm = false;
          this.showSpinner = false;
          this.toastr.showSuccess(res?.message);
          this.router.navigate(['/email-verification']);
        }
        else {
          this.showSpinner = false;
          this.toastr.showError(res?.errors?.error);
        }
      },
        (_error: any) => {
          this.showSpinner = false;
          this.toastr.showError(_error?.message);
        });
    }
  }
}
