import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
// import { CommonSpinnerService } from '../../services/common-spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonToasterService } from '../../services/common-toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isValidForm: boolean = false;
  showSpinner: boolean = false;
  showPassword = false;
  fieldTextType: boolean;

  constructor(
    public _formBuilder: FormBuilder,
    public _authService: ApiService,
    private router: Router,
    public sharedservice: SharedService,
    // public spinnerService: CommonSpinnerService,
    public toaster: CommonToasterService,
    private cdRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
    this.sharedservice.sidebar = false;
    this.sharedservice.isHeader = true;
    if (localStorage.getItem("token")) {
      this.router.navigate(['/dashboard']);
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  ngOnInit(): void {
    // this.init();
  }

  // init() {
  // this.spinnerService.getSpinnerObserver().subscribe((status) => {
  // this.showSpinner = (status === 'start');
  // this.cdRef.detectChanges();
  // });
  // }

  login() {
    if (this.loginForm?.invalid) {
      this.isValidForm = true;
      return;
    } else {
      const payload = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      };

      this.showSpinner = true;
      this._authService.login(JSON.stringify(payload)).subscribe((res) => {
        if (res?.status == false) {
          this.showSpinner = false;
          this.toaster.showError(res?.message)
        }
        else {
          this.loginForm = null;
          this.isValidForm = false;
          this.showSpinner = false;
          localStorage.setItem('token', res.data?.accessToken);
          localStorage.setItem('id', res.data?.user_info?.id);
          localStorage.setItem('firstname', res.data?.user_info?.firstname);
          localStorage.setItem('lastname', res.data?.user_info?.lastname);
          localStorage.setItem('email', res.data?.user_info?.email);
          localStorage.setItem('phone', res.data?.user_info?.phone);
          localStorage.setItem('countryCode', res.data?.user_info?.country_code);
          this.toaster.showSuccess(res?.message)
          this.router.navigate(['/dashboard']);
        }
      },
        (error: any) => {
          this.showSpinner = false;
          this.toaster.showError("Please check your email and password.")
        });
    }
  }
}
