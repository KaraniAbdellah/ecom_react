import mongoose, { mongo } from "mongoose";

const mySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const User = new mongoose.model("Users", mySchema);

export default User;
