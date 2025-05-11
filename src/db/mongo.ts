import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/chimeup";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {});
        console.log("🟢 MongoDB connected");
    } catch (error) {
        console.error("🔴 MongoDB connection error:", error);
        process.exit(1);
    }
};