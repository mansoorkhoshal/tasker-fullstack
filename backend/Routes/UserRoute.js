const express = require("express");
const router = express.Router();
const userResult = require("../Controlers/UserControler");
const upload = require("../Midleware/uploadImage");

router.post("/signup", upload.single("image"), userResult.Signup);
router.post("/login", userResult.Login);
router.get("/", userResult.getAllUsers);
router.get("/:id", userResult.GetUsersById);
router.delete("/:id", userResult.DeleteUsers);
router.put("/:id", userResult.UpdateUsers);

module.exports = router;
