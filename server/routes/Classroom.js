const express = require("express");
const router = express.Router();
const { Classrooms } = require("../models");
const { ValidateToken } = require("../middlewares/AuthMiddleWare");

router.get("/", async (req, res) => {
  const listOfClassroom = await Classrooms.findAll();
  res.json(listOfClassroom);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const classroom = await Classrooms.findByPk(id);
  res.json(classroom);
});

router.put("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const { students } = req.body;
  try {
    // const classroom = await Classrooms.findOne({ where: { id } });
    // Classrooms.students = students;

    Classrooms.update({ students: students }, { where: { id: id } });

    return res.json("Success");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  const { subject, section, teacherID } = req.body;
  // const teacherUUID = req.user.uuid;
  const classroom = {
    subject: subject,
    section: section,
    // teacherID: teacherUUID,
  };
  await Classrooms.create(classroom)
    .then(function (classroom) {
      res.json({
        Message: "Created classroom success.",
        classroom: classroom,
      });
    })
    .catch(function (err) {
      res.json(err.message);
    });
});

module.exports = router;
