import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  constructor(public sharedService: SharedService) {
    this.sharedService.sidebar = true;
    this.sharedService.isHeader = false;
  }

  ngOnInit(): void {
  }

}
