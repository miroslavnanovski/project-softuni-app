import { Component, ElementRef, HostListener, Input } from '@angular/core';
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
  
  constructor(private eRef: ElementRef) {}

  toggleLinks(): void {
    this.isMenuOpened = !this.isMenuOpened;
  
    }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    if (this.isMenuOpened && !this.eRef.nativeElement.contains(event.target)) {
      this.isMenuOpened = false; 
    }
  }
}


  

