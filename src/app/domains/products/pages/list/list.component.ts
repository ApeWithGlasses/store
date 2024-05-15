import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component';
import { Category } from '@shared/models/category.model';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { CategoryService } from '@shared/services/category.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  @Input() categoryId?: string; 

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnChanges(): void {
    this.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProducts() {
    this.productService.getAllProducts(this.categoryId)
    .subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {

      }
    });
  }

  private getCategories() {
    this.categoryService.getAllCategories()
    .subscribe({
      next: (categories) => {
        this.categories.set(categories);
      },
      error: () => {

      }
    });
  }
}
