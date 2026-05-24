import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://meghasajup94:Megha9400@cluster0.2kmknws.mongodb.net/velmira")
        .then(() => console.log('DB Connected'))
}