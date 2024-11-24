import { model, Types, Schema } from "mongoose";

const thread_schema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    bookmarked: {
        type: Boolean,
        default: false
    },
    visibility:{
        type: String,
        enum: ["me", "everyone"],
        default: "everyone"
    },
    viewers: [
        {
            type: Types.ObjectId,
            ref: "User"
        }
    ],
    created_by:{
        type: Types.ObjectId,
        ref: "User"
    }

},{
    timestamps : true
})

const Thread = model("Thread", thread_schema);
export default Thread;