import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

interface Inscripcion {
  id: number;
  nombre: string;
  codigo: string;
  taller: string;
  horario: string;
}

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  talleres: string[] = [
    'Robótica',
    'Teatro',
    'Fútbol',
    'Pintura',
    'Programación',
    'Música'
  ];

  horarios: string[] = ['Mañana', 'Tarde', 'Noche'];

  // Registros en memoria (arreglo TypeScript)
  listaInscripciones: Inscripcion[] = [];

  mensajeExito = '';
  private siguienteId = 1;

  // Formulario reactivo con FormBuilder
  formulario = this.crearFormulario();

  constructor(private fb: FormBuilder) {}

  private crearFormulario() {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      codigo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8}$/)]],
      taller: ['', Validators.required],
      horario: ['', Validators.required]
    });
  }

  // Getters para acceder a cada control desde la plantilla
  get nombre(): AbstractControl { return this.formulario.get('nombre')!; }
  get codigo(): AbstractControl { return this.formulario.get('codigo')!; }
  get taller(): AbstractControl { return this.formulario.get('taller')!; }
  get horario(): AbstractControl { return this.formulario.get('horario')!; }

  // Valida y registra la inscripción
  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valor = this.formulario.getRawValue();

    this.listaInscripciones.push({
      id: this.siguienteId++,
      nombre: (valor.nombre ?? '').trim(),
      codigo: (valor.codigo ?? '').toUpperCase(),
      taller: valor.taller ?? '',
      horario: valor.horario ?? ''
    });

    this.mensajeExito = 'Inscripción registrada correctamente.';

    // Reset manual del formulario tras registro exitoso
    this.formulario.reset({
      nombre: '',
      codigo: '',
      taller: '',
      horario: ''
    });
  }

  // Elimina una fila específica
  eliminar(id: number): void {
    this.listaInscripciones = this.listaInscripciones.filter(i => i.id !== id);
    this.mensajeExito = '';
  }

  // Clase CSS del badge según el horario
  claseBadge(horario: string): string {
    switch (horario) {
      case 'Mañana': return 'badge badge-manana';
      case 'Tarde': return 'badge badge-tarde';
      default: return 'badge badge-noche';
    }
  }

  trackPorId(_indice: number, item: Inscripcion): number {
    return item.id;
  }
}
