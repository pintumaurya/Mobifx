import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { UserStatusComponent } from './components/user-status/user-status.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { ManageBounsesComponent } from './components/manage-bounses/manage-bounses.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { OpenRealAccountComponent } from './components/open-real-account/open-real-account.component';
import { OpenDemoAccountComponent } from './components/open-demo-account/open-demo-account.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { InternalTransferComponent } from './components/internal-transfer/internal-transfer.component';
import { WithdrawHistoryComponent } from './components/withdraw-history/withdraw-history.component';
import { DepositHistoryComponent } from './components/deposit-history/deposit-history.component';
import { TransferHistoryComponent } from './components/transfer-history/transfer-history.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VerificationDetailsComponent } from './components/verification-details/verification-details.component';
import { EmailVerifyComponent } from './components/email-verify/email-verify.component';
import { ResetPasswordComponent } from './components/settings/reset-password/reset-password.component';
import { MyInfoComponent } from './components/settings/my-info/my-info.component';
import { PhoneChangeComponent } from './components/settings/phone-change/phone-change.component';
import { AccountLogComponent } from './components/settings/account-log/account-log.component';
import { AuthInterceptor } from './components/interceptors/auth.interceptor';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatDialogModule } from '@angular/material/dialog';
import { ApiService } from './services/api.service';
import { AuthGuard } from '../app/services/auth-guard.services';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SidebarComponent,
    HomeComponent,
    SignUpComponent,
    DashboardComponent,
    AccountListComponent,
    ManageBounsesComponent,
    MonitoringComponent,
    OpenRealAccountComponent,
    OpenDemoAccountComponent,
    UserStatusComponent,
    WithdrawComponent,
    InternalTransferComponent,
    WithdrawHistoryComponent,
    DepositHistoryComponent,
    TransferHistoryComponent,
    EmailVerifyComponent,
    VerificationDetailsComponent,
    ResetPasswordComponent,
    MyInfoComponent,
    PhoneChangeComponent,
    AccountLogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatStepperModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    NgxIntlTelInputModule,
    MatSelectCountryModule.forRoot('de'),
    ToastrModule.forRoot(),
  ],
  providers: [ApiService,
    // CommonSpinnerService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
