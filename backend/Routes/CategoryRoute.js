const express = require("express");
const router = express.Router();
const category = require("../Controlers/CategoryControler");

router.post("/", category.CreateCategory);
router.get("/", category.GetAllCategories);
router.get("/:id",category.GetCategoryById);
router.delete("/:id",category.DeleteCategory);
router.put("/:id",category.UpdateCategory);
module.exports = router;
