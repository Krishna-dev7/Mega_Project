import conf from "@/utils/conf";
import mongoose, {connection} from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(conf.mongodb!);
        connection.on(
            'success', () => 
                console.log('Connected to MongoDB')
        )
    } catch (error:any) {
        console.log(error.message);
        process.exit(1);
    }
}


export default connectDB;