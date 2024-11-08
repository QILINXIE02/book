document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", toggleTheme);

  // Load default chapter if exists
  loadChapter(localStorage.getItem("lastChapter") || "chapter1");
});

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  document.getElementById("sidebar").classList.toggle("dark-mode");
  const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", theme);
}

function loadChapter(chapterId) {
  const contentDiv = document.getElementById("reader");
  fetch(`chapters/${chapterId}.html`)
    .then((response) => response.text())
    .then((data) => {
      contentDiv.innerHTML = data;
      updateProgress();
      localStorage.setItem("lastChapter", chapterId);
    });
}

function increaseFontSize() {
  const reader = document.getElementById("reader");
  const currentSize = parseFloat(getComputedStyle(reader).fontSize);
  reader.style.fontSize = `${currentSize + 1}px`;
}

function decreaseFontSize() {
  const reader = document.getElementById("reader");
  const currentSize = parseFloat(getComputedStyle(reader).fontSize);
  reader.style.fontSize = `${Math.max(currentSize - 1, 12)}px`;
}

function updateProgress() {
  const progress = document.getElementById("progress");
  const content = document.getElementById("reader");
  const height = content.scrollHeight - content.clientHeight;
  content.addEventListener("scroll", () => {
    progress.value = (content.scrollTop / height) * 100;
  });
}
