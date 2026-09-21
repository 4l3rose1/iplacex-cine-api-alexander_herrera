import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://4l3rose1_db_user:0Ou1t1UWgrd13TuC@eva-u3-express.gdlmoto.mongodb.net/?appName=eva-u3-express";
const client = new MongoClient(uri);

export async function connectDB() {
    try {
        await client.connect();
        console.log("Conectado exitosamente al clúster de MongoDB Atlas");
        return client.db("cine-db");
    } catch (error) {
        console.error("Error al conectar a MongoDB Atlas:", error);
        throw error;
    }
}