import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";


if (!DB_URI) {
    console.log(`Please provide DB URI in .env.<development || production>.local file`);
}

export const connetToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Database connected in ${NODE_ENV} mode`);
    } catch (error) {
        console.log(`Error connecting to database: ${error}`);
        process.exit(1);
    }
}
