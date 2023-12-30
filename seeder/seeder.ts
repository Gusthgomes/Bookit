require('dotenv').config();

import mongoose from "mongoose";
import Room from "../backend/models/Room";
import { rooms } from './data';

const seedRooms = async () => {
    try {

        const mongoUri = process.env.MONGODB_URI;

        if (!mongoUri) {
            throw new Error("MONGODB_URI is not defined in environment variables.");
        }

        await mongoose.connect(mongoUri, {
            dbName: "share_prompt",
        });

        await Room.deleteMany();
        console.log('Rooms are deleted');

        await Room.insertMany(rooms);
        console.log('Rooms are added');

    } catch (error) {
        console.log(error);
        process.exit();
    }
}

seedRooms();