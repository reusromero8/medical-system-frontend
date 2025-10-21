import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private url: string = `${environment.HOST}/categories`;

  findAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  findById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${id}`);
  }
}