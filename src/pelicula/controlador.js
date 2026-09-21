import { connectDB } from '../common/db.js';
import { ObjectId } from 'mongodb';

const peliculaCollection = "peliculas";

export async function handleInsertPeliculaRequest(req, res) {
    try {
        const db = await connectDB();
        const nuevaPelicula = req.body;

        db.collection(peliculaCollection).insertOne(nuevaPelicula)
            .then(result => {
                res.status(201).json({ message: "Película creada exitosamente", id: result.insertedId });
            })
            .catch(error => {
                res.status(500).json({ error: "Error al insertar la película: " + error.message });
            });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor: " + error.message });
    }
}

export async function handleGetPeliculasRequest(req, res) {
    try {
        const db = await connectDB();

        db.collection(peliculaCollection).find({}).toArray()
            .then(peliculas => {
                res.status(200).json(peliculas);
            })
            .catch(error => {
                res.status(500).json({ error: "Error al obtener las películas: " + error.message });
            });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor: " + error.message });
    }
}

export async function handleGetPeliculaByIdRequest(req, res) {
    try {
        const db = await connectDB();
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Id mal formado" });
        }

        db.collection(peliculaCollection).findOne({ _id: new ObjectId(id) })
            .then(pelicula => {
                if (!pelicula) {
                    return res.status(404).json({ error: "Película no encontrada" });
                }
                res.status(200).json(pelicula);
            })
            .catch(error => {
                res.status(500).json({ error: "Error al buscar la película: " + error.message });
            });
    } catch (error) {
        res.status(400).json({ error: "Id mal formado o error en la petición" });
    }
}

export async function handleUpdatePeliculaByIdRequest(req, res) {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const datosActualizados = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Id mal formado" });
        }

        db.collection(peliculaCollection).updateOne(
            { _id: new ObjectId(id) },
            { $set: datosActualizados }
        )
            .then(result => {
                if (result.matchedCount === 0) {
                    return res.status(404).json({ error: "Película no encontrada para actualizar" });
                }
                res.status(200).json({ message: "Película actualizada correctamente" });
            })
            .catch(error => {
                res.status(500).json({ error: "Error al actualizar la película: " + error.message });
            });
    } catch (error) {
        res.status(400).json({ error: "Id mal formado o error en la petición" });
    }
}

export async function handleDeletePeliculaByIdRequest(req, res) {
    try {
        const db = await connectDB();
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Id mal formado" });
        }

        db.collection(peliculaCollection).deleteOne({ _id: new ObjectId(id) })
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.status(404).json({ error: "Película no encontrada para eliminar" });
                }
                res.status(200).json({ message: "Película eliminada correctamente" });
            })
            .catch(error => {
                res.status(500).json({ error: "Error al eliminar la película: " + error.message });
            });
    } catch (error) {
        res.status(400).json({ error: "Id mal formado o error en la petición" });
    }
}