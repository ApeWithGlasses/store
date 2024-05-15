import { UpperCasePipe } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product = signal<Product | null>(null);
  cover = signal('');
  private productService = inject(ProductService);

  // Getting the id from the path params
  @Input() id?: string;

  ngOnInit(): void {
    if (this.id) {
      this.productService.getProduct(this.id)
      .subscribe({
        next: (product) => {
          this.product.set(product);
          if (product.images.length > 0) {
            this.cover.set(product.images[0])
          }
        }
      });
    }
  }

  changeCover(newImg: string) {
    this.cover.set(newImg);
  }
}
