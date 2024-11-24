import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  imports: [RouterLink,MenuComponent],
  templateUrl: './hamburger-menu.component.html',
  styleUrl: './hamburger-menu.component.css'
})
export class HamburgerMenuComponent {

  @Input() closeMenu!: () => void;
  
      isMenuOpened:boolean = false;


    toggleLinks(): void {
    this.isMenuOpened = !this.isMenuOpened;

    }
  

}
