const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mascotasRoutes = require('./routes/mascotas');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/mascotas', mascotasRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
