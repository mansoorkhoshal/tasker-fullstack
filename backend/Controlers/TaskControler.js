const Task = require("../Models/Task");

exports.createTask = async (req, res) => {
  try {
    let {
      title,
      description,
      dueDate,
      dueTime,
      progress,
      // createdBy,
      categoryId,
      statusId,
      priorityId,
    } = req.body;
    const task = await Task.create({
      title,
      description,
      dueDate,
      dueTime,
      progress,
      // createdBy,
      categoryId,
      statusId,
      priorityId,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("categoryId")
      .populate("statusId")
      .populate("priorityId");

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.GetTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      // .populate("createdBy")
      .populate("categoryId")
      .populate("statusId")
      .populate("priorityId");

    if (!task) {
      return res.status(404).json("Not Found");
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.DeleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json("Not Found");
    }

    res.status(200).json("Task Deleted Successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.AddToFav = async (req, res) => {
  try {
    const { id } = req.body;

    // ✅ Correct way
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // 🔁 Toggle favourite
    task.isFavourite = !task.isFavourite;

    await task.save();

    res.status(200).json({
      success: true,
      message: `Task ${task.isFavourite ? "added to" : "removed from"} favourites`,
      data: task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.GetFavouriteTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ isFavourite: true })
      // .populate("createdBy")
      .populate("categoryId")
      .populate("statusId")
      .populate("priorityId");

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.GetTaskByUser = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.params.userId })
      .populate("categoryId")
      .populate("statusId")
      .populate("priorityId");

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.UpdateTask = async (req, res) => {
  let {
    title,
    description,
    dueDate,
    dueTime,
    progress,
    // createdBy,
    categoryId,
    statusId,
    priorityId,
  } = req.body;
  let result = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
      dueDate,
      dueTime,
      progress,
      // createdBy,
      categoryId,
      statusId,
      priorityId,
    },
    { new: true },
  );
  if (result) {
    res.status(200).json("Task updated successfully");
  } else {
    res.status(404).json("Not Found");
  }
};
