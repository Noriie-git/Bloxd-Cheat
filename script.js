// A unique namespace for your website's database
// I used your GitHub username from the image URL to keep it unique
const NAMESPACE = 'bloxd_cheats_noriie';

// 1. Existing Notice Function (Kept intact)
function showNotice(message) {
  const notice = document.getElementById("notice");
  notice.textContent = message;
  notice.classList.add("show");

  clearTimeout(window.noticeTimer);
  window.noticeTimer = setTimeout(() => {
    notice.classList.remove("show");
  }, 3000);
}

// 2. Fetch the current download counts when the page loads
async function loadCounts() {
  try {
    // Get Fallen count
    let resFallen = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/fallen`);
    if (resFallen.ok) {
      let dataFallen = await resFallen.json();
      document.getElementById('count-fallen').innerText = dataFallen.count;
    }

    // Get Shitizen count
    let resShitizen = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/shitizen`);
    if (resShitizen.ok) {
      let dataShitizen = await resShitizen.json();
      document.getElementById('count-shitizen').innerText = dataShitizen.count;
    }
  } catch (error) {
    console.error("Error loading counts:", error);
  }
}

// 3. Increment the counter when a user clicks download
async function incrementDownload(clientName) {
  // Show the cool bottom notice you styled in CSS!
  showNotice(`Starting download for ${clientName}...`);

  try {
    // Tell the API to add +1 to the count
    let res = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${clientName}/up`);
    if (res.ok) {
      let data = await res.json();
      
      // Update the number visually on the webpage immediately
      document.getElementById(`count-${clientName}`).innerText = data.count;
    }
  } catch (error) {
    console.error("Error updating count:", error);
  }
}

// Run the load function automatically when the page opens
window.onload = loadCounts;
