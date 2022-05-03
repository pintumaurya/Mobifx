import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ApiService } from '../../services/api.service';
import { CommonToasterService } from "../../services/common-toaster.service";
import { Router } from '@angular/router';

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
  paymentValue: any;
  address = localStorage.getItem('address');
  city = localStorage.getItem('city');
  email = localStorage.getItem('email');
  pCode = localStorage.getItem('countryCode');
  phone = localStorage.getItem('phone');
  currencySign: any = "$";
  paymentMethod: any;
  isShowUPI: boolean;
  showConvertedDeposite: any;
  depositeMinValidation: boolean = false;
  depositeMaxValidation: boolean = false;
  continueFlag: boolean = true;

  constructor(
    public sharedService: SharedService,
    public apiService: ApiService,
    public toaster: CommonToasterService,
    public router: Router
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
      this.paymentMethod = event.value;
      this.isShowSkrill = true;
    } else {
      this.isShowSkrill = false;
    }
    if (event.value == "echp_upi") {
      this.paymentMethod = event.value;
      this.isShowUPI = true;
      this.currencySign = "₹";
      this.depositAmount = 3000.00;
    } else {
      this.isShowUPI = false;
    }
  }

  paymentAmount(event: any) {
    console.log(event);
    // this.depositAmount = null;
    this.paymentValue = event.value;
    console.log(this.paymentValue);


  }

  onSearchChange(searchValue: any) {
    console.log('searchValue', searchValue);
    this.paymentValue = null;
    this.depositAmount = searchValue;
    console.log("this.depositAmount", this.depositAmount);
    let amt = parseInt(this.depositAmount);
    this.showConvertedDeposite = amt * (0.013)
    console.log(this.showConvertedDeposite);

    if (this.depositAmount == 1) {
      this.depositeMinValidation = true;
      return;
    }else{
      this.depositeMinValidation = false;

    }

    if (this.depositAmount >200000) {
      this.depositeMaxValidation = true;
      return;
    }else{
      this.depositeMaxValidation = false;

    }
  }

  // onEuropeChange(){

  // }
  selectedToggle(event: any) {
    console.log('event', event);
    this.currencySign = event;
    if (event == "€") {
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
      // "user_id": localStorage.getItem('id'),
      // "account_information_id": this.id,
      // "amount": this.paymentValue ? this.paymentValue : this.depositAmount,
      // "currency": this.accountDetailsList?.currency,
      pay_to_email: "app.engear@gmail.com",
      language: "EN",
      amount: "10",
      currency: "GBP",

    }
    console.log('payload', payload);
    // this.router.navigate[('https://www.skrill.com/app/pay.pl?action=prepare')];

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
