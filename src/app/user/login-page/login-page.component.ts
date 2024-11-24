import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { userService } from '../user-service.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(private userService:userService, private router:Router) {}

  login(event:Event,emailValue:string,passwordValue:string){
    event.preventDefault()
    this.userService.login()
    this.router.navigate(['/home'])
  }

}
