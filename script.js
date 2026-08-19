function showNotice(message) {
  const notice = document.getElementById("notice");
  notice.textContent = message;
  notice.classList.add("show");

  clearTimeout(window.noticeTimer);
  window.noticeTimer = setTimeout(() => {
    notice.classList.remove("show");
  }, 3000);
}
