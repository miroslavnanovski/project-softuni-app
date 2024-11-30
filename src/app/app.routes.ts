import { Routes } from '@angular/router';

import { PostsPageComponent } from './posts-page/posts-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
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

export const routes: Routes = [
    {path:'', redirectTo: '/home', pathMatch:'full'},
    {path:'home',component:HomePageComponent},
    {path:'about', component:AboutPageComponent},
    {path: 'posts', component:PostsPageComponent},
    {path: 'contact', component:ContactPageComponent},
    {path: 'register', component:RegisterPageComponent},
    {path: 'login', component:LoginPageComponent},
    {path: 'themes', 
        children:[
            {path:'',component:ThemesPageComponent},
            // {path:':themeId', component:CurrentThemeComponent},
        ]
    },
    {path:'create-theme', component:CreateThemeComponent},
    {path:'profile-settings', component:ProfileSettingsComponent},
    {path:'change-password', component:ChangePasswordComponent},
    {path:':username/themes', component:YourThemesComponent},
    {path:':username/themes/:themeId/create-post', component:CreatePostComponent},
    {path:':username/themes/:themeId',component:CurrentThemeComponent}
    // {path:'404',component:ErrorComponent},
    // {path: '**', redirectTo:'/404'}

];
