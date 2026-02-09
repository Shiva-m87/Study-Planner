let state = {
  subjects: JSON.parse(localStorage.getItem("subjects")) || [],
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  schedules: JSON.parse(localStorage.getItem("schedules")) || [],
};

function saveData() {
  localStorage.setItem("subjects", JSON.stringify(state.subjects));
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
  localStorage.setItem("schedules", JSON.stringify(state.schedules));
  renderAll();
}

function resetData() {
  if (confirm("Are you sure you want to reset all data?")) {
    localStorage.clear();
    state = {
      subjects: [],
      tasks: [],
      schedules: [],
    };
    renderAll();
    showToast("All data reset successfully");
  }
}
function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark);
}

function exportData() {
  const data = {
    subjects: state.subjects,
    tasks: state.tasks,
    schedules: state.schedules,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "study_planner_backup.json";
  link.click();
  URL.revokeObjectURL(url);
  showToast("Data exported successfully");
}

function showToast(message) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function showSection(id) {
  document
    .querySelectorAll(".section")
    .forEach((sec) => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function addSubject() {
  const name = document.getElementById("subjectName").value.trim();
  const priority = document.getElementById("subjectPriority").value;
  if (!name) return showToast("Enter subject name");
  state.subjects.push({
    id: Date.now(),
    name,
    priority,
  });
  document.getElementById("subjectName").value = "";
  saveData();
}

function renderSubjects() {
  const container = document.getElementById("subjectList");
  container.innerHTML = "";
  state.subjects.forEach((sub) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>${sub.name}</strong> (${sub.priority})
      <button onclick="deleteSubject(${sub.id})">Delete</button>
    `;
    container.appendChild(div);
  });

  populateSubjectDropdowns();
}

function deleteSubject(id) {
  state.subjects = state.subjects.filter((s) => s.id !== id);
  state.tasks = state.tasks.filter((t) => t.subjectId !== id);
  saveData();
}

function populateSubjectDropdowns() {
  const taskSelect = document.getElementById("taskSubject");
  const scheduleSelect = document.getElementById("scheduleSubject");
  taskSelect.innerHTML = "";
  scheduleSelect.innerHTML = "";
  state.subjects.forEach((sub) => {
    const option1 = new Option(sub.name, sub.id);
    const option2 = new Option(sub.name, sub.id);
    taskSelect.add(option1);
    scheduleSelect.add(option2);
  });
}

function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const deadline = document.getElementById("taskDeadline").value;
  const subjectId = Number(document.getElementById("taskSubject").value);
  if (!title || !deadline) return showToast("Fill all fields");
  state.tasks.push({
    id: Date.now(),
    title,
    deadline,
    subjectId,
    completed: false,
  });
  document.getElementById("taskTitle").value = "";
  saveData();
}

function deleteTask(id) {
  state.tasks = state.tasks.filter((t) => t.id !== id);
  showToast("Task deleted");
  saveData();
}

function toggleTask(id) {
  const task = state.tasks.find((t) => t.id === id);
  task.completed = !task.completed;
  saveData();
}

function renderTasks() {
  const container = document.getElementById("taskList");
  container.innerHTML = "";
  const statusFilter = document.getElementById("filterStatus").value;
  const searchText = document.getElementById("searchTask").value.toLowerCase();
  let filteredTasks = state.tasks;
  if (statusFilter === "pending") {
    filteredTasks = filteredTasks.filter((t) => !t.completed);
  } else if (statusFilter === "completed") {
    filteredTasks = filteredTasks.filter((t) => t.completed);
  }
  filteredTasks = filteredTasks.filter((t) =>
    t.title.toLowerCase().includes(searchText),
  );
  filteredTasks.forEach((task) => {
    const subject = state.subjects.find((s) => s.id === task.subjectId);
    const isOverdue = new Date(task.deadline) < new Date() && !task.completed;
    const div = document.createElement("div");
    div.className = "card " + (isOverdue ? "overdue" : "");
    div.innerHTML = `
      <strong style="text-decoration:${task.completed ? "line-through" : "none"}">
        ${task.title}
      </strong>
      <p>Subject: ${subject ? subject.name : "Deleted"}</p>
      <p>Deadline: ${task.deadline}</p>
      <button onclick="toggleTask(${task.id})">
        ${task.completed ? "Undo" : "Mark Completed"}
      </button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    container.appendChild(div);
  });
}

function addSchedule() {
  const day = document.getElementById("scheduleDay").value;
  const start = document.getElementById("startTime").value;
  const end = document.getElementById("endTime").value;
  const subjectId = Number(document.getElementById("scheduleSubject").value);
  if (!start || !end) return showToast("Select time");
  const conflict = state.schedules.some(
    (s) => s.day === day && start < s.end && end > s.start,
  );
  if (conflict) return showToast("Time conflict detected!");
  state.schedules.push({
    id: Date.now(),
    day,
    start,
    end,
    subjectId,
  });
  saveData();
}

function renderSchedules() {
  const container = document.getElementById("weeklySchedule");
  container.innerHTML = "";

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  days.forEach((day) => {
    const daySchedules = state.schedules.filter((s) => s.day === day);

    if (daySchedules.length === 0) return;

    let totalMinutes = 0;

    const dayDiv = document.createElement("div");
    dayDiv.className = "day-group";

    const title = document.createElement("h4");
    title.innerText = day;
    dayDiv.appendChild(title);

    daySchedules.forEach((slot) => {
      const subject = state.subjects.find((s) => s.id === slot.subjectId);

      const [sh, sm] = slot.start.split(":").map(Number);
      const [eh, em] = slot.end.split(":").map(Number);

      totalMinutes += eh * 60 + em - (sh * 60 + sm);

      const slotDiv = document.createElement("div");
      slotDiv.className = "schedule-slot";

      slotDiv.innerHTML = `
        <div>
          <strong>${subject ? subject.name : "Deleted"}</strong>
          <br>
          <small>${slot.start} - ${slot.end}</small>
        </div>
        <button onclick="deleteSchedule(${slot.id})">Delete</button>
      `;

      dayDiv.appendChild(slotDiv);
    });

    const hours = Math.round((totalMinutes / 60) * 100) / 100;

    const summary = document.createElement("p");
    summary.innerHTML = `<strong>Total:</strong> ${hours} hrs`;
    dayDiv.appendChild(summary);

    container.appendChild(dayDiv);
  });
}

function renderDashboard() {
  document.getElementById("totalSubjects").innerText = state.subjects.length;
  const pending = state.tasks.filter((t) => !t.completed).length;
  const completed = state.tasks.filter((t) => t.completed).length;
  document.getElementById("pendingTasks").innerText = pending;
  const percent = state.tasks.length
    ? Math.round((completed / state.tasks.length) * 100)
    : 0;
  document.getElementById("completionRate").innerText = percent + "%";
  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("analyticsText").innerText =
    `Completed ${completed} out of ${state.tasks.length} tasks`;
}

function renderUpcomingDeadlines() {
  const container = document.getElementById("upcomingDeadlines");
  container.innerHTML = "";
  const today = new Date();
  const upcoming = state.tasks
    .filter((t) => !t.completed)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);
  upcoming.forEach((task) => {
    const subject = state.subjects.find((s) => s.id === task.subjectId);
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>${task.title}</strong>
      <p>${subject ? subject.name : ""}</p>
      <p>Due: ${task.deadline}</p>
    `;
    container.appendChild(div);
  });
}

function deleteSchedule(id) {
  state.schedules = state.schedules.filter((s) => s.id !== id);
  showToast("Schedule slot removed");
  saveData();
}


function renderAnalytics() {
  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter((t) => t.completed).length;
  const overdueTasks = state.tasks.filter(
    (t) => new Date(t.deadline) < new Date() && !t.completed,
  ).length;
  const completionPercent = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;
  document.getElementById("progressBar").style.width = completionPercent + "%";
  document.getElementById("analyticsText").innerText =
    `${completedTasks} out of ${totalTasks} tasks completed`;
  document.getElementById("overdueCount").innerText =
    `${overdueTasks} overdue tasks`;
  const subjectContainer = document.getElementById("subjectAnalytics");
  subjectContainer.innerHTML = "";
  let bestSubjectName = "N/A";
  let bestPercent = 0;
  state.subjects.forEach((subject) => {
    const subjectTasks = state.tasks.filter((t) => t.subjectId === subject.id);
    const subjectCompleted = subjectTasks.filter((t) => t.completed).length;
    const percent = subjectTasks.length
      ? Math.round((subjectCompleted / subjectTasks.length) * 100)
      : 0;
    if (percent > bestPercent) {
      bestPercent = percent;
      bestSubjectName = subject.name;
    }
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <strong>${subject.name} (${percent}%)</strong>
      <div class="subject-bar">
        <div class="subject-progress" style="width:${percent}%"></div>
      </div>
    `;
    subjectContainer.appendChild(wrapper);
  });
  document.getElementById("bestSubject").innerText = bestSubjectName;
  let weeklyHours = 0;
  state.schedules.forEach((slot) => {
    const [startHour, startMin] = slot.start.split(":").map(Number);
    const [endHour, endMin] = slot.end.split(":").map(Number);
    const startTotalMinutes = startHour * 60 + startMin;
    const endTotalMinutes = endHour * 60 + endMin;
    if (endTotalMinutes > startTotalMinutes) {
      weeklyHours += (endTotalMinutes - startTotalMinutes) / 60;
    }
  });
  weeklyHours = Math.round(weeklyHours * 100) / 100;
  document.getElementById("weeklyHours").innerText =
    weeklyHours + " hours planned this week";

  let score = 0;
  score += completionPercent * 0.6;
  score += Math.min(weeklyHours * 5, 30);
  score -= overdueTasks * 5;
  score = Math.max(0, Math.min(100, Math.round(score)));
  document.getElementById("productivityScore").innerText = score + " / 100";
}

function renderAll() {
  renderSubjects();
  renderTasks();
  renderSchedules();
  renderDashboard();
  renderUpcomingDeadlines();
  renderAnalytics();
}

renderAll();