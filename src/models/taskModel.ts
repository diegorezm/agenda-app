import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    require: [true, "Empty post!"],
    unique: false
  },
  author: {
    type: String,
    require: false
  },
  author_id:{
    type: String,
    require: false
  }
  
  
});

const Task = mongoose.models.task || mongoose.model("task", taskSchema);

export default Task;
