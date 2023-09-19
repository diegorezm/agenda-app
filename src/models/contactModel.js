
import mongoose from "mongoose";
const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Empty contact!"],
    unique: false
  },
  email:{
    type: String,
    require: [true, "Please provide a email!"],
    unique: false
  },
  phone_number: {
    type: Number,
    required: [true, "Provide an phone number"]
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

const Contacts = mongoose.models.contacts || mongoose.model("contacts", contactsSchema);

export default Contacts;
