import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { CommonToasterService } from '../../services/common-toaster.service';
import { ApiService } from '../../services/api.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

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


  constructor(
    public _formBuilder: FormBuilder,
    public sharedService: SharedService,
    public _authService: ApiService,
    private router: Router,
    private toastr: CommonToasterService
    // private _snackBar: MatSnackBar
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
      // this.router.navigate(['/email-verification']);
      this.showSpinner = true;
      this._authService.signup(user).subscribe((res) => {
        if (res.status == true) {
          localStorage.setItem('email', this.regForm.get('email').value);
          this.regForm.reset();
          this.isValidForm = false;
          this.showSpinner = false;
          // this._snackBar.open(res.message, 'Undo', {
          //   duration: 3000
          // });
          this.toastr.showSuccess(res.message);
          this.router.navigate(['/email-verification']);
        }
        else {
          this.showSpinner = false;
          this.toastr.showError(res.errors.error);
          // this._snackBar.open(res.message, 'Undo', {
          //   duration: 3000
          // });
        }
      },
        (_error: any) => {
          this.showSpinner = false;
          this.toastr.showError(_error?.message);
          // this._snackBar.open(_error?.errors?.error, 'Undo', {
          //   duration: 3000
          // });
        });
    }
  }
}
