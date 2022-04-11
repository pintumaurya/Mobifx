import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss']
})
export class EmailVerifyComponent implements OnInit {

  token: any = "a66cecfcf84e7b010ec58b0f4be3427ad9ad6747535c75c4446d7bdd0324ac8e";
  // urlParams: any = {};
  email: any;

  constructor(
    public _authService: ApiService,
    public route: ActivatedRoute,
  ) {
    this.email = localStorage.getItem('email');
  }

  ngOnInit(): void {
    // this.urlParams.token = this.route.snapshot.queryParamMap.get('token');
    // this.urlParams.userid = this.route.snapshot.queryParamMap.get('userid');
    // console.log('this.urlParams.token', this.urlParams.token);
    // console.log('urlParams.userid', this.urlParams.userid);


  }

  emailVerify() {
    //   this._authService.verifyEmail(this.token).subscribe(res => {
    //     console.log('res', res);
    //   },
    //     (_error: any) => {
    //       console.log('error', _error);
    //     });
  }

}
