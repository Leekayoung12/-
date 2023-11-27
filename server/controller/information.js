import * as Repository from '../data/information.js'
import { getSocketIO } from "../connection/socket.js";

export async function getInformation(req, res) {
    try {
        const data = await Repository.getAll();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error getting information:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}