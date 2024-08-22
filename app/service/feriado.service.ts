import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FeriadoService {

  constructor(private httpClient : HttpClient) { }


  getTopHeadLines(): Observable<any>{
    return (this.httpClient.get<any>('https://apis.digital.gob.cl/fl/feriados/2022'));

  }
}
