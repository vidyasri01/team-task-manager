const express = require("express");

const Project = require("../models/Project");

const router = express.Router();


// CREATE PROJECT
router.post("/create", async (req, res) => {
  try {
    const { title, description, createdBy, members } = req.body;

    const project = await Project.create({
      title,
      description,
      createdBy,
      members,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// GET ALL PROJECTS
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("createdBy", "name email")
      .populate("members", "name email");

    res.status(200).json(projects);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


module.exports = router;