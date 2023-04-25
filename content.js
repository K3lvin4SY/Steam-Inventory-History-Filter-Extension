$J = jQuery.noConflict();
// Extension logic starts here (ONLY FUNCTIONS & CONSTANTS!)
var invHisTab = document.getElementById("inventory_history_table");

function filterWindow() {
  return document.getElementById("steam_Inv_His_Filter_Window");
}

function InventoryHistory_LoadMore() {
  $J('#InventoryHistory_LoadMore_Access').trigger( "click" );
}





String.prototype.cleanup = function() {
  return this.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");
}



function updateFilterTagCollector() {
  var tags = [];
  $J("#filter_list_show").children().each(function() {
    var props = {};
    // The following tags are *props* for each row
    // For a row to be shown it has to have all the prop requirements
    props["data-search-tag"] = this.getAttribute("data-search-tag"); // Search for specific text
    props["data-main-tag"] = this.getAttribute("data-main-tag").cleanup(); // Search for type of event (description of row)
    props["data-item-name-tag"] = this.getAttribute("data-item-name-tag").cleanup(); // Search for a specific item
    props["data-item-category-tag"] = this.getAttribute("data-item-category-tag").cleanup(); // Search for all StatTrak, normal, knifes items, etc
    props["data-item-type-tag"] = this.getAttribute("data-item-type-tag").cleanup(); // Search for specific item type ex: stickers, cases
    props["data-item-collection-tag"] = this.getAttribute("data-item-collection-tag").cleanup(); // Search for item in a specific collection
    props["data-item-quality-tag"] = this.getAttribute("data-item-quality-tag").cleanup(); // Search for specific item quality ex: Covert
    props["data-item-exterior-tag"] = this.getAttribute("data-item-exterior-tag").cleanup(); // Search for specific item exterior ex: Minimal-Wear
    tags.push(props);
  });
  filterListPrep(tags);
}

function filterListActionV2(tags) {
  Array.from(invHisTab.children).forEach(child => {
    var content_container = $J(child).find('.tradehistory_content');
    var event_desc = $J(child).find('.tradehistory_event_description');
    var items = { "-": null, "+": null };
    $J(child).find('.tradehistory_items_plusminus').each(() => {
      if ($J(this).innerHTML == "-") {
        items["-"] = $J(this).next(".tradehistory_items_group");
      } else {
        items["+"] = $J(this).next(".tradehistory_items_group");
      }
    });
    
    // Check Tags
    var passedAllChecks = false;
    for (let i = 0; i < tags.length; i++) {
      const props = tags[i];
      var tagsPassed = 0
      var tagsToPass = 0
      for (const [prop, tag] of Object.entries(props)) {
        if (tag == null) {
          continue;
        } else {
          tagsToPass++;
        }

        if (prop == "data-main-tag") {
          if (event_desc.innerHTML.cleanup().includes(tag)) {
            // passed
            tagsPassed++;
          }
        } else if (prop == "data-search-tag") {
          if (event_desc.innerHTML.includes(tag)) {
            
          } else if (() => {
            for (const [port, items] of Object.entries(items)) {
              $J(items).find(".history_item_name").each(() => {
                if ($J(this).innerHTML.cleanup().includes(tag)) {
                  // passed
                  tagsPassed++;
                  break;
                }
                
              })
            }
          }) {

          }
        } else if (prop == "data-item-name-tag") {

        } else if (prop == "data-item-category-tag") {

        } else if (prop == "data-item-type-tag") {

        } else if (prop == "data-item-collection-tag") {

        } else if (prop == "data-item-quality-tag") {

        } else if (prop == "data-item-exterior-tag") {

        }

      }
      if (tagsPassed == tagsToPass) {
        // Total pass
        break;
      }
    };
    if (passedAllChecks) {
      child.style.display = "block";
    } else {
      child.style.display = "none";
    }
  });

  $J("#steam_filter_Options").removeClass("steam_filter_hide_class");
  $J("#steam_filter_loading_screen").addClass("steam_filter_hide_class");
}



function updateFilter() {
  var tags = [];
  $J("#filter_list_show").children().each(function() {
    tags.push(this.getAttribute("data-main-tag").cleanup());
  });
  //filterListPrep(tags);
}

function filterListPrep(tags) {
  console.log(tags);
  if (invHisTab.children.length > 2500) {
    $J("#steam_filter_loading_screen").removeClass("steam_filter_hide_class");
    $J("#steam_filter_Options").addClass("steam_filter_hide_class");
  }
  //setTimeout(filterListAction, 0, tags);
}

function filterListAction(tags) {
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
  $J("#steam_filter_Options").removeClass("steam_filter_hide_class");
  $J("#steam_filter_loading_screen").addClass("steam_filter_hide_class");
}





























// OLD FUNCTIONS
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
