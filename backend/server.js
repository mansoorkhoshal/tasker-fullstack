const { ConnectDB } = require("./UTILS/DbConnect");
const express = require("express");

const app = express();
ConnectDB();

app.use(express.json());

app.use("/api/category", require("./Routes/CategoryRoute.js"));
app.use("/api/status", require("./Routes/StatusRoute.js"));
app.use("/api/priority", require("./Routes/PriorityRoute.js"));
app.use("/api/task", require("./Routes/TaskRoutes.js"));
app.use("/api/user", require("./Routes/UserRoute.js"));

app.listen(4000, () => {
  console.log("Server is running at 4000");
});
