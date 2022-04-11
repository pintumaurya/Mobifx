import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-open-real-account',
  templateUrl: './open-real-account.component.html',
  styleUrls: ['./open-real-account.component.scss']
})
export class OpenRealAccountComponent implements OnInit {
  isReal = true;
  isUSD = true;
  isOn = false;

  constructor(public sharedService: SharedService) {
    this.sharedService.sidebar = true;
    this.sharedService.isHeader = false;
  }

  ngOnInit(): void {
  }

}
