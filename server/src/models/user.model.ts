import { Schema, model, Document } from "mongoose";

export interface User extends Document {
    name: string;
}

export const name = 'User';

const userModel = model<User>(name, new Schema({
    name: {
        type: String,
        required: true,
    },
}));

export default userModel;