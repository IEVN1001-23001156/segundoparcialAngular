import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonaZodiaco } from '../zodiaco/zodiaco';

@Component({
  selector: 'app-zodiaco-lista',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './zodiaco-lista.html',
  styleUrl: './zodiaco-lista.css'
})
export class ZodiacoListaComponent implements OnInit {
  formulario!: FormGroup;
  personas: PersonaZodiaco[] = [];
  indiceEdicion: number = -1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarPersonas();
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      edad: new FormControl(''),
      signo: new FormControl(''),
      sexo: new FormControl('Masculino')
    });
  }

  cargarPersonas(): void {
    const datos = localStorage.getItem('personasZodiaco');
    if (datos) {
      this.personas = JSON.parse(datos);
    }
  }

  editarPersona(index: number): void {
    const p = this.personas[index];
    this.formulario.patchValue({
      nombre: p.nombre,
      edad: p.edad,
      signo: p.signo,
      sexo: p.sexo
    });
    this.indiceEdicion = index;
  }

  guardarEdicion(): void {
    if (this.indiceEdicion === -1) return;

    const val = this.formulario.value;
    const personaActual = this.personas[this.indiceEdicion];
    const signoLimpio = val.signo ? val.signo.toLowerCase().trim() : '';

    this.personas[this.indiceEdicion] = {
      ...personaActual,
      nombre: val.nombre,
      edad: Number(val.edad),
      signo: val.signo,
      sexo: val.sexo,
      imagen: `/assets/${signoLimpio}.png`
    };

    localStorage.setItem('personasZodiaco', JSON.stringify(this.personas));
    this.limpiar();
  }

  eliminarPersona(index: number): void {
    this.personas.splice(index, 1);
    localStorage.setItem('personasZodiaco', JSON.stringify(this.personas));
  }

  limpiar(): void {
    this.formulario.reset({ sexo: 'Masculino' });
    this.indiceEdicion = -1;
  }

  regresar(): void {
    this.router.navigate(['/formularios/zodiaco']);
  }
}