const createTask = async (e) => {
  e.preventDefault();

  try {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const taskData = {
      title,
      description,
      project,
      assignedTo,
      dueDate,
      status,
      createdBy: user?._id,
    };

    console.log(taskData);

    const res = await axios.post(
      "https://team-task-manager-production-813d.up.railway.app/api/tasks/create",
      taskData
    );

    alert("Task created successfully");

    console.log(res.data);

    // REFRESH TASKS
    fetchTasks();

    // CLEAR FORM
    setTitle("");
    setDescription("");
    setProject("");
    setAssignedTo("");
    setDueDate("");
    setStatus("Pending");

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Error creating task"
    );
  }
};