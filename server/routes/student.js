var express = require("express");
var router = express.Router();

const studentController = require("../controllers/student");

router.get("/", studentController.getAllStudents);

router.get("/:id", studentController.getStudentById);

router.delete("/:id", studentController.deleteStudent);

router.put("/:id", studentController.updateStudent);

router.post("/", studentController.createStudent);

module.exports = router;
