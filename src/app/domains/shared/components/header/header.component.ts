import { Component, Input, SimpleChanges, signal } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input({required: true}) cart: Product[] = [];
  total = signal(0);

  hideSideMenu = signal(true);

  toggleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const cart = changes['cart'];
    if (cart) {
      this.total.set(this.calcTotal());
    }
  }

  calcTotal(): number {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }
}
