import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../_models/Evento';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private baseUrl = 'http://localhost:5000/api/evento';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseUrl);
  }

  public getById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseUrl}/${id}`);
  }

  public getByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseUrl}/get-by-tema/${tema}`);
  }
}
