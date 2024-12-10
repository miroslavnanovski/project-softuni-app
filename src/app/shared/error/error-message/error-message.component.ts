import { Component, OnInit } from '@angular/core';
import { ErrorMsgService } from '../error-msg.service';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent implements OnInit {
  errorMsg = ''
  constructor(private errorMsgService:ErrorMsgService){}


  ngOnInit(): void {
      this.errorMsgService.apiError$.subscribe((err: any)=> {
        this.errorMsg = err?.message;
      })
  }

}
