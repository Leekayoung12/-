import Mongoose from "mongoose";
import { config } from "../config.js";

let db;

export async function connectDB() {
    try {
        const connection = await Mongoose.connect(config.db.host, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "banapress"
        });
        db = connection.connection; // Assign the connection to db
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export function getInformationCollection() {
    return db.collection("information");
}
