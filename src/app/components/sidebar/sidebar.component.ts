import { Component, OnInit } from '@angular/core';
import { default as data } from '../../../assets/constants/sidebar.json';
import { MatDialog } from '@angular/material/dialog';
import { InviteFriendComponent } from '../../components/invite-friend/invite-friend.component';
import { Router } from '@angular/router';
import { CommonToasterService } from '../../services/common-toaster.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  data: any = data;
  result: any = [];
  firstName: any;
  lastName: any;
  hostname = location.pathname;
  currentRoute: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public toaster: CommonToasterService
  ) {
    // console.log("data", this.navitems);

    this.firstName = localStorage.getItem('firstname');
    this.lastName = localStorage.getItem('lastname');

    this.transform(this.firstName);

    for (let key in data.navitems) {
      if (data.navitems.hasOwnProperty(key)) {
        this.result.push(data.navitems[key]);
      }
    }
  }

  transform(value: string) {
    let first = value.substring(0, 1).toUpperCase();
    (first + value.substring(1));
    let name = this.firstName.substring(1);
    let fName = first + name;
    this.firstName = fName;
  }

  ddToggle(i: any) {
    this.result[i].menu = !this.result[i].menu;
  }

  ngOnInit(): void {
  }

  menu(event: any) {
    // console.log('event', event);
    if (event?.linkText == "Invite a friend") {
      // event?.parentLink.push[('dashboard')];
      this.router.navigate([this.hostname]);
      this.openDialog();
    }
    // console.log('hostname', this.hostname);
  }

  openDialog() {
    this.dialog.open(InviteFriendComponent);
  }

  logout() {
    this.toaster.showSuccess('user logout success');
    localStorage.clear();
  }

}
