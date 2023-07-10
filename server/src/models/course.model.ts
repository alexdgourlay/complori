import { Document, Schema, model } from "mongoose";

import userModel, { User, name as userName } from "./user.model";
import { ObjectId } from "mongodb";

export interface Course extends Document {
    name: string;
    description: string;
    members: User['_id'][];
    coach: User['_id'];
}

export const name = 'Course';

// Check if user exists.
async function userExists(id: string) {
    const user = await userModel.findById(id);
    return user !== null;
}

const courseModel = model<Course>(name,
    new Schema({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        members: [{
            ref: userName,
            type: Schema.Types.ObjectId,
            validate: {
                validator: userExists
            }
        }],
        coach: {
            ref: userName,
            type: Schema.Types.ObjectId,
            required: true,
            validate: {
                validator: userExists,
            }
        },
    })
)

// Ensure members contains unique values.
courseModel.schema.path('members').validate(
    (members: ObjectId[]) => {
        let set = new Set(members.map(id => id.toString()));
        return members.length === set.size
    },
    'Members must contain unique elements.'
);

export default courseModel;