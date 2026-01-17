const { Category } = require("../Models/Category");

exports.CreateCategory = async (req, res) => {
  try {
    let { Name, Color } = req.body;
    const result = await Category.create({ Name, Color });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.GetAllCategories = async (req, res) => {
  try {
    const result = await Category.find();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.GetCategoryById = async (req,res) => {
  try {
    const result = await Category.findById(req.params.id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

exports.DeleteCategory = async (req,res) => {
  try {
    const result = await Category.findByIdAndDelete(req.params.id);
  if(result){
    return res.status(200).json("Category Deleted Successfully")
  }else{
    res.status(404).json("Not Found");
  }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

exports.UpdateCategory = async (req,res) => {
  let { Name, Color } = req.body;
  let result = await Category.findByIdAndUpdate(req.params.id,{Name, Color},{new:true});
  if (result) {
      // res.status(200).json(result);
      res.status(200).json("Category updated successfully");
    } else {
      res.status(404).json("Not Found");
    }
}