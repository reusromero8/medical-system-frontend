import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Family } from '../model/family';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  private http = inject(HttpClient);
  private url: string = `${environment.HOST}/families`;

  findAll(): Observable<Family[]> {
    return this.http.get<Family[]>(this.url);
  }

  findById(id: number): Observable<Family> {
    return this.http.get<Family>(`${this.url}/${id}`);
  }
}