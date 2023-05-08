var sessionID;
var cursurHistory;
var g_rgAppContextData = [];
var continueLOading = true;
var loadedAllHistory = false;

var gameData = {
  containerUnlocks: {
    case: [],
    capsule: [],
    package: []
  },
  gameDrops: {
    case: [],
    skin: [],
    graffiti: []
  }
};

var languageOption = {
  sel: {
    case: "Case",
    package: "Package",
    capsule: "Capsule",
    uac: "Unlocked a container",
    container: "Container",
    gaid: "Got an item drop",
    eanragad: "Earned a new rank and got a drop",
    graffiti: "Graffiti",
    messages: {
      invalidMonth: "Invalid month number. Month number must be between 1 and 12.",
      historyErrorTitle: "History Loading error",
      historyErrorDesc: "You have already loaded all your history",
      close: "CLOSE",
      historyLoadingStopped: "The history loading have stopped.",
      historyLoadingDone: "All the history data has been loaded.",
      timerText: {
        pre: "Taking a ",
        post: " sec break due to making too many requests..."
      },
      loadingInProgressText: "Please wait while all the history is being loaded...",
      timerAltText: "Taking a small break due to making too many requests...",
      ok: "OK",
      error: "Error",
      stop: "STOP",
      steamServiceUnavailable: "Steam service is currenty unavailable.",
      otherErrorMessage: "There was a problem loading your inventory history.",
      loadingHistory: "Loading History"
    }
  },
  en: {
    case: "Case",
    package: "Package",
    capsule: "Capsule",
    uac: "Unlocked a container",
    container: "Container",
    gaid: "Got an item drop",
    eanragad: "Earned a new rank and got a drop",
    graffiti: "Graffiti",
    messages: {
      invalidMonth: "Invalid month number. Month number must be between 1 and 12.",
      historyErrorTitle: "History Loading error",
      historyErrorDesc: "You have already loaded all your history",
      close: "CLOSE",
      historyLoadingStopped: "The history loading have stopped.",
      historyLoadingDone: "All the history data has been loaded.",
      timerText: {
        pre: "Taking a ",
        post: " sec break due to making too many requests..."
      },
      loadingInProgressText: "Please wait while all the history is being loaded...",
      timerAltText: "Taking a small break due to making too many requests...",
      ok: "OK",
      error: "Error",
      stop: "STOP",
      steamServiceUnavailable: "Steam service is currenty unavailable.",
      otherErrorMessage: "There was a problem loading your inventory history.",
      loadingHistory: "Loading History"
    }
  }
}

// Applies Html and hooks onto script
async function addFilterOptions() {
  const resp = await fetch(chrome.runtime.getURL('./components/filterWindow.html'));
  const html = await resp.text();
  const contentDiv = document.getElementById("BG_bottom");
  contentDiv.insertAdjacentHTML("beforebegin", html);

    
  createButtonLinks();

  loadChartsNDiagrams();
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