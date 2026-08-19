const NAMESPACE = 'bloxd-cheat-noriie';

function showNotice(message) {
  const notice = document.getElementById("notice");
  notice.textContent = message;
  notice.classList.add("show");

  clearTimeout(window.noticeTimer);
  window.noticeTimer = setTimeout(() => {
    notice.classList.remove("show");
  }, 3000);
}

async function fetchCounts() {
  const clients = ['fallen', 'shitizen'];
  for (const client of clients) {
    try {
      const response = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${client}`);
      const data = await response.json();
      if (data && data.count !== undefined) {
        document.getElementById(`count-${client}`).textContent = data.count;
      }
    } catch (error) {
      document.getElementById(`count-${client}`).textContent = '0';
    }
  }
}

async function incrementDownload(client) {
  const clientName = client.charAt(0).toUpperCase() + client.slice(1);
  showNotice(`Downloading ${clientName} Client...`);

  try {
    const response = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${client}/up`);
    const data = await response.json();
    if (data && data.count !== undefined) {
      document.getElementById(`count-${client}`).textContent = data.count;
    }
  } catch (error) {
    console.error('Error updating download count:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchCounts);
