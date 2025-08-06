import { Component, OnInit } from '@angular/core';
import { MascotaService } from '../mascota.service';
import { Mascota } from '../mascota.model';

@Component({
  selector: 'app-listar-mascotas',
  templateUrl: './listar-mascotas.component.html',
  styleUrls: ['./listar-mascotas.component.scss']
})

export class ListarMascotasComponent implements OnInit {
  mascotas: Mascota[] = [];
  filtroTipo = '';
  filtroRaza = '';

  constructor(private mascotaService: MascotaService) {}

  ngOnInit() {
    this.cargarMascotas();
  }

  // Método para cargar las mascotas con los filtros aplicados
  cargarMascotas() {
    this.mascotaService.listarMascotas(this.filtroTipo, this.filtroRaza)
      .subscribe({
        next: (mascotas) => this.mascotas = mascotas,
        error: (error) => console.error('Error al cargar mascotas:', error)
      });
  }

  // Métodos para buscar con los filtros
  buscar() {
    this.cargarMascotas();
  }

  // Método para eliminar una mascota
  eliminarMascota(id: number) {
    if (confirm('¿Seguro que deseas eliminar esta mascota?')) {
      this.mascotaService.eliminarMascota(id).subscribe({
        next: () => this.cargarMascotas(),
        error: (error) => console.error('Error al eliminar mascota:', error)
      });
    }
  }
}