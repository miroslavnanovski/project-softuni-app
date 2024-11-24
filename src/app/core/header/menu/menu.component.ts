import { Component, Input } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  @Input() closeMenu!: () => void;

  onLinkClick() {
    this.closeMenu(); // Close the menu by calling the parent's method
  }

}
