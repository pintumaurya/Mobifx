import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-account-log',
  templateUrl: './account-log.component.html',
  styleUrls: ['./account-log.component.scss']
})
export class AccountLogComponent implements OnInit {

  showSpinner: boolean = false;
  accountLogData: any = [];
  displayedColumns: string[] = ['IP_address', 'Action', 'Created'];
  dataSource = new MatTableDataSource();
  pageIndex = 0;
  pageSize = 10;
  length: number;
  sizeOptions: number[] = [5, 10, 25, 100];;
  pageEvent: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public sharedService: SharedService,
    public apiService: ApiService,
    public router: Router,
  ) {
    this.sharedService.sidebar = true;
    this.sharedService.isHeader = false;
  }

  ngOnInit() {
    this.getAccountLog(this.pageSize);
    this.dataSource.paginator = this.paginator;
  }

  public getAccountLog(event: any) {
    let payload = {
      page_size: event.pageSize
    }
    this.showSpinner = true;
    this.apiService.accountLog(payload).subscribe((res) => {
      if (res?.status == true) {
        this.dataSource = res?.data;
        this.dataSource.paginator = this.paginator;
        this.pageSize = res?.data.length;
        this.length = res?.data.length;
        this.pageIndex = res?.data.length;
      }
      this.showSpinner = false;
    });
    return event;
  }

}
