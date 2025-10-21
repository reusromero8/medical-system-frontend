import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product-service';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})
export class ProductComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

  products: Product[] = [];
  selectedProduct?: Product;
  showDeleteModal: boolean = false;
  today: Date = new Date(); 


  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.findAll().subscribe({
      next: (data) => {
        this.products = data;
         this.today = new Date(); 
      },
      error: (err) => {
        console.error('Error loading products:', err);
        alert('Error al cargar los productos');
      }
    });
  }

  navigateToEdit(id?: number): void {
    if (id) {
      this.router.navigate(['/products/edit', id]);
    } else {
      this.router.navigate(['/products/new']);
    }
  }

  openDeleteModal(product: Product): void {
    this.selectedProduct = product;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedProduct = undefined;
  }

  confirmDelete(): void {
    if (this.selectedProduct?.idProduct) {
      this.productService.delete(this.selectedProduct.idProduct).subscribe({
        next: () => {
          alert('Producto eliminado exitosamente');
          this.closeDeleteModal();
          this.loadProducts();
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Error al eliminar el producto');
        }
      });
    }
  }
}