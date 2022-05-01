const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers

const UsersRouter = require("./routes/Users");
app.use("/auth", UsersRouter);
const ClassroomRouter = require("./routes/Classroom");
app.use("/classroom", ClassroomRouter);

db.sequelize
  .sync()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
