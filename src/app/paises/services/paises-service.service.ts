import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pais, paisSmall } from '../interfaces/paises.interface';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesServiceService {
  private baseUrl: string = "https://restcountries.com/v3.1";

  private _regiones: string[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  get regiones(): string[] {
    return [...this._regiones];
  }
  constructor(private http: HttpClient) { }

  getPaisesPorRegion(region: string):Observable<paisSmall []> {
    const url: string = `${this.baseUrl}/region/${region}?fields=name,cca3`
    return this.http.get<paisSmall[]>(url);
  }

  getPaisPorCodigo(codigo: string):Observable<Pais []|null> {
   if(!codigo){
      return of(null)
    }
    const url: string = `${this.baseUrl}/alpha/${codigo}`;
    return this.http.get<Pais[]>(url);
  }
  
  getPaisesPorCodigos(borders: string[] |null):Observable<paisSmall []> {
    if(!borders){
       return of([])
     }
     const peticiones:Observable<paisSmall>[] =[];

     borders.forEach(codigo=>{
       const peticion = this.getPaisPorCodigoSmall(codigo);
       peticiones.push(peticion);
     });
     return combineLatest(peticiones);
    
   }

  getPaisPorCodigoSmall(codigo: string):Observable<paisSmall>{

    const url: string = `${this.baseUrl}/alpha/${codigo}?fields=name,cca3`;
    return this.http.get<paisSmall>(url);
  }
}
