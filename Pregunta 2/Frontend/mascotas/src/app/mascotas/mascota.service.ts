import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  // URL de la API de mascotas
  private readonly API_URL = 'http://localhost:3000/api/mascotas';

  constructor(private http: HttpClient) {}

  // Métodos para interactuar con la API de mascotas

  // Listar mascotas con filtros opcionales
  listarMascotas(filtroTipo?: string, filtroRaza?: string) {
    const params: Record<string, string> = {}; 
    
    if (filtroTipo) {
      params['tipo'] = filtroTipo;
    }
    
    if (filtroRaza) {
      params['raza'] = filtroRaza;
    }

    return this.http.get<Mascota[]>(this.API_URL, { params });
  }

  // Obtener una mascota por ID
  obtenerMascota(id: number) {
    return this.http.get<Mascota>(`${this.API_URL}/${id}`);
  }

  // Agregar nueva mascota
  agregarMascota(mascota: Omit<Mascota, 'id'>) {
    return this.http.post<Mascota>(this.API_URL, mascota);
  }

  // Actualizar una mascota existente
  actualizarMascota(id: number, mascota: Omit<Mascota, 'id'>) {
    return this.http.put<Mascota>(`${this.API_URL}/${id}`, mascota);
  }

  // Eliminar una mascota por ID
  eliminarMascota(id: number) {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}

interface Mascota {
  id: number;
  nombre: string;
  tipo: string;
  raza: string;
}
