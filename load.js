var sessionID;
var cursurHistory;
var g_rgAppContextData = [];
var continueLOading = true;

// Applies Html and hooks onto script
async function addFilterOptions() {
  const resp = await fetch(chrome.runtime.getURL('./components/filterWindow.html'));
  const html = await resp.text();
  const contentDiv = document.getElementById("BG_bottom");
  contentDiv.insertAdjacentHTML("beforebegin", html);

    
  createButtonLinks();

  console.log(document.cookie);
}

const cookies = document.cookie.split("; ")
for (let index = 0; index < cookies.length; index++) {
  const key = cookies[index].split("=")[0];
  const value = cookies[index].split("=")[1];
  if (key == "sessionid") {
    sessionID = value;
  }
}   
var loadAllAmount = 0;
var loadPartial = 0;
cursurHistory = Math.floor(Date.now() / 1000);

addFilterOptions();