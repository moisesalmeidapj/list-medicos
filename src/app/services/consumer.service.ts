import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from '../interfaces/medico';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  private apiUrl = "http://IP:8080/medicos"

  constructor(private http: HttpClient) { } 


  public getList(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.apiUrl)
  }

  public addMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(this.apiUrl, medico);
  }
}

