import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-invite-friend',
  templateUrl: './invite-friend.component.html',
  styleUrls: ['./invite-friend.component.scss']
})
export class InviteFriendComponent implements OnInit {

  constructor(
    public sharedService: SharedService,
    public dialogRef: MatDialogRef<InviteFriendComponent>
  ) {
    this.sharedService.sidebar = true;
  }

  ngOnInit(): void {

  }

  closeDialog() {
    this.dialogRef.close();
  }

}
