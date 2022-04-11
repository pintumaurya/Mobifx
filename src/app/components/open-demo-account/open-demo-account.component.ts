import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-open-demo-account',
  templateUrl: './open-demo-account.component.html',
  styleUrls: ['./open-demo-account.component.scss']
})
export class OpenDemoAccountComponent implements OnInit {

  constructor(public sharedService: SharedService) {
    this.sharedService.sidebar = true;
    this.sharedService.isHeader = false;
  }

  ngOnInit(): void {
  }

}
