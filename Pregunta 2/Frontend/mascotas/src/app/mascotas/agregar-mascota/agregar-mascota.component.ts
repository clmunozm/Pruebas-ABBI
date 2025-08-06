import { Component, OnInit } from '@angular/core';
import { MascotaCrear } from '../mascota.model';
import { Router } from '@angular/router';
import { MascotaService } from '../mascota.service';

@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['./agregar-mascota.component.scss']
})
export class AgregarMascotaComponent implements OnInit {
  mascota: MascotaCrear = {
    nombre: '',
    tipo: '',
    raza: ''
  };

  constructor(private mascotaService: MascotaService, private router: Router) {}

  // Método para agregar una nueva mascota
  agregarMascota() {
    if (!this.mascota.nombre || !this.mascota.tipo || !this.mascota.raza) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    this.mascotaService.agregarMascota(this.mascota).subscribe({
      next: (mascota) => {
        this.router.navigate(['/']); // Redirigir a la lista de mascotas después de agregar
      },
      error: (error) => {
        console.error('Error al agregar mascota:', error);
      }
    });
    // Redirigir a la lista de mascotas después de agregar
    
  }

  ngOnInit() {}
}