import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME
        });

        console.log("MongoDB connected:", conn.connection.host);
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
}

export default connectDB;