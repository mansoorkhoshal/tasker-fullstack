const express = require("express");
const router = express.Router();
const priorityResult = require("../Controlers/PriorityControler");

router.post("/", priorityResult.CreatePreriority);
router.get("/", priorityResult.GetAllPriorities);
router.get("/:id", priorityResult.GetPriorityById);
router.delete("/:id", priorityResult.DeletePriority);
router.put("/:id", priorityResult.UpdatePriority);

module.exports = router;
