import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import PostModel from "./models/post_module.js";

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());

const port = 5006;
const db = process.env.DB_URL;

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the todo API.",
  });
});

app.get("/posts", async (req, res) => {
  const postModel = await PostModel.find({});

  if (postModel) {
    return res.status(200).json({
      status: true,
      message: "Posts fetched successfully",
      data: postModel,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: "Posts not found",
    });
  }
});

app.post("/posts", async (req, res) => {
  const { title, description, image, author } = req.body;

  const postModel = await PostModel.create({
    title,
    description,
    image,
    author
  });

  if (postModel) {
    return res.status(201).json({
      status: true,
      message: "Post created successfully",
      data: postModel,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: "Post failed to create",
    });
  }
});

app.patch("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { description } = req.body;
  const { image } = req.body;

const postModel = await PostModel.updateOne({title: title, description: description, image: image}).where({
    _id : id,
});

if(postModel){
    return res.status(200).json({
        status: true,
        message: "Post edited successfully",
        data: postModel
    })
}else{
    return res.status(400).json({
        status: false,
        message: "Post failed to update",
    });
}
});


app.delete("/posts/:id", async (req, res) => {
    const postModel = await PostModel.findByIdAndDelete(req.params.id);
  
    if (postModel) {
      return res.status(200).json({
        status: true,
        message: "Post deleted successfully",
        data: postModel,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Failed to delete post",
      });
    }
  });

//Connect to local database
//OPTION 1
// mongoose.connect('LOCAL_DB', () =>{
//     console.log('Connected to database');
// });

//OPTION 2
// mongoose.connect(process.env.LOCAL_DB, () => {
//   console.log("Connected to database");
// });

//OPTION 3
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port);
