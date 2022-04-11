import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-manage-bounses',
  templateUrl: './manage-bounses.component.html',
  styleUrls: ['./manage-bounses.component.scss']
})
export class ManageBounsesComponent implements OnInit {

  constructor(public sharedService: SharedService) {
    this.sharedService.sidebar = true;
    this.sharedService.isHeader = false;
  }

  ngOnInit(): void {
  }

}
