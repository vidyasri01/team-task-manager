const express = require("express");

const Task = require("../models/Task");

const router = express.Router();


// CREATE TASK
router.post("/create", async (req, res) => {

  try {

    const {
      title,
      description,
      status,
      project,
      assignedTo,
      createdBy,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      project,
      assignedTo,
      createdBy,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});


// GET ALL TASKS
router.get("/", async (req, res) => {

  try {

    const tasks = await Task.find()
      .populate("project", "title")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});


// UPDATE TASK
router.put("/:id", async (req, res) => {

  try {

    const updatedTask =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedTask);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE TASK
router.delete("/:id", async (req, res) => {

  try {

    await Task.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Task deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});


module.exports = router;