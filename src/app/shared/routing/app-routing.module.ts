import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from '../../component/sign-in/sign-in.component';
import { SignUpComponent } from '../../component/sign-up/sign-up.component';
import { DashboardComponent } from '../../component/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../component/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../component/verify-email/verify-email.component';

// Import canActivate guard services
import { AuthGuard } from "../../shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "../../shared/guard/secure-inner-pages.guard";

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent,  canActivate: [SecureInnerPagesGuard] },
  { path: 'register-user', component: SignUpComponent,  canActivate: [SecureInnerPagesGuard] },
  { path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent,  canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent,  canActivate: [SecureInnerPagesGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { } 
