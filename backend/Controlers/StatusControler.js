const { Status } = require("../Models/Status.js");

exports.CheckStatus = async (req, res) => {
  try {
    const { Name } = req.body;

    const statusResult = await Status.create({ Name });

    res.status(201).json(statusResult);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.GetAllStatus = async (req, res) => {
  try {
    const result = await Status.find();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.GetStatusById = async (req, res) => {
  try {
    const result = await Status.findById(req.params.id);

    if (!result) {
      return res.status(404).json("Status Not Found");
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.DeleteStatus = async (req, res) => {
  try {
    const result = await Status.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json("Status Not Found");
    }

    res.status(200).json("Status Deleted Successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.UpdateStatus = async (req, res) => {
  try {
    const { Name } = req.body;

    const result = await Status.findByIdAndUpdate(
      req.params.id,
      { Name },
      { new: true },
    );

    if (!result) {
      return res.status(404).json("Status Not Found");
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
