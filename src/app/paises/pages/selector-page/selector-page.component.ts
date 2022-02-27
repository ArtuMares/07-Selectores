import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, tap } from "rxjs/operators";
import { PaisesServiceService } from '../../services/paises-service.service';
import { paisSmall, Pais } from '../../interfaces/paises.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ["", Validators.required],
    pais: ["", Validators.required],
    frontera: ["", Validators.required]
  })

  //Llenar selectores
  regiones: string[] = [];
  paises: paisSmall[] = [];
  // paisBorders: string[] = [];
  paisBorders: paisSmall[] = [];

  //UI
  cargando:boolean = false;


  constructor(private fb: FormBuilder, private ps: PaisesServiceService) { }

  ngOnInit(): void {
    this.regiones = this.ps.regiones;

    this.miFormulario.get("region")?.valueChanges.
      pipe(
        tap((_) => {
          this.miFormulario.get("pais")?.reset("");
          this.cargando=true;
          // this.miFormulario.get("frontera")?.disable();
        }),
        switchMap(region => this.ps.getPaisesPorRegion(region))
      ).subscribe(paises => {
        this.paises = paises
        this.cargando=false;
      });

    //cuando cambia el pais 
    this.miFormulario.get("pais")?.valueChanges.
      pipe(
        tap( _ => {
          this.miFormulario.get("frontera")?.reset("");
          this.cargando=true;
          // this.miFormulario.get("frontera")?.enable();
          this.paisBorders=[]
        }),
        switchMap(codigo => this.ps.getPaisPorCodigo(codigo)),
        switchMap(pais=> this.ps.getPaisesPorCodigos(pais? pais[0].borders: []))
      ).subscribe(paises => {
        this.cargando=false;
        this.paisBorders= paises
      })
  }
  guardar() {

  }
}
