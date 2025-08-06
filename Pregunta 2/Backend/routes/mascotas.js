const express = require('express');
const router = express.Router();
const mascotasController = require('../controllers/mascotasController');

// CRUD
router.get('/', mascotasController.listarMascotas);
router.get('/:id', mascotasController.obtenerMascota);
router.post('/', mascotasController.agregarMascota);
router.put('/:id', mascotasController.actualizarMascota);
router.delete('/:id', mascotasController.eliminarMascota);

module.exports = router;
