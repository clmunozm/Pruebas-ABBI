const API_URL = 'http://localhost:3000/api/mascotas';

// Listar mascotas
async function cargarMascotas() {
    const tipo = document.getElementById('filtroTipo')?.value;
    const raza = document.getElementById('filtroRaza')?.value;
    let url = API_URL;

    // Se agregan los filtros a la consulta
    if (tipo || raza) {
        const params = [];
        if (tipo) params.push(`tipo=${tipo}`);
        if (raza) params.push(`raza=${raza}`);
        url += `?${params.join('&')}`;
    }

    // Se realiza la consulta
    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const mascotas = await res.json();

        const tabla = document.getElementById('tablaMascotas');

        tabla.innerHTML = ''; // Se vacia la tabla de mascotas

        // Se llena la tabla con los nuevos datos de mascotas
        mascotas.forEach(mascota => {
            const fila = document.createElement('tr');
            const query = new URLSearchParams({
                id: mascota.id,
                nombre: mascota.nombre,
                tipo: mascota.tipo,
                raza: mascota.raza
            }).toString();

            fila.innerHTML = `
                <td>${mascota.nombre}</td>
                <td>${mascota.tipo}</td>
                <td>${mascota.raza}</td>
                <td>
                    <button onclick="redirigirEditar('${query}')">Editar</button>
                    <button onclick="eliminarMascota(${mascota.id})">Eliminar</button>
                </td>
            `;
            tabla.append(fila);
        });
    } catch (error) {
        console.error('Error al cargar mascotas:', error.message);
        alert('No se pudieron cargar las mascotas. Revisa el servidor.');
    }
}

function redirigirEditar(queryString) {
    location.href = `./html/editar.html?${queryString}`;
}

// Agregar Mascota
async function agregarMascota() {
    const nombre = document.getElementById('nombre').value;
    const tipo = document.getElementById('tipo').value;
    const raza = document.getElementById('raza').value;

    if (!nombre || !tipo || !raza) {
        alert('Todos los campos son obligatorios');
        return;
    }

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, tipo, raza })
    });

    alert('Mascota agregada');
    location.href = '../app.html';
}

// Actualizar
async function actualizarMascota() {
    const id = document.getElementById('editId').value;
    const nombre = document.getElementById('editNombre').value;
    const tipo = document.getElementById('editTipo').value;
    const raza = document.getElementById('editRaza').value;

    if (!nombre || !tipo || !raza) {
        alert('Todos los campos son obligatorios');
        return;
    }

    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, tipo, raza })
    });

    alert('Mascota actualizada');
    location.href = '../app.html';
}

// Eliminar
async function eliminarMascota(id) {
    if (confirm('¿Seguro que deseas eliminar esta mascota?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        cargarMascotas();
    }
}

// Cargar listado automáticamente si corresponde
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('tablaMascotas')) {
        cargarMascotas();
    }


});
