import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let mongo_uri = process.env.MONGO_URI!;

    if (process.env.NODE_ENV === "production") {
      mongo_uri = process.env.MONGO_URI!;
    }
    if (process.env.NODE_ENV === "development") {
      mongo_uri = process.env.MONGO_URI_DEV!;
    }

    const conn = await mongoose.connect(mongo_uri);
    console.log(mongo_uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error: any) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
