import express from 'express';
import cors from 'cors';
import { connectDB } from './src/common/db.js';
import peliculaRoutes from './src/pelicula/routes.js';
import actorRoutes from './src/actor/routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta por defecto
app.get('/', (req, res) => {
    res.status(200).send("Bienvenido al cine Iplacex");
});

// Configuración de rutas personalizadas con prefijo /api
app.use('/api', peliculaRoutes);
app.use('/api', actorRoutes);

// Validación de conexión a Atlas e inicio del servidor de Express
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose exitosamente en el puerto ${PORT}`);
        });
    })
    .catch(error => {
        console.error("No se pudo iniciar el servidor debido a un fallo en la conexión a la base de datos:", error);
    });