import mongoose from "mongoose";
export const { Schema } = mongoose;
export const Model = mongoose.model.bind(mongoose);
export const dropCollection = mongoose.connection.db.dropCollection.bind(mongoose.connection.db);
