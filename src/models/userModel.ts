import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [ true, "Please provide a username!"],
    unique: true
  },

  email: {
    type: String,
    require: [ true, "Please provide a email!"],
    unique: true
  },

  password: {
    type: String,
    require: [ true, "Please provide a password!"],
  }

})

const User = mongoose.model.users || mongoose.model("users" , userSchema)
export default User
