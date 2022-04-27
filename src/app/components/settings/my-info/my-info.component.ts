import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { ApiService } from '../../..//services/api.service';
import { CommonToasterService } from '../../../../app/services/common-toaster.service';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.scss']
})
export class MyInfoComponent implements OnInit {

  userData: any;
  id: any;
  showSpinner: boolean = false;
  showUploadSection: boolean = false;

  constructor(
    public sharedService: SharedService,
    public apiService: ApiService,
    public toaster: CommonToasterService
  ) {
    this.sharedService.sidebar = true;
    this.sharedService.isHeader = false;
    this.id = localStorage.getItem('id');
  }

  ngOnInit() {
    this.userInfo(this.id);
  }

  userInfo(id: any) {
    this.showSpinner = true;
    this.apiService.getUserInformation(id).subscribe((res) => {
      if (res?.status == true) {
        this.userData = res?.data;
      }
      this.showSpinner = false;
    },
      (error: any) => {
        this.toaster.showError("Oops!!!, something went wrong, please try again.");
      });
  }

  selectUploadFile() {
    this.showUploadSection = !this.showUploadSection;
  }

}
