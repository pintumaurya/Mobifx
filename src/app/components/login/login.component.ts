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
      const user = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
        // email:'hardik@grr.la',
        // password:"123456"
      };

      this.showSpinner = true;
      this._authService.login(JSON.stringify(user)).subscribe(res => {
        if (res.status == true) {
          this.loginForm = null;
          this.isValidForm = false;
          this.showSpinner = false;
          localStorage.setItem('token', res.data?.accessToken);
          localStorage.setItem('id', res.data?.user_info?.id);
          localStorage.setItem('firstname', res.data?.user_info?.firstname);
          localStorage.setItem('lastname', res.data?.user_info?.lastname);
          localStorage.setItem('email', res.data?.user_info?.email);
          // this.toastr.showSuccess(res.message);
          this.toaster.showSuccess(res.message)
          // this._snackBar.open(res.message, 'Undo', {
          //   duration: 3000
          // });
          this.router.navigate(['/dashboard']);
        }
        else {
          this.showSpinner = false;
          this.toaster.showError(res.message)
          // this._snackBar.open(res.message, 'Undo', {
          //   duration: 3000
          // });
          // this.toastr.showError(res.errors.error);
        }
      },
        (_error: any) => {
          this.showSpinner = false;
          this.toaster.showError(_error?.message);
          // this._snackBar.open(_error?.message, 'Undo', {
          //   duration: 3000
          // });
        });
    }
  }
}
