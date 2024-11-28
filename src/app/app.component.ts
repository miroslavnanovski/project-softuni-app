import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { PostBoxComponent } from './posts/post-box/post-box.component';
import { RegisterPageComponent } from './user/register-page/register-page.component';
import { LoginPageComponent } from './user/login-page/login-page.component';
import { ErrorComponent } from './shared/error/error.component';
import { CreateThemeComponent } from './themes/create-theme/create-theme.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent,HomePageComponent,AboutPageComponent,PostBoxComponent,RegisterPageComponent,LoginPageComponent,ErrorComponent,CreateThemeComponent,AuthenticateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo-app';
  
}
