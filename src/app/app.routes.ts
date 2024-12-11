import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { RegisterPageComponent } from './user/register-page/register-page.component';
import { ErrorComponent } from './shared/error/error.component';
import { CurrentThemeComponent } from './themes/current-theme/current-theme.component';
import { ThemesPageComponent } from './themes-page/themes-page.component';
import { CreateThemeComponent } from './themes/create-theme/create-theme.component';
import { LoginPageComponent } from './user/login-page/login-page.component';
import { ProfileSettingsComponent } from './user/user-profile/profile-settings/profile-settings.component';
import { ChangePasswordComponent } from './user/user-profile/change-password/change-password.component';
import { YourThemesComponent } from './themes/your-themes/your-themes.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { AuthGuard } from './utils/auth.guard';
import { GuestGuard } from './utils/guest.guard';
import { ErrorMessageComponent } from './shared/error/error-message/error-message.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent }, 
  { path: 'about', component: AboutPageComponent },  
  { path: 'register', component: RegisterPageComponent, canActivate: [GuestGuard] },
  { path: 'login', component: LoginPageComponent, canActivate: [GuestGuard] }, 
  { path: ':username/themes', component: YourThemesComponent, canActivate: [AuthGuard] }, 
  { path: ':username/themes/:themeId/create-post', component: CreatePostComponent, canActivate: [AuthGuard] }, 
  { path: 'themes/:themeId/create-post', component: CreatePostComponent, canActivate: [AuthGuard] }, 
  { path: ':username/themes/:themeId', component: CurrentThemeComponent, canActivate: [AuthGuard] },
  { path: 'themes/:themeId', component: CurrentThemeComponent, canActivate: [AuthGuard] }, 
  { path: 'create-theme', component: CreateThemeComponent, canActivate: [AuthGuard] },
  { path: 'profile-settings', component: ProfileSettingsComponent, canActivate: [AuthGuard] }, 
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { 
    path: 'themes', 
    children: [
      { path: '', component: ThemesPageComponent },
      { path: ':themeId', component: CurrentThemeComponent, canActivate: [AuthGuard] },
    ]
  },
  {path: 'error', component:ErrorMessageComponent},
  { path: '**', component:ErrorComponent} // Catch-all route for 404s
];
