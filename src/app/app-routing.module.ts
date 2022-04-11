import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepositHistoryComponent } from './components/deposit-history/deposit-history.component';
import { TransferHistoryComponent } from './components/transfer-history/transfer-history.component';
import { WithdrawHistoryComponent } from './components/withdraw-history/withdraw-history.component';
import { UserStatusComponent } from './components/user-status/user-status.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { InternalTransferComponent } from './components/internal-transfer/internal-transfer.component';
// import { InviteFriendComponent } from './components/invite-friend/invite-friend.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { ManageBounsesComponent } from './components/manage-bounses/manage-bounses.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { OpenRealAccountComponent } from './components/open-real-account/open-real-account.component';
import { OpenDemoAccountComponent } from './components/open-demo-account/open-demo-account.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { EmailVerifyComponent } from './components/email-verify/email-verify.component'
import { VerificationDetailsComponent } from './components/verification-details/verification-details.component'
import { AuthGuard } from './services/auth-guard.services';
import { AuthInterceptor } from './components/interceptors/auth.interceptor';
import { ResetPasswordComponent } from './components/settings/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'deposit-history', component: DepositHistoryComponent, canActivate: [AuthGuard] },
  { path: 'transfer-history', component: TransferHistoryComponent, canActivate: [AuthGuard] },
  { path: 'withdraw-history', component: WithdrawHistoryComponent, canActivate: [AuthGuard] },
  { path: 'user-status', component: UserStatusComponent, canActivate: [AuthGuard] },
  // { path: 'invite-friend', component: InviteFriendComponent },
  { path: 'withdraw', component: WithdrawComponent, canActivate: [AuthGuard] },
  { path: 'internal-transfer', component: InternalTransferComponent, canActivate: [AuthGuard] },
  { path: 'account-list', component: AccountListComponent, canActivate: [AuthGuard] },
  { path: 'manage-bonuses', component: ManageBounsesComponent, canActivate: [AuthGuard] },
  { path: 'monitoring', component: MonitoringComponent, canActivate: [AuthGuard] },
  { path: 'open-real-account', component: OpenRealAccountComponent, canActivate: [AuthGuard] },
  { path: 'open-demo-account', component: OpenDemoAccountComponent, canActivate: [AuthGuard] },
  { path: 'email-verification', component: EmailVerifyComponent, canActivate: [AuthGuard] },
  { path: 'verification-details/:token', component: VerificationDetailsComponent },
  { path: 'verification-details', component: VerificationDetailsComponent },
  { path: 'settings/reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule],
  providers: [AuthGuard, AuthInterceptor]
})
export class AppRoutingModule { }
