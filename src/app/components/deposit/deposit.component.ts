import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ApiService } from '../../services/api.service';
import { CommonToasterService } from "../../services/common-toaster.service";

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {

  panelOpenState = false;
  paymentHandler: any = null;
  selectedPaymentMethod: boolean;
  paymentMethodValidation: boolean = false;
  // stripeAI_LPKey: any = 'pk_test_51HcR0mAa9qxelKXvzeaOoz1hW8ZahTKW6MUwLgpW24tkyvvAREHQHqiXfJ7imDgSX2KLoXj6sBMcOGFRWXVX35ph00JxPs926s';
  // stripeAP_PKey: any = 'pk_live_51Kqd8QSAS29DKBv5ztQnB8wuQq2HUJp1TKcobxsb8nqfN6eAROK0ZX60uyq6IdQ7CEOd6jyd7XKa6bNJl9T6Wbfo00lG7JDZkH';
  accountDetailsList: any = [];
  showSpinner: boolean = false;
  dataSource: any;
  id: any
  isActive: boolean = false;
  isShowSkrill: boolean = false;
  depositAmount: any;
  newDeposit: any;
  isTrueDollar: boolean = true;
  isTrueEurope: boolean = false;
  isShowconfirmation: boolean = false;

  constructor(
    public sharedService: SharedService,
    public apiService: ApiService,
    public toaster: CommonToasterService
  ) {
    this.sharedService.sidebar = true;
    this.sharedService.isHeader = false;
  }

  ngOnInit(): void {
    this.userAccountList();
    if (this.id == null) {
      this.accountDetails(1);
    }
    this.isTrueDollar = true;
    // this.invokeStripe();
  }

  userAccountList() {
    this.showSpinner = true;
    this.apiService.getUserAllAccountList().subscribe((res) => {
      if (res?.status == true) {
        this.dataSource = [];
        res?.data.forEach(element => {
          if (element?.account_type == 1) {
            this.dataSource.push(element);
          }
        });
      }
      this.showSpinner = false;
    });
  }

  accountById(id: any) {
    this.id = id;
    this.accountDetails(id);
  }

  accountDetails(id: any) {
    this.showSpinner = true;
    this.apiService.getAccountList(id).subscribe((res) => {
      if (res?.status == true) {
        this.accountDetailsList = res?.data;
      }
      this.showSpinner = false;
    });
  }

  radioChange(event: any) {
    console.log(event);
    this.selectedPaymentMethod = event.source._checked;
    if (event.source._checked == true) {
      this.paymentMethodValidation = false;
      this.isActive = true;
    }
    if (event.value == "mb") {
      this.isShowSkrill = true;
    }
  }

  onSearchChange(searchValue: any) {
    console.log('searchValue', searchValue);
    this.depositAmount = searchValue;
  }

  selectedSlider(event: any) {
    console.log('event', event.checked);
    if (event.checked == true) {
      this.isTrueDollar = false;
      this.isTrueEurope = true;
    } else {
      this.isTrueDollar = true;
      this.isTrueEurope = false;
    }
  }

  Continue() {
    if (this.selectedPaymentMethod == true) {
      this.isShowconfirmation = true;
    } else {
      this.paymentMethodValidation = true;
    }
  }

  addNewDeposit() {
    let payload = {
      "user_id": localStorage.getItem('id'),
      "account_information_id": this.id,
      "amount": this.depositAmount,
      "currency": this.accountDetailsList?.currency,
    }
    console.log('payload', payload);
    this.showSpinner = true;
    this.apiService.addDeposit(payload).subscribe((res) => {
      if (res?.status == true) {
        this.newDeposit = res?.data;
        this.toaster.showSuccess(res?.message);
      }
      this.showSpinner = false;
    });
  }

  //Stripe Payment Gateway
  // makePayment(amount: any) {
  //   const paymentHandler = (<any>window).StripeCheckout.configure({
  //     key: this.stripeAI_LPKey,
  //     locale: 'auto',
  //     token: function (stripeToken: any) {
  //       console.log(stripeToken);
  //       alert('Stripe token generated!');
  //     },
  //   });
  //   paymentHandler.open({
  //     name: 'Mobifx',
  //     description: '3 widgets',
  //     amount: amount * 100,
  //   });
  // }

  // invokeStripe() {
  //   if (!window.document.getElementById('stripe-script')) {
  //     const script = window.document.createElement('script');
  //     script.id = 'stripe-script';
  //     script.type = 'text/javascript';
  //     script.src = 'https://checkout.stripe.com/checkout.js';
  //     script.onload = () => {
  //       this.paymentHandler = (<any>window).StripeCheckout.configure({
  //         key: this.stripeAI_LPKey,
  //         locale: 'auto',
  //         token: function (stripeToken: any) {
  //           console.log(stripeToken);
  //           alert('Payment has been successfull!');
  //         },
  //       });
  //     };
  //     window.document.body.appendChild(script);
  //   }
  // }

}
