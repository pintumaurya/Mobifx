import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ApiService } from '../../services/api.service';
import { CommonToasterService } from '../../../app/services/common-toaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showSpinner: boolean = false;
  accountDetailsList: any = [];
  id: any;
  displayedColumns: string[] = ['Account1', 'Account', 'Type', 'Server', 'Balance', 'Equity'];
  dataSource: MatTableDataSource<any>;

  constructor(
    public sharedService: SharedService,
    public apiService: ApiService,
    public toaster: CommonToasterService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.sharedService.sidebar = true;
    this.sharedService.isHeader = false;
  }

  ngOnInit() {
    this.userAccountList();
    if (this.id == null) {
      this.accountDetails(1);
    }

    // // let date = new Date("yyyy-MM-dd HH.mm");
    // let date = new Date();

    // date.getUTCHours();
    // date.getUTCMinutes();
    // console.log('date', date.getHours(), date.getMinutes());

    // let newdate = (date.getUTCHours() - 5);

    // let newdate2 = (date.getUTCMinutes() - 30);

    // // let cal = (date.getMinutes() * 30 / 10);

    // // console.log('cal', cal);

    // console.log('gethour', newdate);

    // console.log('getMinute', newdate2);

  }

  userAccountList() {
    this.showSpinner = true;
    this.apiService.getUserAllAccountList().subscribe((res) => {
      if (res?.status == true) {
        this.dataSource = res?.data;
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
