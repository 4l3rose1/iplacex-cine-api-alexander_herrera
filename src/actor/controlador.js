import { connectDB } from '../common/db.js';
import { ObjectId } from 'mongodb';

const actorCollection = "actores";
const peliculaCollection = "peliculas";

export async function handleInsertActorRequest(req, res) {
    try {
        const db = await connectDB();
        const nuevoActor = req.body;

        // Validar que la película exista en base al nombre o su identificador (según instrucción)
        // El enunciado pide: "validar que el _id de la película a asignar... exista dentro de la colección de películas. Esta validación debe ser realizada en base al nombre de la película"
        db.collection(peliculaCollection).findOne({ nombre: nuevoActor.idPelicula })
            .then(peliculaEncontrada => {
                if (!peliculaEncontrada) {
                    return res.status(404).json({ error: "La película asociada no existe en la colección" });
                }

                db.collection(actorCollection).insertOne(nuevoActor)
                    .then(result => {
                        res.status(201).json({ message: "Actor creado exitosamente", id: result.insertedId });
                    })
                    .catch(error => {
                        res.status(500).json({ error: "Error al insertar el actor: " + error.message });
                    });
            })
            .catch(error => {
                res.status(500).json({ error: "Error al validar la película: " + error.message });
            });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor: " + error.message });
    }
}

export async function handleGetActoresRequest(req, res) {
    try {
        const db = await connectDB();

        db.collection(actorCollection).find({}).toArray()
            .then(actores => {
                res.status(200).json(actores);
            })
            .catch(error => {
                res.status(500).json({ error: "Error al obtener los actores: " + error.message });
            });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor: " + error.message });
    }
}

export async function handleGetActorByIdRequest(req, res) {
    try {
        const db = await connectDB();
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Id mal formado" });
        }

        db.collection(actorCollection).findOne({ _id: new ObjectId(id) })
            .then(actor => {
                if (!actor) {
                    return res.status(404).json({ error: "Actor no encontrado" });
                }
                res.status(200).json(actor);
            })
            .catch(error => {
                res.status(500).json({ error: "Error al buscar el actor: " + error.message });
            });
    } catch (error) {
        res.status(400).json({ error: "Id mal formado o error en la petición" });
    }
}

export async function handleGetActoresByPeliculaIdRequest(req, res) {
    try {
        const db = await connectDB();
        const peliculaFiltro = req.params.pelicula;

        db.collection(actorCollection).find({ idPelicula: peliculaFiltro }).toArray()
            .then(actores => {
                res.status(200).json(actores);
            })
            .catch(error => {
                res.status(500).json({ error: "Error al consultar los actores de la película: " + error.message });
            });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor: " + error.message });
    }
}