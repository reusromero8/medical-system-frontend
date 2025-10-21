import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product';
import { Category } from '../../model/category';
import { Family } from '../../model/family';
import { Laboratory } from '../../model/laboratory';
import { ProductService } from '../../services/product-service';
import { CategoryService } from '../../services/category-service';
import { FamilyService } from '../../services/family-service';
import { LaboratoryService } from '../../services/laboratory-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.html',
  styleUrls: ['./product-edit.css']
})
export class ProductEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private familyService = inject(FamilyService);
  private laboratoryService = inject(LaboratoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  productForm!: FormGroup;
  isEditMode: boolean = false;
  productId?: number;

  categories: Category[] = [];
  families: Family[] = [];
  laboratories: Laboratory[] = [];

  ngOnInit(): void {
    this.initForm();
    this.loadDropdownData();
    this.checkEditMode();
  }

  initForm(): void {
    const today = new Date().toISOString().split('T')[0];
    
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(255)]],
      presentation: ['', [Validators.maxLength(50)]],
      unitPrice: ['', [Validators.required, Validators.min(0.01)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      expired: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      familyId: ['', [Validators.required]],
      laboratoryId: ['', [Validators.required]]
    });
  }

  loadDropdownData(): void {
    this.categoryService.findAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error loading categories:', err)
    });

    this.familyService.findAll().subscribe({
      next: (data) => this.families = data,
      error: (err) => console.error('Error loading families:', err)
    });

    this.laboratoryService.findAll().subscribe({
      next: (data) => this.laboratories = data,
      error: (err) => console.error('Error loading laboratories:', err)
    });
  }

  checkEditMode(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id'];
        this.loadProduct(this.productId);
      }
    });
  }

  loadProduct(id: number): void {
    this.productService.findById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          presentation: product.presentation,
          unitPrice: product.unitPrice,
          stock: product.stock,
          expired: product.expired,
          categoryId: product.category?.idCategory,
          familyId: product.family?.idFamily,
          laboratoryId: product.laboratory?.idLaboratory
        });
      },
      error: (err) => {
        console.error('Error loading product:', err);
        alert('Error al cargar el producto');
        this.router.navigate(['/products']);
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      alert('Por favor, complete todos los campos requeridos correctamente');
      return;
    }

    const formValue = this.productForm.value;
    
    const product: Product = {
      name: formValue.name,
      description: formValue.description,
      presentation: formValue.presentation,
      unitPrice: formValue.unitPrice,
      stock: formValue.stock,
      expired: formValue.expired,
      category: { idCategory: formValue.categoryId },
      family: { idFamily: formValue.familyId },
      laboratory: { idLaboratory: formValue.laboratoryId }
    };

    if (this.isEditMode && this.productId) {
      this.productService.update(this.productId, product).subscribe({
        next: () => {
          alert('Producto actualizado exitosamente');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error updating product:', err);
          alert(err.error?.message || 'Error al actualizar el producto');
        }
      });
    } else {
      this.productService.save(product).subscribe({
        next: () => {
          alert('Producto creado exitosamente');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error creating product:', err);
          alert(err.error?.message || 'Error al crear el producto');
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.productForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('min')) {
      return `El valor mínimo es ${field.errors?.['min'].min}`;
    }
    if (field?.hasError('maxlength')) {
      return `Máximo ${field.errors?.['maxlength'].requiredLength} caracteres`;
    }
    
    return '';
  }
}