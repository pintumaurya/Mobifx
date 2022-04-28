import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ApiService } from '../../services/api.service';
import { CommonToasterService } from '../../../app/services/common-toaster.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  showSpinner: boolean = false;
  demoAccList: any = [];
  realAccList: any = [];
  tabindex = 0;
  displayedColumns: string[] = ['NewColumn', 'Account', 'Type', 'Server', 'Balance', 'Equity'];
  pageIndex = 0;
  pageSize = 0;
  length = 0;
  sizeOptions: number[] = [10, 25, 50, 100, 150];
  pageIndex1 = 0;
  pageSize1 = 0;
  length1 = 0;
  sizeOptions1: number[] = [10, 25, 50, 100, 150];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

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

  ngAfterViewInit() {
    this.realAccList.paginator = this.paginator;
    this.demoAccList.paginator = this.paginator;
  }

  tabChanged(event: any) {
    this.tabindex = event.index;
  }

  userAccountList() {
    this.showSpinner = true;
    this.apiService.getUserAllAccountList().subscribe((res) => {
      if (res?.status == true) {
        res?.data.forEach((element: { account_type: number; }) => {
          if (element.account_type == 1) {
            this.realAccList.push(element);
          }
          if (element.account_type == 0) {
            this.demoAccList.push(element);
          }
        });
        this.length = this.realAccList.length;
        // this.pageIndex= this.
        this.length1 = this.demoAccList.length;
      }
      this.showSpinner = false;
    });
  }

}
