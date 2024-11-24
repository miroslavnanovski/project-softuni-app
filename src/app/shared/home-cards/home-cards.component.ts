import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-home-cards',
  standalone: true,
  imports: [],
  templateUrl: './home-cards.component.html',
  styleUrl: './home-cards.component.css'
})
export class HomeCardsComponent {
  @Input() value!:string;
  @Input() title!:string;
  @Input() icon!:string;
  @Input() backgroundColor!:string;



}
