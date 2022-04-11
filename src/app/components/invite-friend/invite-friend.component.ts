import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-invite-friend',
  templateUrl: './invite-friend.component.html',
  styleUrls: ['./invite-friend.component.scss']
})
export class InviteFriendComponent implements OnInit {

  constructor(public sharedService: SharedService) {
    this.sharedService.sidebar = true;
  }

  ngOnInit(): void {
  }

}
