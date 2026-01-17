const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;

const statusSchema = new Schema({
  Name: {
    type: SchemaTypes.String,
    required: true,
  },
});

const Status = model("Status", statusSchema);
module.exports = { Status };
