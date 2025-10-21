import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private url: string = `${environment.HOST}/products`;

  findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  findById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  save(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}