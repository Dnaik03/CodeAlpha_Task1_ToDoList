document.addEventListener("DOMContentLoaded", () => {
  const taskNameInput = document.getElementById("taskName");
  const dueDateInput = document.getElementById("dueDate");
  const prioritySelect = document.getElementById("priority");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const calendar = document.getElementById("calendar");
  const currentMonthDisplay = document.getElementById("currentMonth");
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");

  let tasks = [];
  let currentDate = new Date();

  // Add Task
  addTaskBtn.addEventListener("click", () => {
    const taskName = taskNameInput.value;
    const dueDate = dueDateInput.value;
    const priority = prioritySelect.value;

    if (!taskName || !dueDate) {
      alert("Please fill in all fields!");
      return;
    }

    const task = { taskName, dueDate, priority };
    tasks.push(task);

    renderTasks();
    renderCalendar();

    taskNameInput.value = "";
    dueDateInput.value = "";
    prioritySelect.value = "Low";
  });

  // Render Tasks
  const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.innerHTML = `
        <div class="task-info">
          <span><strong>Task:</strong> ${task.taskName}</span>
          <span><strong>Due:</strong> ${task.dueDate}</span>
          <span class="priority"><strong>Priority:</strong> ${task.priority}</span>
        </div>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;
      taskList.appendChild(taskItem);
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        tasks.splice(index, 1);
        renderTasks();
        renderCalendar();
      });
    });
  };

  // Render Calendar
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendar.innerHTML = "";
    currentMonthDisplay.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    // Add empty days for alignment
    for (let i = 0; i < firstDay; i++) {
      calendar.appendChild(document.createElement("div"));
    }

    // Add days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement("div");
      dayElement.className = "day";
      dayElement.textContent = day;

      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      if (dateStr === new Date().toISOString().split("T")[0]) {
        dayElement.classList.add("current-day");
      }

      const dayTasks = tasks.filter(task => task.dueDate === dateStr);
      dayTasks.forEach(task => {
        const taskMarker = document.createElement("div");
        taskMarker.className = "task-marker";
        taskMarker.textContent = task.taskName;
        dayElement.appendChild(taskMarker);
      });

      calendar.appendChild(dayElement);
    }
  };

  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();
});