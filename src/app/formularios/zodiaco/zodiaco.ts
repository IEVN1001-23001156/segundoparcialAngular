import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface PersonaZodiaco {
  nombre: string;
  apaterno: string;
  amaterno: string;
  dia: number;
  mes: number;
  anio: number;
  sexo: string;
  edad: number;
  signo: string;
  imagen: string;
}

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './zodiaco.html',
  styleUrl: './zodiaco.css'
})
export class ZodiacoComponent implements OnInit {
  formulario!: FormGroup;

  persona: PersonaZodiaco = {
    nombre: '',
    apaterno: '',
    amaterno: '',
    dia: 0,
    mes: 0,
    anio: 0,
    sexo: '',
    edad: 0,
    signo: '',
    imagen: ''
  };

  signos: string[] = [
    'mono', 'gallo', 'perro', 'cerdo', 'rata', 'buey',
    'tigre', 'conejo', 'dragon', 'serpiente', 'caballo', 'cabra'
  ];

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      apaterno: new FormControl(''),
      amaterno: new FormControl(''),
      dia: new FormControl(''),
      mes: new FormControl(''),
      anio: new FormControl(''),
      sexo: new FormControl('Masculino')

    });
  }

  imprimir(): void {
    this.persona.nombre = this.formulario.value.nombre;
    this.persona.apaterno = this.formulario.value.apaterno;
    this.persona.amaterno = this.formulario.value.amaterno;
    this.persona.dia = Number(this.formulario.value.dia);
    this.persona.mes = Number(this.formulario.value.mes);
    this.persona.anio = Number(this.formulario.value.anio);
    this.persona.sexo = this.formulario.value.sexo;

    const anioActual = new Date().getFullYear();
    this.persona.edad = anioActual - this.persona.anio;

    const indice = this.persona.anio % 12;
    this.persona.signo = this.signos[indice];
    this.persona.imagen = `/assets/${this.persona.signo}.png`;

  }
}