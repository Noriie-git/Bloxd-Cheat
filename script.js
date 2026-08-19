const FALLEN_KEY = 'bloxd_cheats_noriie_fallen_v1';
const SHITIZEN_KEY = 'bloxd_cheats_noriie_shitizen_v1';

function showNotice(message) {
  const notice = document.getElementById("notice");
  notice.textContent = message;
  notice.classList.add("show");

  clearTimeout(window.noticeTimer);
  window.noticeTimer = setTimeout(() => {
    notice.classList.remove("show");
  }, 3000);
}

async function loadCounts() {
  try {
    let resFallen = await fetch(`https://countapi.mileshilliard.com/api/v1/get/${FALLEN_KEY}`);
    if (resFallen.ok) {
      let dataFallen = await resFallen.json();
      document.getElementById('count-fallen').innerText = dataFallen.value;
    } else {
      document.getElementById('count-fallen').innerText = "0";
    }

    let resShitizen = await fetch(`https://countapi.mileshilliard.com/api/v1/get/${SHITIZEN_KEY}`);
    if (resShitizen.ok) {
      let dataShitizen = await resShitizen.json();
      document.getElementById('count-shitizen').innerText = dataShitizen.value;
    } else {
      document.getElementById('count-shitizen').innerText = "0";
    }
  } catch (error) {
    console.error(error);
  }
}

async function incrementDownload(clientName) {
  showNotice(`Đang tải xuống ${clientName}...`);
  const key = clientName === 'fallen' ? FALLEN_KEY : SHITIZEN_KEY;

  try {
    let res = await fetch(`https://countapi.mileshilliard.com/api/v1/hit/${key}`);
    if (res.ok) {
      let data = await res.json();
      document.getElementById(`count-${clientName}`).innerText = data.value;
    }
  } catch (error) {
    console.error(error);
  }
}

window.onload = loadCounts;
