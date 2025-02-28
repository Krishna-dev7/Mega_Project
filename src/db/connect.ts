import { MongoClient } from "mongodb";
import conf from "@/helpers/conf";

const connectDB = async () => {
    try {
        const client = await MongoClient.connect(conf.mongodb!);
        const db = client.db(); 
        console.log("Connected to MongoDB");
        return db;
    } catch (error: any) {
        console.error("Connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;