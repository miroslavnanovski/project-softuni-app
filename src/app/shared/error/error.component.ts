import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ErrorMsgService } from './error-msg.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent{

}


