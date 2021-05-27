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

  public post(evento: Evento) {
    return this.http.post<Evento>(`${this.baseUrl}`, evento);
  }

  public update(evento: Evento) {
    return this.http.put<Evento>(`${this.baseUrl}/${evento.id}`, evento);
  }

  public deleteEvento(eventoId: number) {
    return this.http.delete(`${this.baseUrl}/${eventoId}`);
  }

  public upload(file: File[], fileName: string) {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileName);

    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
}
