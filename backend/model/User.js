import mongoose, { mongo, SchemaTypeOptions } from "mongoose";

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
    },
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }

}, { timestamps: true });

const User = new mongoose.model("Users", mySchema);

export default User;
