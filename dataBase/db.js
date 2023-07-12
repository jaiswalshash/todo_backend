import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, { dbName: "backendAPI" ,useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
        // Start your server or perform other operations
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
  })};