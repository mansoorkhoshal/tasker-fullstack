const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  isFavourite: {
    type: Schema.Types.Boolean,
    default: true,
  },
  dueDate: {
    type: Schema.Types.String,
    required: true,
  },
  dueTime: {
    type: Schema.Types.String,
    required: true,
  },
  progress: {
    type: Schema.Types.String,
    default: 0,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  createdOn: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  statusId: {
    type: Schema.Types.ObjectId,
    ref: "Status",
  },
  priorityId: {
    type: Schema.Types.ObjectId,
    ref: "Priority",
  },
});

const Task = model("Task", taskSchema);
module.exports = Task;
