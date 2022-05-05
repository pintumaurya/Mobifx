import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mastercard-dialog',
  templateUrl: './mastercard-dialog.component.html',
  styleUrls: ['./mastercard-dialog.component.scss']
})
export class MastercardDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openExpandPopup() {
    $(document).ready(function () {
      $('#mat-expansion-panel').addClass('hidden');
    });
  }
  
  closeExpandPopup() {
    $(document).ready(function () {
      $('#mat-expansion-panel').removeClass('hidden');
    });
  }

  closeDialog() {
    $(document).ready(function () {
      $('#ncontainer').removeClass('show');
      $('#ncontainer').removeAttr('style');
      $('#invoiceDetails').removeClass('blur-mode-subject');
      $('#depositBtn').removeClass('blur-mode-subject');
    });
  }

}
