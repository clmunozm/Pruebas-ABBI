const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/mascotas.json');

// Leer archivo JSON
const leerDatos = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const guardarDatos = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// Listar mascotas con filtros
exports.listarMascotas = (req, res) => {
    const { tipo, raza } = req.query;
    let mascotas = leerDatos();

    if (tipo) mascotas = mascotas.filter(m => m.tipo.toLowerCase() === tipo.toLowerCase());
    if (raza) mascotas = mascotas.filter(m => m.raza.toLowerCase() === raza.toLowerCase());

    res.json(mascotas);
};

// Obtener mascota por ID
exports.obtenerMascota = (req, res) => {
    const mascotas = leerDatos();
    const mascota = mascotas.find(m => m.id == req.params.id);
    if (!mascota) return res.status(404).json({ message: 'Mascota no encontrada' });
    res.json(mascota);
};

// Agregar mascota
exports.agregarMascota = (req, res) => {
    const mascotas = leerDatos();

    // Buscar el ID más alto actual
    const maxId = mascotas.length > 0 ? Math.max(...mascotas.map(m => m.id)) : 0;
    const nuevaMascota = {
        id: maxId + 1,
        ...req.body
    };

    mascotas.push(nuevaMascota);
    guardarDatos(mascotas);
    res.status(201).json(nuevaMascota);
};

// Actualizar mascota
exports.actualizarMascota = (req, res) => {
    const mascotas = leerDatos();
    const index = mascotas.findIndex(m => m.id == req.params.id);

    if (index === -1) return res.status(404).json({ message: 'Mascota no encontrada' });

    mascotas[index] = { ...mascotas[index], ...req.body };
    guardarDatos(mascotas);
    res.json(mascotas[index]);
};

// Eliminar mascota
exports.eliminarMascota = (req, res) => {
    let mascotas = leerDatos();
    const nuevaLista = mascotas.filter(m => m.id != req.params.id);

    if (nuevaLista.length === mascotas.length) 
        return res.status(404).json({ message: 'Mascota no encontrada' });

    guardarDatos(nuevaLista);
    res.json({ message: 'Mascota eliminada' });
};
