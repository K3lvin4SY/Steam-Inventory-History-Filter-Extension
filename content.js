// Extension logic starts here (ONLY FUNCTIONS & CONSTANTS!)
var invHisTab = document.getElementById("inventory_history_table");

function filterWindow() {
  return document.getElementById("steam_Inv_His_Filter_Window");
}

function InventoryHistory_LoadMore() {
  $('#InventoryHistory_LoadMore_Access').trigger( "click" );
}

function recieveCommand(command) {
  console.log(command);
  if (command == "clearFilter") {
    clearFilter();
  } else {
    var remkeep = (command.split('@')[1] == "true");
    var tag = command.split('@')[0]
    removeRow(tag, remkeep);
  }
}

function updateFilter() {
  var tags = [];
  $("#filter_list_show").children().each(function() {
    console.log(this.getAttribute("data-tag"));
    //console.log(this.attr("data-tag"));
    tags.push(this.getAttribute("data-tag").cleanup());
  });
  filterList(tags);
}

String.prototype.cleanup = function() {
  return this.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");
}


function filterList(tags) {
  Array.from(invHisTab.children).forEach(child => {
    var content = child.querySelector('.tradehistory_content');
    var desc = content.querySelector('.tradehistory_event_description');
    console.log(desc.innerHTML);
    if (tags.includes(desc.innerHTML.cleanup())) {
      child.style.display = "block";
    } else {
      child.style.display = "none";
    }
  });
}

function removeRow(type, remkeep) {
  Array.from(invHisTab.children).forEach(child => {
    var content = child.querySelector('.tradehistory_content');
    var desc = content.querySelector('.tradehistory_event_description');
    if (desc.innerHTML.includes(type)) {
      if (remkeep) {
        child.style.display = "none";
      } else {
        child.style.display = "block";
      }
    } else {
      if (remkeep) {
        //child.style.display = "block"; // this blocks multiple tag remove
      } else {
        child.style.display = "none";
      }
    }
  });
}

function clearFilter() {
  Array.from(invHisTab.children).forEach(child => {
      child.style.display = "block";
  });
}
