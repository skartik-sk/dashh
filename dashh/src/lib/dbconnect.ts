import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI||"",{
            dbName: process.env.MONGO_DB_NAME,
        });
if(conn){
    // console.log(`MongoDB Connected: ${conn.connection.host}`);
}
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error('An unknown error occurred');
        }
      
    }
};

export default connectDB;