import { Component, OnInit } from '@angular/core';
import $ from 'jquery';


@Component({
  selector: 'app-bitcoin-dialog',
  templateUrl: './bitcoin-dialog.component.html',
  styleUrls: ['./bitcoin-dialog.component.scss']
})
export class BitcoinDialogComponent implements OnInit {

  isShowQrcode: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  openShowdetail() {
    $(document).ready(function () {
      $('#additional').toggleClass('show');
      $(".show-more-detail").click(function(){
        $(this).text($(this).text() == 'More details' ? 'Hide details' : 'More details');
    });
    });
  }

  btc() {
    this.isShowQrcode = true; 
  }


}
