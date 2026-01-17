const { Priority } = require("../Models/Priority");

exports.CreatePreriority = async (req, res) => {
  try {
    let { Name } = req.body;
    const priorityResult = await Priority.create({ Name });
    res.status(201).json(priorityResult);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.GetAllPriorities = async (req, res) => {
  try {
    const result = await Priority.find();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.GetPriorityById = async (req, res) => {
  try {
    const result = await Priority.findById(req.params.id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.DeletePriority = async (req, res) => {
  try {
    const result = await Priority.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.UpdatePriority = async (req, res) => {
  let Name = req.body;
  let result = await Priority.findByIdAndUpdate(req.params.id, Name, {
    new: true,
  });
  if (result) {
    // res.status(200).json(result);
    res.status(200).json("Priority updated successfully");
  } else {
    res.status(404).json("Not Found");
  }
};
