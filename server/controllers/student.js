const Student = require("../models/student");

exports.getAllStudents = async (req, res) => {
  try {
    const result = await Student.find();
    if (result && result.length !== 0) {
      return res.status(200).send({
        msg: "Students found!",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Students not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const result = await Student.findById(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Student found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Student not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Student deleted",
      });
    }
    res.status(500).send({ msg: "Something went wrong" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      age: req.body.age,
      gradeAverage: req.body.gradeAverage,
      class: req.body.class === "" ? null : req.body.class
    };
    const result = await Student.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        msg: "Student updated",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Student was not updated",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createStudent = async (req, res) => {
  try {
    const data = new Student({
      name: req.body.name,
      age: req.body.age,
      gradeAverage: req.body.gradeAverage,
      class: req.body.class
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        msg: "Student created",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Student was not created",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
