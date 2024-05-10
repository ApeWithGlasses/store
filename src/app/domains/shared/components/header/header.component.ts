import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  total = this.cartService.total;

  hideSideMenu = signal(true);

  toggleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }
}
