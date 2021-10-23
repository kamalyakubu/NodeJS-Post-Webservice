import mongoose from "mongoose";
//Create Schema/Model and make them required
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: 
    {
        type: String,
        required: true
    },
    author: 
    {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const postModel = mongoose.model("posts", PostSchema);
export default postModel;