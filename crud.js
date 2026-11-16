(function (global) {
  "use strict";

  const STORAGE_KEYS = {
    USERS: "taskflow_users_v2",
    SESSION: "taskflow_session_v2",
    PROJECTS: "taskflow_projects_v2",
    TASKS: "taskflow_tasks_v2",
    THEME: "taskflow_theme_v2"
  };

  /* In-memory cache untuk mencegah JSON.parse berulang di dalam loop render */
  const cache = {
    users: null,
    session: undefined,
    projects: null,
    tasks: null
  };

  function readStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      console.error("Gagal membaca localStorage:", key, err);
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error("Gagal menyimpan ke localStorage:", key, err);
      return false;
    }
  }

  function getAllUsers() {
    if (!cache.users) {
      cache.users = readStorage(STORAGE_KEYS.USERS, []);
    }
    return cache.users;
  }

  function saveAllUsers(users) {
    cache.users = users;
    return writeStorage(STORAGE_KEYS.USERS, users);
  }

  function getAllProjects() {
    if (!cache.projects) {
      cache.projects = readStorage(STORAGE_KEYS.PROJECTS, []);
    }
    return cache.projects;
  }

  function saveAllProjects(projects) {
    cache.projects = projects;
    return writeStorage(STORAGE_KEYS.PROJECTS, projects);
  }

  function getAllTasks() {
    if (!cache.tasks) {
      cache.tasks = readStorage(STORAGE_KEYS.TASKS, []);
    }
    return cache.tasks;
  }

  function saveAllTasks(tasks) {
    cache.tasks = tasks;
    return writeStorage(STORAGE_KEYS.TASKS, tasks);
  }

  function generateId(prefix) {
    return prefix + "_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
  }

  function offsetDateStr(daysFromToday) {
    const d = new Date();
    d.setDate(d.getDate() + daysFromToday);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function registerUser({ name, email, password }) {
    const users = getAllUsers();
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email === normalizedEmail)) {
      return { ok: false, message: "Email sudah terdaftar. Silakan masuk." };
    }

    const newUser = {
      id: generateId("usr"),
      name: name.trim(),
      email: normalizedEmail,
      password: password
    };

    users.push(newUser);
    saveAllUsers(users);

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    };
    cache.session = sessionUser;
    writeStorage(STORAGE_KEYS.SESSION, sessionUser);

    return { ok: true, user: newUser };
  }

  function loginUser({ email, password }) {
    const users = getAllUsers();
    const normalizedEmail = email.trim().toLowerCase();
    const found = users.find((u) => u.email === normalizedEmail && u.password === password);

    if (!found) {
      return { ok: false, message: "Email atau kata sandi tidak sesuai." };
    }

    const sessionUser = { id: found.id, name: found.name, email: found.email };
    cache.session = sessionUser;
    writeStorage(STORAGE_KEYS.SESSION, sessionUser);
    return { ok: true, user: sessionUser };
  }

  function loginDemo() {
    const demoEmail = "demo@taskflow.app";
    const users = getAllUsers();
    let demoUser = users.find((u) => u.email === demoEmail);

    if (!demoUser) {
      demoUser = {
        id: "usr_demo_account",
        name: "William Alexia Christian",
        email: demoEmail,
        password: "password123"
      };
      users.push(demoUser);
      saveAllUsers(users);
    }

    const sessionUser = { id: demoUser.id, name: demoUser.name, email: demoUser.email };
    cache.session = sessionUser;
    writeStorage(STORAGE_KEYS.SESSION, sessionUser);

    const existingProjects = getProjects(demoUser.id);
    if (existingProjects.length === 0) {
      seedDemoData(demoUser.id);
    }

    return { ok: true, user: sessionUser };
  }

  function getCurrentUser() {
    if (cache.session === undefined) {
      cache.session = readStorage(STORAGE_KEYS.SESSION, null);
    }
    return cache.session;
  }

  function logoutUser() {
    cache.session = null;
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  }

  function seedDemoData(userId) {
    const p1 = createProject(userId, {
      name: "Portal Informasi Mahasiswa",
      description: "Pengembangan antarmuka responsif dan sistem manajemen jadwal kegiatan kampus.",
      deadline: offsetDateStr(5),
      status: "Aktif"
    });

    const p2 = createProject(userId, {
      name: "Riset & Dokumentasi API",
      description: "Penyusunan spesifikasi endpoint, pengujian validasi input, dan panduan pengguna.",
      deadline: offsetDateStr(10),
      status: "Perencanaan"
    });

    createTask(userId, {
      projectId: p1.id,
      title: "Desain Komponen Kartu & Navigasi",
      description: "Menerapkan tema pastel dan mode gelap berbasis CSS Variables.",
      deadline: offsetDateStr(1),
      status: "In-Progress",
      priority: "Tinggi",
      subtasks: [
        { id: generateId("sub"), text: "Atur variabel warna terang & gelap", done: true },
        { id: generateId("sub"), text: "Uji tampilan responsif di layar HP", done: false }
      ],
      attachment: null
    });

    createTask(userId, {
      projectId: p1.id,
      title: "Implementasi CRUD localStorage",
      description: "Memisahkan modul penyimpanan data proyek dan tugas ke file crud.js.",
      deadline: offsetDateStr(0),
      status: "Done",
      priority: "Tinggi",
      subtasks: [
        { id: generateId("sub"), text: "Fungsi tambah & ubah proyek", done: true },
        { id: generateId("sub"), text: "Cascade delete tugas saat proyek dihapus", done: true }
      ],
      attachment: null
    });

    createTask(userId, {
      projectId: p2.id,
      title: "Tulis Panduan Langkah Penggunaan",
      description: "Melengkapi dokumentasi tiap fitur beserta ilustrasi langkah kerja.",
      deadline: offsetDateStr(3),
      status: "To-Do",
      priority: "Sedang",
      subtasks: [],
      attachment: null
    });
  }

  function getProjects(userId) {
    return getAllProjects().filter((p) => p.userId === userId);
  }

  function getProjectById(projectId) {
    return getAllProjects().find((p) => p.id === projectId) || null;
  }

  function createProject(userId, { name, description, deadline, status }) {
    const all = getAllProjects();
    const newProject = {
      id: generateId("prj"),
      userId,
      name: name.trim(),
      description: (description || "").trim(),
      deadline,
      status: status || "Aktif",
      createdAt: new Date().toISOString()
    };
    all.push(newProject);
    saveAllProjects(all);
    return newProject;
  }

  function updateProject(projectId, { name, description, deadline, status }) {
    const all = getAllProjects();
    const idx = all.findIndex((p) => p.id === projectId);
    if (idx === -1) return null;

    all[idx] = {
      ...all[idx],
      name: name.trim(),
      description: (description || "").trim(),
      deadline,
      status
    };
    saveAllProjects(all);
    return all[idx];
  }

  function deleteProject(projectId) {
    const allProjects = getAllProjects();
    saveAllProjects(allProjects.filter((p) => p.id !== projectId));

    const allTasks = getAllTasks();
    const deletedCount = allTasks.filter((t) => t.projectId === projectId).length;
    saveAllTasks(allTasks.filter((t) => t.projectId !== projectId));

    return { deletedTasksCount: deletedCount };
  }

  function getTasks(userId) {
    return getAllTasks().filter((t) => t.userId === userId);
  }

  function getTasksByProject(projectId) {
    return getAllTasks().filter((t) => t.projectId === projectId);
  }

  function getTaskById(taskId) {
    return getAllTasks().find((t) => t.id === taskId) || null;
  }

  function createTask(userId, payload) {
    const all = getAllTasks();
    const newTask = {
      id: generateId("tsk"),
      userId,
      projectId: payload.projectId,
      title: payload.title.trim(),
      description: (payload.description || "").trim(),
      deadline: payload.deadline,
      status: payload.status || "To-Do",
      prevStatus: payload.status === "Done" ? "To-Do" : payload.status || "To-Do",
      priority: payload.priority || "Sedang",
      subtasks: Array.isArray(payload.subtasks) ? payload.subtasks : [],
      attachment: payload.attachment || null,
      createdAt: new Date().toISOString()
    };
    all.push(newTask);
    const saved = saveAllTasks(all);
    if (!saved) {
      all.pop();
      return null;
    }
    return newTask;
  }

  function updateTask(taskId, payload) {
    const all = getAllTasks();
    const idx = all.findIndex((t) => t.id === taskId);
    if (idx === -1) return null;

    const current = all[idx];
    const nextStatus = payload.status || current.status;
    const updated = {
      ...current,
      projectId: payload.projectId,
      title: payload.title.trim(),
      description: (payload.description || "").trim(),
      deadline: payload.deadline,
      status: nextStatus,
      prevStatus: nextStatus === "Done" ? current.prevStatus || "To-Do" : nextStatus,
      priority: payload.priority || current.priority,
      subtasks: Array.isArray(payload.subtasks) ? payload.subtasks : current.subtasks,
      attachment: payload.attachment !== undefined ? payload.attachment : current.attachment
    };
    all[idx] = updated;
    const saved = saveAllTasks(all);
    if (!saved) {
      all[idx] = current;
      return null;
    }
    return updated;
  }

  function updateTaskStatus(taskId, newStatus) {
    const all = getAllTasks();
    const idx = all.findIndex((t) => t.id === taskId);
    if (idx === -1) return null;

    const current = all[idx];
    all[idx] = {
      ...current,
      prevStatus: newStatus === "Done" ? (current.status !== "Done" ? current.status : "To-Do") : newStatus,
      status: newStatus
    };
    saveAllTasks(all);
    return all[idx];
  }

  function toggleTaskComplete(taskId) {
    const all = getAllTasks();
    const idx = all.findIndex((t) => t.id === taskId);
    if (idx === -1) return null;

    const current = all[idx];
    if (current.status !== "Done") {
      all[idx] = {
        ...current,
        prevStatus: current.status,
        status: "Done"
      };
    } else {
      all[idx] = {
        ...current,
        status: current.prevStatus && current.prevStatus !== "Done" ? current.prevStatus : "To-Do"
      };
    }

    saveAllTasks(all);
    return all[idx];
  }

  function deleteTask(taskId) {
    const all = getAllTasks();
    saveAllTasks(all.filter((t) => t.id !== taskId));
  }

  function exportUserData(userId) {
    return {
      app: "TaskFlow",
      exportedAt: new Date().toISOString(),
      projects: getProjects(userId),
      tasks: getTasks(userId)
    };
  }

  function importUserData(userId, parsedData) {
    if (!parsedData || !Array.isArray(parsedData.projects) || !Array.isArray(parsedData.tasks)) {
      return { ok: false, message: "Format file JSON tidak valid." };
    }

    const otherProjects = getAllProjects().filter((p) => p.userId !== userId);
    const otherTasks = getAllTasks().filter((t) => t.userId !== userId);

    const importedProjects = parsedData.projects.map((p) => ({ ...p, userId }));
    const importedTasks = parsedData.tasks.map((t) => ({ ...t, userId }));

    saveAllProjects([...otherProjects, ...importedProjects]);
    saveAllTasks([...otherTasks, ...importedTasks]);

    return {
      ok: true,
      projectsCount: importedProjects.length,
      tasksCount: importedTasks.length
    };
  }

  function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || "light";
  }

  function saveTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }

  global.TaskFlowCRUD = {
    generateId,
    registerUser,
    loginUser,
    loginDemo,
    getCurrentUser,
    logoutUser,
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getTasks,
    getTasksByProject,
    getTaskById,
    createTask,
    updateTask,
    updateTaskStatus,
    toggleTaskComplete,
    deleteTask,
    exportUserData,
    importUserData,
    getSavedTheme,
    saveTheme
  };
})(window);
