$J = jQuery.noConflict();
// Extension logic starts here (ONLY FUNCTIONS & CONSTANTS!)
var invHisTab = document.getElementById("inventory_history_table");
var invHisTab = $J("#inventory_history_table");

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
    var tag;
    props["data-search-tag"] = this.getAttribute("data-search-tag"); // Search for specific text
    
    tag = this.getAttribute("data-main-tag");
    if (tag != null) {
      tag = tag.cleanup()
    }
    props["data-main-tag"] = tag; // Search for type of event (description of row)
    
    tag = this.getAttribute("data-item-name-tag");
    if (tag != null) {
      tag = tag.cleanup()
    }
    props["data-item-name-tag"] = tag; // Search for a specific item
    
    tag = this.getAttribute("data-item-category-tag");
    if (tag != null) {
      tag = tag.cleanup()
    }
    props["data-item-category-tag"] = tag; // Search for all StatTrak, normal, knifes items, etc
    
    tag = this.getAttribute("data-item-type-tag");
    if (tag != null) {
      tag = tag.cleanup()
    }
    props["data-item-type-tag"] = tag; // Search for specific item type ex: stickers, cases
    
    tag = this.getAttribute("data-item-collection-tag");
    if (tag != null) {
      tag = tag.cleanup()
    }
    props["data-item-collection-tag"] = tag; // Search for item in a specific collection
    
    tag = this.getAttribute("data-item-quality-tag");
    if (tag != null) {
      tag = tag.cleanup()
    }
    props["data-item-quality-tag"] = tag; // Search for specific item quality ex: Covert
    
    tag = this.getAttribute("data-item-exterior-tag");
    if (tag != null) {
      tag = tag.cleanup()
    }
    props["data-item-exterior-tag"] = tag; // Search for specific item exterior ex: Minimal-Wear
    
    tags.push(props);
  });
  filterListPrep(tags);
}

function findTag(items_group, tag) {
  $J(items_group).find(".history_item_name").each(() => {

    console.log($J(this).innerHTML);
    if (prop == "data-search-tag") {
      if ($J(this).innerHTML.includes(tag)) {
        // passed
        return true;
      }
    } else if (prop == "data-item-name-tag") {
      if ($J(this).innerHTML.cleanup().includes(tag)) {
        // passed
        return true;
      }
    } else if (prop == "data-item-category-tag") {
      if ($J(this).innerHTML.cleanup().includes(tag)) {
        // passed
        return true;
      }
    } else if (prop == "data-item-type-tag") {
      if ($J(this).innerHTML.cleanup().includes(tag)) {
        // passed
        return true;
      }
    } else if (prop == "data-item-collection-tag") {
      // later (need more data)
    } else if (prop == "data-item-quality-tag") {
      // later (need more data) + need to fix game tooltip??
    } else if (prop == "data-item-exterior-tag") {
      // later (need more data)
    }
    
  });
  return false; // any item with tag does not exist in row
}

function filterListActionV2(tags) {
  
  invHisTab.children().each(() => {
    var content_container = $J(this).find('.tradehistory_content');
    var event_desc = $J(this).find('.tradehistory_event_description')[0];
    var items = { "-": null, "+": null };
    console.log($J(this).find('.tradehistory_items_plusminus'));
    $J(this).find('.tradehistory_items_plusminus').each(() => {
      console.log($J(this).innerHTML);
      if ($J(this).innerHTML == "-") {
        items["-"] = $J(this).siblings(".tradehistory_items_group")[0];
      } else {
        items["+"] = $J(this).siblings(".tradehistory_items_group")[0];
        console.log($J(this).siblings(".tradehistory_items_group")[0]);
      }
    });
    console.log(items);
    
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
        } else if ( ["data-search-tag", "data-item-name-tag", "data-item-category-tag", "data-item-type-tag", "data-item-collection-tag", "data-item-quality-tag", "data-item-exterior-tag"].includes(prop) ) {
          console.log(event_desc);
          console.log(prop);
          console.log(tag);
          for (const [port, items_group] of Object.entries(items)) {
            console.log(items[port]);
          }
          if (event_desc.innerHTML.includes(tag)) { // if tag is in row desc
            
          } else if (() => { // if tag is in any item
            for (const [port, items_group] of Object.entries(items)) {
              const passed = findTag(items_group, tag);
              if (passed) {
                // break out of the outer loop & found an item with the aquired requirments
                return true; // item with tags is in items
                break;
              } else {
                return false;
              }
            }
          }) {
            tagsPassed++;
          }
        }

      }
      console.log(tagsPassed);
      console.log(tagsToPass);
      if (tagsPassed == tagsToPass) {
        console.log("==");
        // Total pass
        passedAllChecks = true;
        break;
      }
    };
    if (passedAllChecks) {
      $J(this).css("display", "block")
    } else {
      $J(this).css("display", "none")
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
  setTimeout(filterListActionV2, 0, tags);
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
