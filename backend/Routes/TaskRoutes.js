const express = require("express");
const router = express.Router();
const taskResult = require("../Controlers/TaskControler");

router.post("/", taskResult.createTask);

router.get("/", taskResult.getAllTasks);
router.get("/favourites", taskResult.GetFavouriteTasks);
router.get("/user/:userId", taskResult.GetTaskByUser);

router.put("/favourite/:id", taskResult.AddToFav);
router.put("/:id", taskResult.UpdateTask);

router.get("/:id", taskResult.GetTaskById);
router.delete("/:id", taskResult.DeleteTask);

module.exports = router;
