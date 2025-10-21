import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laboratory } from '../model/laboratory';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {
  private http = inject(HttpClient);
  private url: string = `${environment.HOST}/laboratories`;

  findAll(): Observable<Laboratory[]> {
    return this.http.get<Laboratory[]>(this.url);
  }

  findById(id: number): Observable<Laboratory> {
    return this.http.get<Laboratory>(`${this.url}/${id}`);
  }
}