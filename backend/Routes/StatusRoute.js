const express = require("express");
const router = express.Router();
const statusResult = require("../Controlers/StatusControler");

router.post("/", statusResult.CheckStatus);
router.get("/", statusResult.GetAllStatus);
router.get("/:id", statusResult.GetStatusById);
router.delete("/:id", statusResult.DeleteStatus);
router.put("/:id", statusResult.UpdateStatus);

module.exports = router;
