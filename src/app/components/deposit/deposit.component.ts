import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ApiService } from '../../services/api.service';
import { CommonToasterService } from '../../services/common-toaster.service';
import { Router } from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
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
  id: any;
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
  currencySign: any = '$';
  paymentMethod: any;
  isShowUPI: boolean;
  showConvertedDeposite: any;
  depositeMinValidation: boolean = false;
  depositeMaxValidation: boolean = false;
  continueFlag: boolean = true;
  isShowMasterCard: boolean;
  showConvertedDepositeMaster: number;
  depositAmountMaster: any;
  depositeMasterMinValidation: boolean;
  depositeMasterMaxValidation: boolean;
  encRequest: String;
  accessCode: String;
  // posting = false;
  isShowBTC: boolean = false;
  isShowContinueBtn: boolean = false;

  @ViewChild('form') form: ElementRef;

  encRequestRes: any;
  order_no: any = 'qaz234567';
  testAmount: any = '10';
  selectedAddress: any = {
    name: 'testing',
    address: 'test address',
    city: 'test city',
    pincode: '23456',
    state: 'state test',
    phone: '1234567890',
  }
  isShowNotifyBox: boolean = false;
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
    this.accessCode = "F94007DF1640D69A";
  }

  userAccountList() {
    this.showSpinner = true;
    this.apiService.getUserAllAccountList().subscribe((res) => {
      if (res?.status == true) {
        this.dataSource = [];
        res?.data.forEach((element) => {
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
    console.log(event.value);
    this.selectedPaymentMethod = event.source._checked;
    if (event.source._checked == true) {
      this.paymentMethodValidation = false;
    }
    if (event.value == 'mb') {
      $('#invoiceDetails').removeClass('blur-mode-subject');
      $('#depositBtn').removeClass('blur-mode-subject');
      this.paymentMethod = event.value;
      this.isShowSkrill = true;
      this.isShowContinueBtn = true;
      this.isShowconfirmation = false;
    } else {
      this.isShowSkrill = false;
    }
    if (event.value == "echp_upi") {
      $('#invoiceDetails').removeClass('blur-mode-subject');
      $('#depositBtn').removeClass('blur-mode-subject');
      this.paymentMethod = event.value;
      this.isShowUPI = true;
      this.currencySign = "₹";
      this.depositAmount = 3000.00;
      this.isShowContinueBtn = true;
      this.isShowconfirmation = false;
    } else {
      this.isShowUPI = false;
    }
    if (event.value == 'exactly') {
      $('#invoiceDetails').addClass('blur-mode-subject');
      $('#depositBtn').addClass('blur-mode-subject');
      this.paymentMethod = event.value;
      this.isShowMasterCard = true;
      this.isShowNotifyBox = true;
      this.isShowContinueBtn = true;
      this.isShowconfirmation = false;
    } else {
      this.isShowMasterCard = false;
      this.isShowNotifyBox = false;
    }
    if (event.value == "btc") {
      this.isShowContinueBtn = false;
      this.isShowconfirmation = false;
      this.isShowBTC = true;
    } else {
      this.isShowBTC = false;
    }
  }

  paymentAmount(event: any) {
    // console.log(event);
    // this.depositAmount = null;
    this.paymentValue = event.value;
    // console.log(this.paymentValue);
  }

  onSearchChange(searchValue: any) {
    // console.log('searchValue', searchValue);
    this.paymentValue = null;
    this.depositAmount = searchValue;
    this.depositAmountMaster = searchValue;

    // console.log("this.depositAmount", this.depositAmount);
    let amt = parseInt(this.depositAmount);
    this.showConvertedDeposite = amt * (0.013);
    this.showConvertedDepositeMaster = amt * (1.05);
    // console.log(this.showConvertedDeposite);

    if (this.depositAmount == 1) {
      this.depositeMinValidation = true;
      return;
    } else {
      this.depositeMinValidation = false;
    }

    if (this.depositAmount > 200000) {
      this.depositeMaxValidation = true;
      return;
    } else {
      this.depositeMaxValidation = false;

    }

    if (this.depositAmountMaster < 50) {
      this.depositeMasterMinValidation = true;
      return;
    } else {
      this.depositeMasterMinValidation = false;
    }

    if (this.depositAmountMaster > 5000) {
      this.depositeMasterMaxValidation = true;
      return;
    } else {
      this.depositeMasterMaxValidation = false;
    }
  }

  // onEuropeChange(){

  // }
  selectedToggle(event: any) {
    console.log('event', event);
    this.currencySign = event;
    if (event == '€') {
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
      this.isShowconfirmation = false;
      this.paymentMethodValidation = true;
    }
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

  addNewDeposit() {
    let payload = {
      // "user_id": localStorage.getItem('id'),
      // "account_information_id": this.id,
      // "amount": this.paymentValue ? this.paymentValue : this.depositAmount,
      // "currency": this.accountDetailsList?.currency,
      pay_to_email: 'app.engear@gmail.com',
      language: 'EN',
      amount: '10',
      currency: 'GBP',
    };
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

  onPost(): void {
    // this.posting = true;
    this.form.nativeElement.submit();
  }

  // ngAfterViewChecked() {
  //   if (this.posting && this.form) {
  //     this.form.nativeElement.submit();
  //   }
  // }

  checkout() {
    let redirect_url = 'http%3A%2F%2Flocalhost%3A3008%2Fhandleresponse';
    let useremail = 'testemail@gmail.com';
    let request = `merchant_id=2193&order_id=${this.order_no}&currency=INR&amount=${this.testAmount}&redirect_url=${redirect_url}&cancel_url=${redirect_url}&language=EN&billing_name=${this.selectedAddress.name}&billing_address=${this.selectedAddress.address}&billing_city=${this.selectedAddress.city}&billing_state=MH&billing_zip=${this.selectedAddress.pincode}&billing_country=India&billing_tel=${this.selectedAddress.phone}&delivery_name=${this.selectedAddress.name}&delivery_address=${this.selectedAddress.address}&delivery_city=${this.selectedAddress.city}&delivery_state=${this.selectedAddress.state}&delivery_zip=${this.selectedAddress.pincode}&delivery_country=India&delivery_tel=${this.selectedAddress.phone}&billing_email=${useremail}`;
    return
    this.apiService.addDeposit(request).subscribe(
      (data) => {
        console.log('---------------------', data['response']);
        this.encRequestRes = data['response'];
        setTimeout(() => {
          this.form.nativeElement.submit();
        }, 1000);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
