var express = require("express");
var router = express.Router();

const classController = require("../controllers/class");

router.get("/", classController.getAllClasses);

router.get("/:id", classController.getClassById);

router.get("/students/:id", classController.getAllStudentNamesInClass);

router.delete("/:id", classController.deleteClass);

router.put("/:id", classController.updateClass);

router.post("/", classController.createClass);

module.exports = router;
