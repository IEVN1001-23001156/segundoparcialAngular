import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


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
  personas: PersonaZodiaco[] = [];

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarPersonas();
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

  calcular(): void {
    if (this.formulario.invalid) return;

    this.persona.nombre = this.formulario.value.nombre;
    this.persona.apaterno = this.formulario.value.apaterno;
    this.persona.amaterno = this.formulario.value.amaterno;
    this.persona.dia = Number(this.formulario.value.dia);
    this.persona.mes = Number(this.formulario.value.mes);
    this.persona.anio = Number(this.formulario.value.anio);
    this.persona.sexo = this.formulario.value.sexo;

    const hoy = new Date();
    const anioActual = hoy.getFullYear();
    const mesActual = hoy.getMonth() + 1;
    const diaActual = hoy.getDate();

    let edadCalculada = anioActual - this.persona.anio;
    if (
      mesActual < this.persona.mes || 
      (mesActual === this.persona.mes && diaActual < this.persona.dia)
    ) {
      edadCalculada--;
    }
    this.persona.edad = edadCalculada;

    const indice = this.persona.anio % 12;
    this.persona.signo = this.signos[indice];
    this.persona.imagen = `/assets/${this.persona.signo}.png`;
  }

  agregarPersona(): void {
    if (
      this.formulario.value.nombre === '' ||
      this.formulario.value.anio === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    this.calcular();

    const personaGuardar: PersonaZodiaco = {
      nombre: this.persona.nombre,
      apaterno: this.persona.apaterno,
      amaterno: this.persona.amaterno,
      dia: this.persona.dia,
      mes: this.persona.mes,
      anio: this.persona.anio,
      sexo: this.persona.sexo,
      edad: this.persona.edad,
      signo: this.persona.signo,
      imagen: this.persona.imagen
    };

    this.personas.push(personaGuardar);
    localStorage.setItem('personasZodiaco', JSON.stringify(this.personas));
    this.limpiarCampos();
  }

  cargarPersonas(): void {
    const datos = localStorage.getItem('personasZodiaco');
    if (datos) {
      this.personas = JSON.parse(datos);
    }
  }

 verRegistros(): void {
    this.router.navigate(['/formularios/zodiaco-lista']);
  }

  limpiarCampos(): void {
    this.formulario.reset({ sexo: 'Masculino' });
    this.persona = {
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
  }
}