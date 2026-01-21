const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: SchemaTypes.String,
    required: true,
  },
  email: {
    type: SchemaTypes.String,
    required: true,
  },
  password: {
    type: SchemaTypes.String,
    required: true,
  },
  contact: {
    type: SchemaTypes.String,
    required: true,
  },
  image: {
    type: SchemaTypes.String,
    required: true,
  },
});

const User = model("User", userSchema);
module.exports = User;
