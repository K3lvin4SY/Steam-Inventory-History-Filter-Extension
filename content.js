var invHisTab = document.getElementById("inventory_history_table");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.type);
  if (request.type == "clearFilter") {
    clearFilter();
  } else {
    console.log(request.type);
    //removeRow(request.type);
  }
});


function removeRow(type) {
  Array.from(invHisTab.children).forEach(child => {
    var content = child.querySelector('.tradehistory_content');
    var desc = content.querySelector('.tradehistory_event_description');
    if (desc.innerHTML.includes(type)) {
      child.style.display = "none";
    }
  });
}

function clearFilter() {
  Array.from(invHisTab.children).forEach(child => {
      child.style.display = "block";
  });
}
