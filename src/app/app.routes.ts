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
            {path:':themeId', component:CurrentThemeComponent},
        ]
    },
    {path:'create-theme', component:CreateThemeComponent}
    // {path:'404',component:ErrorComponent},
    // {path: '**', redirectTo:'/404'}

];
