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
  dataSource: MatTableDataSource<any>;
  pageIndex = 0;
  pageSize = 10;
  length = 0;
  sizeOptions: number[] = [10, 25, 50, 100, 150];;
  pageEvent: PageEvent;

  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    public sharedService: SharedService,
    public apiService: ApiService,
    public router: Router,
  ) {
    this.sharedService.sidebar = true;
    this.sharedService.isHeader = false;
  }

  ngOnInit() {
    this.getAccountLog(this.pageIndex);
    this.dataSource.paginator = this.paginator;
  }

  public getAccountLog(event: any) {
    let payload = {
      page_size: event.pageIndex
    }
    this.showSpinner = true;
    this.apiService.accountLog(payload).subscribe((res) => {
      if (res?.status == true) {
        this.dataSource = res?.data;
        this.dataSource.paginator = this.paginator;
        this.pageIndex = res?.pagination?.current_page;
        this.length = res?.pagination?.total_records;;
        this.pageSize = res?.pagination?.current_page;
      }
      this.showSpinner = false;
    });
    return event;
  }

}
