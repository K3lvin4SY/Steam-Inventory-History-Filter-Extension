var sessionID;
var cursurHistory;

// Applies Html and hooks onto script
async function addFilterOptions() {
  const resp = await fetch(chrome.runtime.getURL('./components/filterWindow.html'));
  const html = await resp.text();
  const contentDiv = document.getElementById("BG_bottom");
  contentDiv.insertAdjacentHTML("beforebegin", html);

    
  createButtonLinks();

  console.log(document.cookie);

  //init('src/lib/page_scripts/backgound.js', main);

  async function main() {
      console.log("failed??");
  }
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
cursurHistory = Math.floor(Date.now() / 1000);

addFilterOptions();

/*document.addEventListener('DOMContentLoaded', function() {
    var checkButton = document.getElementById('check');
    checkButton.addEventListener('click', function() {
        alert("Hey your button is working!");
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { type: "change-color" });
        });
    }, false);
}, false);*/

/*
//document.body.style.backgroundColor = "yellow";
var button = document.createElement("a");
//var link = document.createElement("a");
button.textContent = 'Multisell Page';
button.onclick = openMultiSellPage;

button.style.color = "white";
button.style.marginTop = "20px";
button.style.padding = "4px 4px 4px 4px";
button.style.position = "absolute";
button.style.fontSize = "1.25em";
button.style.borderWidth = "1px";
button.style.borderStyle = "solid";
button.style.borderRadius = "5px";


document.getElementById("inventory_history_table").appendChild(button);

function openMultiSellPage() {
    const { host, hostname, href, origin, pathname, port, protocol, search } = window.location
    window.open("https://steamcommunity.com/market/multisell?appid=730&contextid=2&items%5B%5D="+pathname.split("/")[4]);
}*/