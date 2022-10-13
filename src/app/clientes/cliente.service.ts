import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from './cliente';
import { CLIENTES } from "./clientes.json";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint: string = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES); //convert Observable
    return this.http.get<Cliente[]>(this.urlEndpoint);
    /*return this.http.get(this.urlEndpoint).pipe(
      map(response => response as Cliente[])
    );*/
  }
}
