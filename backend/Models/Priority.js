const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;

const prioritySchema = new Schema({
  Name: {
    type: SchemaTypes.String,
    required: true,
  },
});

const Priority = model("Priority", prioritySchema);
module.exports = { Priority };
