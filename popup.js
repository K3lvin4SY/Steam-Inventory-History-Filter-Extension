document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("change-color-button");
    button.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "document.getElementById('tag').value" });
      });
    });

    /*const button2 = document.getElementById("clearBtn");
    button2.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "clearFilter" });
      });
    });*/
  });

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