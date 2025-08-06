import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from '../mascota.service';
import { Mascota } from '../mascota.model';
import { NgForm } from '@angular/forms';  // Importar NgForm

@Component({
  selector: 'app-editar-mascota',
  templateUrl: './editar-mascota.component.html',
  styleUrls: ['./editar-mascota.component.scss']
})
export class EditarMascotaComponent implements OnInit {
  mascota: Mascota | null = null;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService,
    private router: Router
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.cargarMascota();
  }

  // Método para cargar la mascota por ID
  cargarMascota() {
    this.mascotaService.obtenerMascota(this.id).subscribe({
      next: (mascota) => {
        this.mascota = mascota;
      },
      error: (error) => {
        console.error('Error al cargar la mascota:', error);
        this.router.navigate(['/']);
      }
    });
  }

  // Método para actualizar la mascota
  actualizarMascota(form: NgForm) {  // Modificar el parámetro
    if (!this.mascota) return;

    this.mascotaService.actualizarMascota(this.id, this.mascota).subscribe({
      next: () => {
        this.router.navigate(['/']); // Redirigir a la lista de mascotas después de actualizar
      },
      error: (error) => {
        console.error('Error al actualizar la mascota:', error);
      }
    });
  }
}