import express from 'express';
import {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletePeliculaByIdRequest
} from './controlador.js';

const peliculaRoutes = express.Router();

peliculaRoutes.post('/pelicula', handleInsertPeliculaRequest);
peliculaRoutes.get('/peliculas', handleGetPeliculasRequest);
peliculaRoutes.get('/película/:id', handleGetPeliculaByIdRequest);
peliculaRoutes.put('/película/:id', handleUpdatePeliculaByIdRequest); // Nota: El requerimiento indica verbo UPDATE (o se puede usar put)
peliculaRoutes.delete('/película/:id', handleDeletePeliculaByIdRequest);

export default peliculaRoutes;