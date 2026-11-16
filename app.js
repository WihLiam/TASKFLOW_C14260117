(function () {
  "use strict";

  const CRUD = window.TaskFlowCRUD;

  const ICONS = {
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    login: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>',
    logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
    sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    userPlus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    folderPlus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>',
    checkSquare: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    circle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    alertCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    barChart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
    timer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="2" x2="14" y2="2"/><line x1="12" y1="14" x2="15" y2="11"/><circle cx="12" cy="14" r="8"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
    rotateCcw: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    paperclip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    helpCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
  };

  function iconHtml(name) {
    return ICONS[name] || "";
  }

  function hydrateStaticIcons() {
    document.querySelectorAll("[data-icon]").forEach((el) => {
      const key = el.getAttribute("data-icon");
      if (ICONS[key]) {
        el.innerHTML = ICONS[key];
      }
    });
  }

  const state = {
    currentUser: null,
    activeSection: "dashboard",
    modalSubtasks: [],
    modalAttachment: null,
    draggedTaskId: null,
    calendarDate: new Date(),
    helpStepIndex: 0,
    rafPending: false,
    timer: {
      totalSeconds: 25 * 60,
      remainingSeconds: 25 * 60,
      intervalId: null,
      running: false
    }
  };

  const HELP_STEPS = [
    {
      pill: "1. Masuk & Akun",
      title: "Langkah 1: Autentikasi Akun & Mode Demo",
      url: "taskflow.app/login",
      steps: [
        "Daftar akun baru di tab Daftar Akun atau masuk memakai email dan kata sandi yang sudah terdaftar.",
        "Gunakan tombol Masuk dengan Akun Demo untuk langsung mencoba aplikasi lengkap dengan contoh proyek dan tugas.",
        "Halaman Dashboard terlindungi secara otomatis dan tidak dapat dibuka sebelum sesi login aktif."
      ],
      renderShot: () => `
        <div class="shot-box" style="text-align:center;">
          <strong style="color:var(--royal-blue);font-family:'Pacifico',cursive;font-size:1.1rem;">TaskFlow</strong>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0;">
            <div style="background:var(--primary-grad);color:#fff;padding:4px;border-radius:99px;font-weight:700;">Masuk</div>
            <div style="background:var(--surface-soft);padding:4px;border-radius:99px;">Daftar</div>
          </div>
          <div style="text-align:left;background:var(--surface-soft);padding:6px 10px;border-radius:8px;margin-bottom:6px;color:var(--text-soft);">demo@taskflow.app</div>
          <div class="shot-box shot-highlight" style="background:var(--pastel-grad);color:var(--royal-blue);font-weight:800;padding:7px;">
            Masuk dengan Akun Demo
          </div>
          <span class="shot-callout">1 Klik Langsung Masuk + Data Contoh</span>
        </div>
      `
    },
    {
      pill: "2. Kelola Proyek",
      title: "Langkah 2: Membuat & Mengelola Proyek",
      url: "taskflow.app/projects",
      steps: [
        "Buka menu Proyek di bilah navigasi atas lalu klik tombol Tambah Proyek.",
        "Isi nama proyek, deskripsi singkat, tanggal deadline, dan status proyek (Aktif, Perencanaan, atau Selesai).",
        "Menghapus proyek akan menampilkan konfirmasi dan ikut menghapus seluruh tugas di dalam proyek tersebut."
      ],
      renderShot: () => `
        <div class="shot-box shot-highlight">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <strong>Portal Informasi Mahasiswa</strong>
            <span class="pill-badge pill-primary">Aktif</span>
          </div>
          <div style="font-size:0.72rem;color:var(--text-muted);margin-bottom:8px;">Deadline: 21 Nov 2026 • 2/3 tugas selesai</div>
          <div class="progress-track"><div class="progress-fill" style="width:67%"></div></div>
          <span class="shot-callout">Edit, Lihat Tugas, atau Hapus Proyek</span>
        </div>
      `
    },
    {
      pill: "3. Tugas & Lampiran",
      title: "Langkah 3: Tambah Tugas, Sub-tugas & Lampiran",
      url: "taskflow.app/tasks/new",
      steps: [
        "Klik Tambah Tugas, pilih proyek terkait, tentukan tenggat waktu, dan pilih tingkat prioritas.",
        "Tambahkan langkah kecil pada bagian Sub-tugas (Checklist) untuk memecah pekerjaan besar.",
        "Unggah lampiran gambar atau dokumen (maks. 1.5 MB) yang dapat dipratinjau dan diunduh kembali kapan saja."
      ],
      renderShot: () => `
        <div class="shot-box">
          <div style="font-weight:800;margin-bottom:6px;">Desain Komponen Kartu</div>
          <div style="display:flex;gap:6px;margin-bottom:8px;">
            <span class="pill-badge pill-danger">Tinggi</span>
            <span class="pill-badge pill-primary">Portal Mahasiswa</span>
          </div>
          <div class="shot-box shot-highlight" style="padding:6px 10px;background:var(--pastel-grad);color:var(--royal-blue);font-weight:700;">
            Lampiran: wireframe-ui.png (Klik Pratinjau)
          </div>
          <span class="shot-callout">Mendukung Gambar, PDF &amp; Dokumen</span>
        </div>
      `
    },
    {
      pill: "4. Checklist & Kanban",
      title: "Langkah 4: Checklist Selesai Cepat & Drag-and-Drop",
      url: "taskflow.app/tasks/board",
      steps: [
        "Klik tombol lingkaran checklist di sebelah kiri judul tugas untuk menandai tugas selesai (Done) secara instan.",
        "Klik ulang lingkaran yang sudah tercentang jika ingin mengembalikan tugas ke status sebelumnya.",
        "Kamu juga bisa menyeret (drag-and-drop) kartu tugas antar kolom To-Do, In-Progress, dan Done."
      ],
      renderShot: () => `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div class="shot-box shot-highlight">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="width:20px;height:20px;border-radius:50%;background:#10b981;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:800;">✓</span>
              <span style="text-decoration:line-through;color:var(--text-soft);font-weight:700;">Setup CRUD</span>
            </div>
            <span class="shot-callout">1 Klik Selesai!</span>
          </div>
          <div class="shot-box" style="border-style:dashed;border-color:var(--primary);display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;">
            <strong style="color:var(--royal-blue);">Kolom Done</strong>
            <span style="font-size:0.7rem;color:var(--text-muted);">Atau seret kartu ke sini</span>
          </div>
        </div>
      `
    },
    {
      pill: "5. Kalender & Timer",
      title: "Langkah 5: Kalender Deadline, Timer & Mode Gelap",
      url: "taskflow.app/calendar",
      steps: [
        "Buka tab Kalender untuk melihat seluruh jadwal deadline proyek dan tugas dalam tampilan bulanan.",
        "Gunakan Focus Timer (Pomodoro 25 menit) di Dashboard untuk menjaga ritme belajar dan bekerja.",
        "Klik ikon Bulan/Matahari di bilah atas untuk beralih antara tema pastel cerah dan Mode Gelap."
      ],
      renderShot: () => `
        <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:8px;">
          <div class="shot-box shot-highlight">
            <div style="font-weight:800;margin-bottom:4px;">Kalender Bulanan</div>
            <div style="background:rgba(59,130,246,0.16);color:var(--royal-blue);padding:3px 6px;border-radius:6px;font-weight:700;margin-bottom:4px;">Tgl 17 • Implementasi CRUD</div>
            <div style="background:rgba(245,158,11,0.2);color:#b45309;padding:3px 6px;border-radius:6px;font-weight:700;">Tgl 21 • Deadline Proyek</div>
          </div>
          <div class="shot-box" style="text-align:center;">
            <div style="font-size:0.72rem;font-weight:700;color:var(--text-muted);">Focus Timer</div>
            <div style="font-size:1.3rem;font-weight:800;color:var(--royal-blue);margin:4px 0;">25:00</div>
            <span class="pill-badge pill-primary">Mulai Fokus</span>
          </div>
        </div>
      `
    }
  ];

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDateID(dateStr) {
    if (!dateStr) return "-";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const mIdx = parseInt(parts[1], 10) - 1;
    return `${parseInt(parts[2], 10)} ${months[mIdx] || parts[1]} ${parts[0]}`;
  }

  function getDeadlineBadge(dateStr, isDone, todayMs) {
    if (isDone) {
      return { text: "Selesai", cls: "pill-success" };
    }
    const target = new Date(dateStr + "T00:00:00").getTime();
    const diffDays = Math.round((target - todayMs) / 86400000);

    if (diffDays < 0) return { text: `Terlambat ${Math.abs(diffDays)}h`, cls: "pill-danger" };
    if (diffDays === 0) return { text: "Hari Ini", cls: "pill-danger" };
    if (diffDays === 1) return { text: "Besok", cls: "pill-warning" };
    if (diffDays <= 3) return { text: `${diffDays} hari lagi`, cls: "pill-warning" };
    return { text: formatDateID(dateStr), cls: "pill-primary" };
  }

  function getTodayMidnightMs() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.getTime();
  }

  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    const iconKey = type === "success" ? "checkCircle" : type === "error" ? "alertCircle" : "sparkles";
    toast.innerHTML = `<span class="icon-slot">${iconHtml(iconKey)}</span><span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
      setTimeout(() => toast.remove(), 220);
    }, 2800);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    CRUD.saveTheme(theme);

    const isDark = theme === "dark";
    const authBtn = document.getElementById("auth-theme-btn");
    const appBtn = document.getElementById("app-theme-btn");

    if (authBtn) {
      authBtn.innerHTML = `<span class="icon-slot">${iconHtml(isDark ? "sun" : "moon")}</span><span>${isDark ? "Mode Terang" : "Mode Gelap"}</span>`;
    }
    if (appBtn) {
      appBtn.innerHTML = `<span class="icon-slot">${iconHtml(isDark ? "sun" : "moon")}</span>`;
      appBtn.title = isDark ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap";
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(current === "light" ? "dark" : "light");
  }

  function checkRouteGuard() {
    const user = CRUD.getCurrentUser();
    state.currentUser = user;

    const authView = document.getElementById("auth-view");
    const appView = document.getElementById("app-view");

    if (!user) {
      authView.classList.remove("hidden");
      appView.classList.add("hidden");
      return false;
    }

    authView.classList.add("hidden");
    appView.classList.remove("hidden");

    document.getElementById("user-display-name").textContent = user.name;
    document.getElementById("user-avatar").textContent = user.name.charAt(0).toUpperCase();
    document.getElementById("welcome-heading").textContent = `Halo, ${user.name}!`;

    const now = new Date();
    document.getElementById("today-date-label").textContent = now.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    scheduleRender();
    return true;
  }

  function setupAuthEvents() {
    document.querySelectorAll("[data-auth-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-auth-tab");
        document.querySelectorAll("[data-auth-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        document.getElementById("form-login").classList.toggle("hidden", target !== "login");
        document.getElementById("form-register").classList.toggle("hidden", target !== "register");
      });
    });

    document.querySelectorAll("[data-toggle-pass]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const input = document.getElementById(btn.getAttribute("data-toggle-pass"));
        if (input) {
          input.type = input.type === "password" ? "text" : "password";
        }
      });
    });

    document.getElementById("form-login").addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;

      document.getElementById("err-login-email").textContent = "";
      document.getElementById("err-login-password").textContent = "";

      let valid = true;
      if (!email || !email.includes("@")) {
        document.getElementById("err-login-email").textContent = "Masukkan alamat email yang valid.";
        valid = false;
      }
      if (!password) {
        document.getElementById("err-login-password").textContent = "Kata sandi wajib diisi.";
        valid = false;
      }
      if (!valid) return;

      const res = CRUD.loginUser({ email, password });
      if (!res.ok) {
        document.getElementById("err-login-password").textContent = res.message;
        showToast(res.message, "error");
        return;
      }

      showToast(`Selamat datang kembali, ${res.user.name}!`, "success");
      checkRouteGuard();
    });

    document.getElementById("form-register").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("reg-name").value.trim();
      const email = document.getElementById("reg-email").value.trim();
      const password = document.getElementById("reg-password").value;
      const confirm = document.getElementById("reg-confirm").value;

      ["err-reg-name", "err-reg-email", "err-reg-password", "err-reg-confirm"].forEach((id) => {
        document.getElementById(id).textContent = "";
      });

      let valid = true;
      if (name.length < 2) {
        document.getElementById("err-reg-name").textContent = "Nama minimal 2 karakter.";
        valid = false;
      }
      if (!email || !email.includes("@")) {
        document.getElementById("err-reg-email").textContent = "Format email tidak valid.";
        valid = false;
      }
      if (password.length < 6) {
        document.getElementById("err-reg-password").textContent = "Kata sandi minimal 6 karakter.";
        valid = false;
      }
      if (password !== confirm) {
        document.getElementById("err-reg-confirm").textContent = "Konfirmasi kata sandi tidak cocok.";
        valid = false;
      }
      if (!valid) return;

      const res = CRUD.registerUser({ name, email, password });
      if (!res.ok) {
        document.getElementById("err-reg-email").textContent = res.message;
        showToast(res.message, "error");
        return;
      }

      showToast("Akun berhasil dibuat!", "success");
      checkRouteGuard();
    });

    document.getElementById("btn-demo-login").addEventListener("click", () => {
      const res = CRUD.loginDemo();
      if (res.ok) {
        showToast("Berhasil masuk menggunakan Akun Demo!", "success");
        checkRouteGuard();
      }
    });

    document.getElementById("btn-logout").addEventListener("click", () => {
      CRUD.logoutUser();
      state.currentUser = null;
      showToast("Kamu telah keluar dari sesi.", "info");
      checkRouteGuard();
    });
  }

  function switchSection(sectionName) {
    if (!state.currentUser) {
      checkRouteGuard();
      return;
    }
    state.activeSection = sectionName;

    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-nav") === sectionName);
    });

    document.querySelectorAll(".page-section").forEach((sec) => {
      sec.classList.toggle("active", sec.id === `section-${sectionName}`);
    });

    scheduleRender();
  }

  function renderDashboard() {
    const userId = state.currentUser.id;
    const projects = CRUD.getProjects(userId);
    const tasks = CRUD.getTasks(userId);

    const projectMap = new Map(projects.map((p) => [p.id, p]));
    const taskCountByProj = new Map();

    let todoCount = 0;
    let progCount = 0;
    let doneCount = 0;

    for (let i = 0; i < tasks.length; i++) {
      const t = tasks[i];
      if (t.status === "To-Do") todoCount++;
      else if (t.status === "In-Progress") progCount++;
      else if (t.status === "Done") doneCount++;

      const entry = taskCountByProj.get(t.projectId) || { total: 0, done: 0 };
      entry.total++;
      if (t.status === "Done") entry.done++;
      taskCountByProj.set(t.projectId, entry);
    }

    document.getElementById("stat-projects").textContent = projects.length;
    document.getElementById("stat-todo").textContent = todoCount;
    document.getElementById("stat-progress").textContent = progCount;
    document.getElementById("stat-done").textContent = doneCount;

    const pct = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0;
    document.getElementById("overall-progress-pct").textContent = `${pct}%`;
    document.getElementById("overall-progress-bar").style.width = `${pct}%`;
    document.getElementById("overall-progress-desc").textContent = `${doneCount} dari ${tasks.length} tugas telah diselesaikan`;

    const upcomingContainer = document.getElementById("upcoming-tasks-list");
    const sortedTasks = [...tasks].sort((a, b) => a.deadline.localeCompare(b.deadline)).slice(0, 6);
    const todayMs = getTodayMidnightMs();

    if (sortedTasks.length === 0) {
      upcomingContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">${iconHtml("checkCircle")}</div>
          <p>Belum ada tugas. Tambahkan tugas baru untuk mulai memantau tenggat waktu.</p>
        </div>
      `;
    } else {
      upcomingContainer.innerHTML = sortedTasks
        .map((task) => {
          const proj = projectMap.get(task.projectId);
          const isDone = task.status === "Done";
          const badge = getDeadlineBadge(task.deadline, isDone, todayMs);
          return `
            <div class="upcoming-item">
              <div class="upcoming-left">
                <button
                  type="button"
                  class="quick-check-btn ${isDone ? "is-checked" : ""}"
                  data-quick-complete="${task.id}"
                  title="${isDone ? "Tandai belum selesai" : "Klik untuk selesai"}"
                  aria-label="Checklist selesai ${escapeHtml(task.title)}">
                  ${iconHtml("check")}
                </button>
                <div class="upcoming-meta">
                  <div class="upcoming-title ${isDone ? "completed-text" : ""}">${escapeHtml(task.title)}</div>
                  <div class="upcoming-sub">${escapeHtml(proj ? proj.name : "Tanpa Proyek")} • ${task.priority}</div>
                </div>
              </div>
              <span class="pill-badge ${badge.cls}">${badge.text}</span>
            </div>
          `;
        })
        .join("");
    }

    const projProgContainer = document.getElementById("project-progress-list");
    if (projects.length === 0) {
      projProgContainer.innerHTML = `<p class="muted-text">Belum ada proyek yang dibuat.</p>`;
    } else {
      projProgContainer.innerHTML = projects
        .map((proj) => {
          const stats = taskCountByProj.get(proj.id) || { total: 0, done: 0 };
          const pPct = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;
          return `
            <div class="proj-prog-item">
              <div class="proj-prog-top">
                <span>${escapeHtml(proj.name)}</span>
                <span>${stats.done}/${stats.total} (${pPct}%)</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${pPct}%"></div>
              </div>
            </div>
          `;
        })
        .join("");
    }
  }

  function renderProjects() {
    const userId = state.currentUser.id;
    const search = document.getElementById("filter-project-search").value.trim().toLowerCase();
    const statusFilter = document.getElementById("filter-project-status").value;

    let projects = CRUD.getProjects(userId);
    const allTasks = CRUD.getTasks(userId);
    const taskCountByProj = new Map();

    for (let i = 0; i < allTasks.length; i++) {
      const t = allTasks[i];
      const entry = taskCountByProj.get(t.projectId) || { total: 0, done: 0 };
      entry.total++;
      if (t.status === "Done") entry.done++;
      taskCountByProj.set(t.projectId, entry);
    }

    if (search) {
      projects = projects.filter(
        (p) => p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search)
      );
    }
    if (statusFilter !== "all") {
      projects = projects.filter((p) => p.status === statusFilter);
    }

    const grid = document.getElementById("projects-grid");
    if (projects.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">${iconHtml("folder")}</div>
          <p>Tidak ada proyek yang sesuai. Klik tombol <strong>Tambah Proyek</strong> untuk membuat proyek baru.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = projects
      .map((proj) => {
        const stats = taskCountByProj.get(proj.id) || { total: 0, done: 0 };
        const pct = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;
        const statusCls =
          proj.status === "Selesai" ? "pill-success" : proj.status === "Aktif" ? "pill-primary" : "pill-warning";

        return `
          <article class="project-card glass-panel">
            <div>
              <div class="project-card-top">
                <h3 class="project-card-title">${escapeHtml(proj.name)}</h3>
                <span class="pill-badge ${statusCls}">${escapeHtml(proj.status)}</span>
              </div>
              <p class="project-card-desc">${escapeHtml(proj.description || "Tidak ada deskripsi proyek.")}</p>
            </div>

            <div>
              <div class="proj-prog-top" style="margin-bottom:6px;">
                <span class="muted-text small">Progres Tugas</span>
                <span class="muted-text small"><strong>${stats.done}/${stats.total}</strong> (${pct}%)</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width:${pct}%"></div>
              </div>
            </div>

            <div class="project-card-actions">
              <span class="pill-badge pill-info">
                ${iconHtml("calendar")}
                <span>${formatDateID(proj.deadline)}</span>
              </span>
              <div class="action-icon-group">
                <button type="button" class="btn-mini-icon" data-view-project-tasks="${proj.id}" title="Lihat Tugas Proyek">
                  ${iconHtml("arrowRight")}
                </button>
                <button type="button" class="btn-mini-icon" data-edit-project="${proj.id}" title="Edit Proyek">
                  ${iconHtml("edit")}
                </button>
                <button type="button" class="btn-mini-icon del" data-delete-project="${proj.id}" title="Hapus Proyek">
                  ${iconHtml("trash")}
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function syncProjectDropdowns() {
    const projects = CRUD.getProjects(state.currentUser.id);

    const filterSelect = document.getElementById("filter-task-project");
    const currentFilter = filterSelect.value;
    filterSelect.innerHTML =
      `<option value="all">Semua Proyek</option>` +
      projects.map((p) => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join("");
    if ([...filterSelect.options].some((o) => o.value === currentFilter)) {
      filterSelect.value = currentFilter;
    }

    const modalSelect = document.getElementById("task-project");
    modalSelect.innerHTML = projects
      .map((p) => `<option value="${p.id}">${escapeHtml(p.name)}</option>`)
      .join("");
  }

  function renderTasks() {
    syncProjectDropdowns();
    const userId = state.currentUser.id;
    const search = document.getElementById("filter-task-search").value.trim().toLowerCase();
    const projFilter = document.getElementById("filter-task-project").value;
    const statusFilter = document.getElementById("filter-task-status").value;
    const priorityFilter = document.getElementById("filter-task-priority").value;

    const projects = CRUD.getProjects(userId);
    const projectMap = new Map(projects.map((p) => [p.id, p]));
    let tasks = CRUD.getTasks(userId);

    if (search) {
      tasks = tasks.filter(
        (t) => t.title.toLowerCase().includes(search) || t.description.toLowerCase().includes(search)
      );
    }
    if (projFilter !== "all") {
      tasks = tasks.filter((t) => t.projectId === projFilter);
    }
    if (statusFilter !== "all") {
      tasks = tasks.filter((t) => t.status === statusFilter);
    }
    if (priorityFilter !== "all") {
      tasks = tasks.filter((t) => t.priority === priorityFilter);
    }

    const columns = {
      "To-Do": document.getElementById("col-todo"),
      "In-Progress": document.getElementById("col-progress"),
      "Done": document.getElementById("col-done")
    };

    const grouped = { "To-Do": [], "In-Progress": [], "Done": [] };
    tasks.forEach((t) => {
      if (grouped[t.status]) grouped[t.status].push(t);
    });

    document.getElementById("count-col-todo").textContent = grouped["To-Do"].length;
    document.getElementById("count-col-progress").textContent = grouped["In-Progress"].length;
    document.getElementById("count-col-done").textContent = grouped["Done"].length;

    const todayMs = getTodayMidnightMs();

    Object.keys(columns).forEach((statusKey) => {
      const zone = columns[statusKey];
      const list = grouped[statusKey];

      if (list.length === 0) {
        zone.innerHTML = `<div class="empty-state" style="padding:22px 12px;"><p class="muted-text small">Belum ada tugas di kolom ${statusKey}</p></div>`;
        return;
      }

      zone.innerHTML = list
        .map((task) => {
          const proj = projectMap.get(task.projectId);
          const isDone = task.status === "Done";
          const deadlineBadge = getDeadlineBadge(task.deadline, isDone, todayMs);
          const prioCls =
            task.priority === "Tinggi"
              ? "pill-danger"
              : task.priority === "Sedang"
              ? "pill-warning"
              : "pill-success";

          const subTotal = Array.isArray(task.subtasks) ? task.subtasks.length : 0;
          const subDone = subTotal > 0 ? task.subtasks.filter((s) => s.done).length : 0;
          const subPct = subTotal > 0 ? Math.round((subDone / subTotal) * 100) : 0;

          return `
            <article class="task-card ${isDone ? "is-done" : ""}" draggable="true" data-task-id="${task.id}">
              <div class="task-card-header">
                <button
                  type="button"
                  class="quick-check-btn ${isDone ? "is-checked" : ""}"
                  data-quick-complete="${task.id}"
                  title="${isDone ? "Batalkan selesai" : "Klik checklist untuk selesai"}"
                  aria-label="Checklist selesai ${escapeHtml(task.title)}">
                  ${iconHtml("check")}
                </button>
                <div class="task-title-wrap">
                  <h4 class="task-card-title">${escapeHtml(task.title)}</h4>
                </div>
              </div>

              ${task.description ? `<p class="task-card-desc">${escapeHtml(task.description)}</p>` : ""}

              <div class="task-tags-row">
                <span class="pill-badge pill-primary">${escapeHtml(proj ? proj.name : "Proyek")}</span>
                <span class="pill-badge ${prioCls}">${escapeHtml(task.priority)}</span>
                <span class="pill-badge ${deadlineBadge.cls}">${deadlineBadge.text}</span>
              </div>

              ${
                subTotal > 0
                  ? `<div class="task-subtask-bar">
                      <span>${subDone}/${subTotal} langkah</span>
                      <div class="progress-track"><div class="progress-fill" style="width:${subPct}%"></div></div>
                    </div>`
                  : ""
              }

              ${
                task.attachment
                  ? `<button type="button" class="att-link-pill" data-preview-att="${task.id}">
                      ${iconHtml("paperclip")}
                      <span class="att-name">${escapeHtml(task.attachment.name)}</span>
                    </button>`
                  : ""
              }

              <div class="task-card-footer">
                <select class="mobile-status-select" data-quick-status="${task.id}" aria-label="Ubah status tugas">
                  <option value="To-Do" ${task.status === "To-Do" ? "selected" : ""}>To-Do</option>
                  <option value="In-Progress" ${task.status === "In-Progress" ? "selected" : ""}>In-Progress</option>
                  <option value="Done" ${task.status === "Done" ? "selected" : ""}>Done</option>
                </select>
                <div class="action-icon-group">
                  <button type="button" class="btn-mini-icon" data-edit-task="${task.id}" title="Edit Tugas">
                    ${iconHtml("edit")}
                  </button>
                  <button type="button" class="btn-mini-icon del" data-delete-task="${task.id}" title="Hapus Tugas">
                    ${iconHtml("trash")}
                  </button>
                </div>
              </div>
            </article>
          `;
        })
        .join("");
    });
  }

  function setupDragAndDropDelegation() {
    const board = document.querySelector(".kanban-board");
    if (!board) return;

    board.addEventListener("dragstart", (e) => {
      const card = e.target.closest(".task-card[draggable='true']");
      if (!card) return;
      state.draggedTaskId = card.getAttribute("data-task-id");
      card.classList.add("dragging");
    });

    board.addEventListener("dragend", (e) => {
      const card = e.target.closest(".task-card[draggable='true']");
      if (card) card.classList.remove("dragging");
      state.draggedTaskId = null;
      document.querySelectorAll(".kanban-dropzone.drag-over").forEach((z) => z.classList.remove("drag-over"));
    });

    document.querySelectorAll(".kanban-dropzone").forEach((zone) => {
      zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (!zone.classList.contains("drag-over")) {
          zone.classList.add("drag-over");
        }
      });

      zone.addEventListener("dragleave", (e) => {
        if (!zone.contains(e.relatedTarget)) {
          zone.classList.remove("drag-over");
        }
      });

      zone.addEventListener("drop", (e) => {
        e.preventDefault();
        zone.classList.remove("drag-over");
        const targetStatus = zone.getAttribute("data-status");
        if (state.draggedTaskId && targetStatus) {
          CRUD.updateTaskStatus(state.draggedTaskId, targetStatus);
          showToast(`Status tugas dipindahkan ke ${targetStatus}`, "success");
          scheduleRender();
        }
      });
    });
  }

  function renderCalendar() {
    const year = state.calendarDate.getFullYear();
    const month = state.calendarDate.getMonth();
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    document.getElementById("cal-month-label").textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();

    const projects = CRUD.getProjects(state.currentUser.id);
    const tasks = CRUD.getTasks(state.currentUser.id);

    const projectsByDate = new Map();
    for (let i = 0; i < projects.length; i++) {
      const p = projects[i];
      const list = projectsByDate.get(p.deadline) || [];
      list.push(p);
      projectsByDate.set(p.deadline, list);
    }

    const tasksByDate = new Map();
    for (let i = 0; i < tasks.length; i++) {
      const t = tasks[i];
      const list = tasksByDate.get(t.deadline) || [];
      list.push(t);
      tasksByDate.set(t.deadline, list);
    }

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
      today.getDate()
    ).padStart(2, "0")}`;

    let cellsHtml = "";
    const totalCells = 42;

    for (let i = 0; i < totalCells; i++) {
      let dayNum;
      let cellDateStr;
      let isOther = false;

      if (i < firstDay) {
        dayNum = prevDays - firstDay + i + 1;
        const prevMonth = month === 0 ? 12 : month;
        const prevYear = month === 0 ? year - 1 : year;
        cellDateStr = `${prevYear}-${String(prevMonth).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
        isOther = true;
      } else if (i >= firstDay + daysInMonth) {
        dayNum = i - (firstDay + daysInMonth) + 1;
        const nextMonth = month === 11 ? 1 : month + 2;
        const nextYear = month === 11 ? year + 1 : year;
        cellDateStr = `${nextYear}-${String(nextMonth).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
        isOther = true;
      } else {
        dayNum = i - firstDay + 1;
        cellDateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
      }

      const dayProjects = projectsByDate.get(cellDateStr) || [];
      const dayTasks = tasksByDate.get(cellDateStr) || [];

      const eventsHtml = [
        ...dayProjects.map(
          (p) => `<div class="cal-event-pill ev-proj" data-edit-project="${p.id}" title="Proyek: ${escapeHtml(p.name)}">${escapeHtml(p.name)}</div>`
        ),
        ...dayTasks.map(
          (t) =>
            `<div class="cal-event-pill ${t.status === "Done" ? "ev-done" : "ev-task"}" data-edit-task="${t.id}" title="Tugas: ${escapeHtml(
              t.title
            )}">${escapeHtml(t.title)}</div>`
        )
      ].join("");

      cellsHtml += `
        <div class="cal-cell ${isOther ? "other-month" : ""} ${cellDateStr === todayStr ? "is-today" : ""}">
          <div class="cal-cell-top">
            <span class="cal-day-num">${dayNum}</span>
            <button type="button" class="cal-add-btn" data-cal-add-date="${cellDateStr}" title="Tambah tugas pada tanggal ini">
              ${iconHtml("plus")}
            </button>
          </div>
          ${eventsHtml}
        </div>
      `;
    }

    document.getElementById("calendar-grid").innerHTML = cellsHtml;
  }

  function openModal(id) {
    document.getElementById(id).classList.remove("hidden");
  }

  function closeModal(id) {
    document.getElementById(id).classList.add("hidden");
  }

  function openProjectModal(projectId = null) {
    document.getElementById("err-project-name").textContent = "";
    document.getElementById("err-project-deadline").textContent = "";

    if (projectId) {
      const proj = CRUD.getProjectById(projectId);
      if (!proj) return;
      document.getElementById("modal-project-title").textContent = "Edit Proyek";
      document.getElementById("project-id").value = proj.id;
      document.getElementById("project-name").value = proj.name;
      document.getElementById("project-desc").value = proj.description;
      document.getElementById("project-deadline").value = proj.deadline;
      document.getElementById("project-status").value = proj.status;
    } else {
      document.getElementById("modal-project-title").textContent = "Tambah Proyek Baru";
      document.getElementById("form-project").reset();
      document.getElementById("project-id").value = "";
    }

    openModal("modal-project");
  }

  function renderModalSubtasks() {
    const list = document.getElementById("modal-subtask-list");
    list.innerHTML = state.modalSubtasks
      .map(
        (sub, idx) => `
        <li class="modal-subtask-item">
          <label class="modal-subtask-left">
            <input type="checkbox" data-toggle-modal-sub="${idx}" ${sub.done ? "checked" : ""} />
            <span style="${sub.done ? "text-decoration:line-through;opacity:0.65;" : ""}">${escapeHtml(sub.text)}</span>
          </label>
          <button type="button" class="btn-mini-icon del" data-remove-modal-sub="${idx}" aria-label="Hapus langkah">
            ${iconHtml("x")}
          </button>
        </li>
      `
      )
      .join("");
  }

  function renderModalAttachmentChip() {
    const box = document.getElementById("task-attachment-preview");
    if (!state.modalAttachment) {
      box.classList.add("hidden");
      box.innerHTML = "";
      return;
    }
    box.classList.remove("hidden");
    box.innerHTML = `
      <span>${escapeHtml(state.modalAttachment.name)}</span>
      <button type="button" class="btn-mini-icon del" id="btn-remove-attachment" title="Hapus lampiran">
        ${iconHtml("trash")}
      </button>
    `;
  }

  function openTaskModal(taskId = null, defaultDate = "") {
    const projects = CRUD.getProjects(state.currentUser.id);
    if (projects.length === 0) {
      showToast("Buat minimal satu proyek terlebih dahulu sebelum menambah tugas.", "warning");
      openProjectModal();
      return;
    }

    syncProjectDropdowns();
    ["err-task-title", "err-task-project", "err-task-deadline", "err-task-attachment"].forEach((id) => {
      document.getElementById(id).textContent = "";
    });
    document.getElementById("task-attachment").value = "";

    if (taskId) {
      const task = CRUD.getTaskById(taskId);
      if (!task) return;
      document.getElementById("modal-task-title").textContent = "Edit Tugas";
      document.getElementById("task-id").value = task.id;
      document.getElementById("task-title").value = task.title;
      document.getElementById("task-project").value = task.projectId;
      document.getElementById("task-desc").value = task.description;
      document.getElementById("task-deadline").value = task.deadline;
      document.getElementById("task-status").value = task.status;
      document.getElementById("task-priority").value = task.priority;
      state.modalSubtasks = JSON.parse(JSON.stringify(task.subtasks || []));
      state.modalAttachment = task.attachment ? { ...task.attachment } : null;
    } else {
      document.getElementById("modal-task-title").textContent = "Tambah Tugas Baru";
      document.getElementById("form-task").reset();
      document.getElementById("task-id").value = "";
      if (defaultDate) {
        document.getElementById("task-deadline").value = defaultDate;
      }
      state.modalSubtasks = [];
      state.modalAttachment = null;
    }

    renderModalSubtasks();
    renderModalAttachmentChip();
    openModal("modal-task");
  }

  function openAttachmentPreview(taskId) {
    const task = CRUD.getTaskById(taskId);
    if (!task || !task.attachment) return;

    const att = task.attachment;
    document.getElementById("att-modal-filename").textContent = att.name;
    const dlLink = document.getElementById("att-download-link");
    dlLink.href = att.dataUrl;
    dlLink.download = att.name;

    const container = document.getElementById("att-preview-container");
    if (att.type && att.type.startsWith("image/")) {
      container.innerHTML = `<img src="${att.dataUrl}" alt="${escapeHtml(att.name)}" />`;
    } else {
      container.innerHTML = `
        <div class="empty-state-icon" style="margin:0 auto;">${iconHtml("paperclip")}</div>
        <p><strong>${escapeHtml(att.name)}</strong></p>
        <p class="muted-text small">Berkas siap diunduh melalui tombol di bawah ini.</p>
      `;
    }

    openModal("modal-attachment");
  }

  function openConfirmDelete(message, onConfirm) {
    document.getElementById("confirm-message").textContent = message;
    const yesBtn = document.getElementById("btn-confirm-yes");
    const cloned = yesBtn.cloneNode(true);
    yesBtn.parentNode.replaceChild(cloned, yesBtn);

    cloned.addEventListener("click", () => {
      onConfirm();
      closeModal("modal-confirm");
    });

    openModal("modal-confirm");
  }

  function renderHelpStep(stepIdx) {
    state.helpStepIndex = Math.max(0, Math.min(HELP_STEPS.length - 1, stepIdx));
    const current = HELP_STEPS[state.helpStepIndex];

    const navEl = document.getElementById("help-steps-nav");
    navEl.innerHTML = HELP_STEPS.map(
      (s, i) =>
        `<button type="button" class="help-step-pill ${i === state.helpStepIndex ? "active" : ""}" data-help-step="${i}">${escapeHtml(
          s.pill
        )}</button>`
    ).join("");

    const stepsListHtml = current.steps
      .map(
        (txt, idx) => `
        <li>
          <span class="step-num-circle">${idx + 1}</span>
          <span>${escapeHtml(txt)}</span>
        </li>
      `
      )
      .join("");

    document.getElementById("help-step-content").innerHTML = `
      <div class="shot-frame">
        <div class="shot-topbar">
          <span class="shot-dot r"></span>
          <span class="shot-dot y"></span>
          <span class="shot-dot g"></span>
          <span class="shot-url">${escapeHtml(current.url)}</span>
        </div>
        <div class="shot-canvas">
          ${current.renderShot()}
        </div>
      </div>

      <div class="help-instructions">
        <h4>${escapeHtml(current.title)}</h4>
        <ul class="help-step-list">${stepsListHtml}</ul>
      </div>
    `;

    document.getElementById("help-step-counter").textContent = `Langkah ${state.helpStepIndex + 1} dari ${HELP_STEPS.length}`;
    document.getElementById("btn-help-prev").disabled = state.helpStepIndex === 0;
    document.getElementById("btn-help-next").innerHTML =
      state.helpStepIndex === HELP_STEPS.length - 1
        ? `<span>Selesai</span><span class="icon-slot">${iconHtml("check")}</span>`
        : `<span>Selanjutnya</span><span class="icon-slot">${iconHtml("chevronRight")}</span>`;
  }

  function playTimerChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.72);
    } catch (e) {
      /* Abaikan jika browser memblokir autoplay audio */
    }
  }

  function updateTimerDisplay() {
    const mins = Math.floor(state.timer.remainingSeconds / 60);
    const secs = state.timer.remainingSeconds % 60;
    document.getElementById("timer-display").textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function setupTimerEvents() {
    document.querySelectorAll(".timer-mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        clearInterval(state.timer.intervalId);
        state.timer.running = false;
        document.querySelectorAll(".timer-mode-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const mins = parseInt(btn.getAttribute("data-minutes"), 10) || 25;
        state.timer.totalSeconds = mins * 60;
        state.timer.remainingSeconds = mins * 60;
        document.getElementById("btn-timer-toggle").innerHTML = `<span class="icon-slot">${iconHtml("play")}</span><span>Mulai</span>`;
        updateTimerDisplay();
      });
    });

    document.getElementById("btn-timer-toggle").addEventListener("click", () => {
      const btn = document.getElementById("btn-timer-toggle");
      if (state.timer.running) {
        clearInterval(state.timer.intervalId);
        state.timer.running = false;
        btn.innerHTML = `<span class="icon-slot">${iconHtml("play")}</span><span>Lanjut</span>`;
      } else {
        state.timer.running = true;
        btn.innerHTML = `<span class="icon-slot">${iconHtml("pause")}</span><span>Jeda</span>`;
        state.timer.intervalId = setInterval(() => {
          if (state.timer.remainingSeconds > 0) {
            state.timer.remainingSeconds -= 1;
            updateTimerDisplay();
          } else {
            clearInterval(state.timer.intervalId);
            state.timer.running = false;
            btn.innerHTML = `<span class="icon-slot">${iconHtml("play")}</span><span>Mulai</span>`;
            playTimerChime();
            showToast("Sesi Focus Timer selesai!", "success");
          }
        }, 1000);
      }
    });

    document.getElementById("btn-timer-reset").addEventListener("click", () => {
      clearInterval(state.timer.intervalId);
      state.timer.running = false;
      state.timer.remainingSeconds = state.timer.totalSeconds;
      document.getElementById("btn-timer-toggle").innerHTML = `<span class="icon-slot">${iconHtml("play")}</span><span>Mulai</span>`;
      updateTimerDisplay();
    });
  }

  /* Render hanya tab yang sedang aktif dalam satu frame agar 0 lag */
  function renderActiveSection() {
    if (!state.currentUser) return;
    switch (state.activeSection) {
      case "dashboard":
        renderDashboard();
        break;
      case "projects":
        renderProjects();
        break;
      case "tasks":
        renderTasks();
        break;
      case "calendar":
        renderCalendar();
        break;
      default:
        renderDashboard();
    }
  }

  function scheduleRender() {
    if (state.rafPending) return;
    state.rafPending = true;
    requestAnimationFrame(() => {
      state.rafPending = false;
      renderActiveSection();
    });
  }

  function setupGlobalEvents() {
    document.getElementById("auth-theme-btn").addEventListener("click", toggleTheme);
    document.getElementById("app-theme-btn").addEventListener("click", toggleTheme);

    document.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        switchSection(btn.getAttribute("data-nav"));
      });
    });

    document.getElementById("dash-add-project").addEventListener("click", () => openProjectModal());
    document.getElementById("btn-new-project").addEventListener("click", () => openProjectModal());
    document.getElementById("dash-add-task").addEventListener("click", () => openTaskModal());
    document.getElementById("btn-new-task").addEventListener("click", () => openTaskModal());

    document.getElementById("form-project").addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("project-id").value;
      const name = document.getElementById("project-name").value.trim();
      const description = document.getElementById("project-desc").value;
      const deadline = document.getElementById("project-deadline").value;
      const status = document.getElementById("project-status").value;

      document.getElementById("err-project-name").textContent = "";
      document.getElementById("err-project-deadline").textContent = "";

      let valid = true;
      if (!name) {
        document.getElementById("err-project-name").textContent = "Nama proyek wajib diisi.";
        valid = false;
      }
      if (!deadline) {
        document.getElementById("err-project-deadline").textContent = "Tanggal deadline wajib dipilih.";
        valid = false;
      }
      if (!valid) return;

      if (id) {
        CRUD.updateProject(id, { name, description, deadline, status });
        showToast("Proyek berhasil diperbarui.", "success");
      } else {
        CRUD.createProject(state.currentUser.id, { name, description, deadline, status });
        showToast("Proyek baru berhasil ditambahkan.", "success");
      }

      closeModal("modal-project");
      scheduleRender();
    });

    document.getElementById("btn-add-subtask").addEventListener("click", () => {
      const input = document.getElementById("subtask-new-input");
      const text = input.value.trim();
      if (!text) return;
      state.modalSubtasks.push({ id: CRUD.generateId("sub"), text, done: false });
      input.value = "";
      renderModalSubtasks();
    });

    document.getElementById("subtask-new-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("btn-add-subtask").click();
      }
    });

    document.getElementById("task-attachment").addEventListener("change", (e) => {
      const file = e.target.files[0];
      const errEl = document.getElementById("err-task-attachment");
      errEl.textContent = "";
      if (!file) return;

      if (file.size > 1.5 * 1024 * 1024) {
        errEl.textContent = "Ukuran file maksimal 1.5 MB agar tersimpan aman di browser.";
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        state.modalAttachment = {
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl: reader.result
        };
        renderModalAttachmentChip();
      };
      reader.readAsDataURL(file);
    });

    document.getElementById("form-task").addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("task-id").value;
      const title = document.getElementById("task-title").value.trim();
      const projectId = document.getElementById("task-project").value;
      const description = document.getElementById("task-desc").value;
      const deadline = document.getElementById("task-deadline").value;
      const status = document.getElementById("task-status").value;
      const priority = document.getElementById("task-priority").value;

      ["err-task-title", "err-task-project", "err-task-deadline"].forEach((errId) => {
        document.getElementById(errId).textContent = "";
      });

      let valid = true;
      if (!title) {
        document.getElementById("err-task-title").textContent = "Judul tugas wajib diisi.";
        valid = false;
      }
      if (!projectId) {
        document.getElementById("err-task-project").textContent = "Pilih proyek terkait.";
        valid = false;
      }
      if (!deadline) {
        document.getElementById("err-task-deadline").textContent = "Tanggal deadline wajib diisi.";
        valid = false;
      }
      if (!valid) return;

      const payload = {
        projectId,
        title,
        description,
        deadline,
        status,
        priority,
        subtasks: state.modalSubtasks,
        attachment: state.modalAttachment
      };

      const saved = id ? CRUD.updateTask(id, payload) : CRUD.createTask(state.currentUser.id, payload);
      if (!saved) {
        showToast("Gagal menyimpan tugas. Ukuran lampiran mungkin melebihi batas penyimpanan.", "error");
        return;
      }

      showToast(id ? "Tugas berhasil diperbarui." : "Tugas baru berhasil ditambahkan.", "success");
      closeModal("modal-task");
      scheduleRender();
    });

    document.getElementById("filter-project-search").addEventListener("input", debounce(renderProjects, 120));
    document.getElementById("filter-project-status").addEventListener("change", renderProjects);

    document.getElementById("filter-task-search").addEventListener("input", debounce(renderTasks, 120));
    ["filter-task-project", "filter-task-status", "filter-task-priority"].forEach((id) => {
      document.getElementById(id).addEventListener("change", renderTasks);
    });

    document.getElementById("btn-reset-filters").addEventListener("click", () => {
      document.getElementById("filter-task-search").value = "";
      document.getElementById("filter-task-project").value = "all";
      document.getElementById("filter-task-status").value = "all";
      document.getElementById("filter-task-priority").value = "all";
      renderTasks();
    });

    document.getElementById("cal-prev-month").addEventListener("click", () => {
      state.calendarDate.setMonth(state.calendarDate.getMonth() - 1);
      renderCalendar();
    });
    document.getElementById("cal-next-month").addEventListener("click", () => {
      state.calendarDate.setMonth(state.calendarDate.getMonth() + 1);
      renderCalendar();
    });
    document.getElementById("cal-today-btn").addEventListener("click", () => {
      state.calendarDate = new Date();
      renderCalendar();
    });

    document.getElementById("btn-open-backup").addEventListener("click", () => openModal("modal-backup"));
    document.getElementById("btn-export-json").addEventListener("click", () => {
      const data = CRUD.exportUserData(state.currentUser.id);
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `taskflow-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("File backup JSON berhasil diunduh.", "success");
    });

    document.getElementById("input-import-json").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          const res = CRUD.importUserData(state.currentUser.id, parsed);
          if (!res.ok) {
            showToast(res.message, "error");
            return;
          }
          showToast(`Berhasil memulihkan ${res.projectsCount} proyek & ${res.tasksCount} tugas.`, "success");
          closeModal("modal-backup");
          scheduleRender();
        } catch (err) {
          showToast("File JSON rusak atau tidak dapat dibaca.", "error");
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    });

    document.getElementById("help-fab").addEventListener("click", () => {
      renderHelpStep(0);
      openModal("modal-help");
    });

    document.getElementById("btn-help-prev").addEventListener("click", () => {
      if (state.helpStepIndex > 0) renderHelpStep(state.helpStepIndex - 1);
    });

    document.getElementById("btn-help-next").addEventListener("click", () => {
      if (state.helpStepIndex < HELP_STEPS.length - 1) {
        renderHelpStep(state.helpStepIndex + 1);
      } else {
        closeModal("modal-help");
      }
    });

    document.addEventListener("click", (e) => {
      const closeBtn = e.target.closest("[data-close-modal]");
      if (closeBtn) {
        closeModal(closeBtn.getAttribute("data-close-modal"));
        return;
      }
      if (e.target.classList.contains("modal-backdrop")) {
        e.target.classList.add("hidden");
        return;
      }

      const checkBtn = e.target.closest("[data-quick-complete]");
      if (checkBtn) {
        const taskId = checkBtn.getAttribute("data-quick-complete");
        const updated = CRUD.toggleTaskComplete(taskId);
        if (updated) {
          showToast(
            updated.status === "Done" ? "Tugas ditandai selesai!" : `Tugas dikembalikan ke ${updated.status}.`,
            updated.status === "Done" ? "success" : "info"
          );
          scheduleRender();
        }
        return;
      }

      const viewProjTasks = e.target.closest("[data-view-project-tasks]");
      if (viewProjTasks) {
        const projId = viewProjTasks.getAttribute("data-view-project-tasks");
        switchSection("tasks");
        syncProjectDropdowns();
        document.getElementById("filter-task-project").value = projId;
        renderTasks();
        return;
      }

      const editProjBtn = e.target.closest("[data-edit-project]");
      if (editProjBtn) {
        openProjectModal(editProjBtn.getAttribute("data-edit-project"));
        return;
      }

      const delProjBtn = e.target.closest("[data-delete-project]");
      if (delProjBtn) {
        const projId = delProjBtn.getAttribute("data-delete-project");
        const proj = CRUD.getProjectById(projId);
        const taskCount = CRUD.getTasksByProject(projId).length;
        openConfirmDelete(
          `Hapus proyek "${proj ? proj.name : ""}"? Tindakan ini juga akan menghapus ${taskCount} tugas di dalamnya.`,
          () => {
            CRUD.deleteProject(projId);
            showToast("Proyek beserta seluruh tugas di dalamnya telah dihapus.", "info");
            scheduleRender();
          }
        );
        return;
      }

      const editTaskBtn = e.target.closest("[data-edit-task]");
      if (editTaskBtn) {
        openTaskModal(editTaskBtn.getAttribute("data-edit-task"));
        return;
      }

      const delTaskBtn = e.target.closest("[data-delete-task]");
      if (delTaskBtn) {
        const taskId = delTaskBtn.getAttribute("data-delete-task");
        const task = CRUD.getTaskById(taskId);
        openConfirmDelete(`Yakin ingin menghapus tugas "${task ? task.title : ""}"?`, () => {
          CRUD.deleteTask(taskId);
          showToast("Tugas berhasil dihapus.", "info");
          scheduleRender();
        });
        return;
      }

      const previewAttBtn = e.target.closest("[data-preview-att]");
      if (previewAttBtn) {
        openAttachmentPreview(previewAttBtn.getAttribute("data-preview-att"));
        return;
      }

      const removeSubBtn = e.target.closest("[data-remove-modal-sub]");
      if (removeSubBtn) {
        const idx = parseInt(removeSubBtn.getAttribute("data-remove-modal-sub"), 10);
        state.modalSubtasks.splice(idx, 1);
        renderModalSubtasks();
        return;
      }

      if (e.target.closest("#btn-remove-attachment")) {
        state.modalAttachment = null;
        document.getElementById("task-attachment").value = "";
        renderModalAttachmentChip();
        return;
      }

      const calAddBtn = e.target.closest("[data-cal-add-date]");
      if (calAddBtn) {
        openTaskModal(null, calAddBtn.getAttribute("data-cal-add-date"));
        return;
      }

      const helpPill = e.target.closest("[data-help-step]");
      if (helpPill) {
        renderHelpStep(parseInt(helpPill.getAttribute("data-help-step"), 10));
      }
    });

    document.addEventListener("change", (e) => {
      if (e.target.matches("[data-toggle-modal-sub]")) {
        const idx = parseInt(e.target.getAttribute("data-toggle-modal-sub"), 10);
        if (state.modalSubtasks[idx]) {
          state.modalSubtasks[idx].done = e.target.checked;
          renderModalSubtasks();
        }
      }

      if (e.target.matches("[data-quick-status]")) {
        const taskId = e.target.getAttribute("data-quick-status");
        const newStatus = e.target.value;
        CRUD.updateTaskStatus(taskId, newStatus);
        showToast(`Status diubah ke ${newStatus}.`, "success");
        scheduleRender();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-backdrop:not(.hidden)").forEach((m) => m.classList.add("hidden"));
      }
      if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
        if (state.currentUser) {
          e.preventDefault();
          switchSection("tasks");
          document.getElementById("filter-task-search").focus();
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    hydrateStaticIcons();
    applyTheme(CRUD.getSavedTheme());
    setupAuthEvents();
    setupTimerEvents();
    setupDragAndDropDelegation();
    setupGlobalEvents();
    checkRouteGuard();
  });
})();
