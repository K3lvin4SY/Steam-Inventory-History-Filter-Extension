$J = jQuery.noConflict();
// Extension logic starts here (ONLY FUNCTIONS & CONSTANTS!)
//var invHisTab = document.getElementById("inventory_history_table");
var invHisTab = $J("#inventory_history_table");

function filterWindow() {
  return document.getElementById("steam_Inv_His_Filter_Window");
}



String.prototype.cleanup = function() {
  return this.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");
}

function updateFilterTagCollector(global_search_tag = null, include_only_filtered_rows = true) {
  var tags = [];
  $J("#filter_list_show").children().each(function() {
    var props = {};
    // The following tags are *props* for each row
    // For a row to be shown it has to have all the prop requirements
    var tag;
    props["data-search-tag"] = this.getAttribute("data-search-tag"); // Search for specific text
    props["data-overrule-tag"] = this.getAttribute("data-overrule-tag"); // shows everything
    
    tag = $J(this).data("data-main-tag");
    if (tag != null) {
      tag = tag.cleanup()
    }
    props["data-main-tag"] = tag; // Search for type of event (description of row)

    tag = $J(this).data("data-item-name-tag");
    if (tag != null) {
      tag = tag.cleanup()
    }
    props["data-item-name-tag"] = tag; // Search for a specific item
    
    tag = $J(this).data("data-item-quality-tag");
    if (tag != null) {
      tag = tag.cleanup()
    }
    props["data-item-quality-tag"] = tag; // Search for all StatTrak, normal, knifes items, etc
    
    tag = $J(this).data("data-item-type-tag");
    if (tag != null) {
      tag = tag.cleanup()
    }
    props["data-item-type-tag"] = tag; // Search for specific item type ex: stickers, cases
    
    tag = $J(this).data("data-item-collection-tag");
    if (tag != null) {
      tag = tag.cleanup()
    }
    props["data-item-collection-tag"] = tag; // Search for item in a specific collection
    
    tag = $J(this).data("data-item-rarity-tag");
    if (tag != null) {
      tag = tag.cleanup()
    }
    props["data-item-rarity-tag"] = tag; // Search for specific item quality ex: Covert
    
    tag = $J(this).data("data-item-exterior-tag");
    if (tag != null) {
      tag = tag.cleanup()
    }
    props["data-item-exterior-tag"] = tag; // Search for specific item exterior ex: Minimal-Wear
    
    tags.push(props);
  });
  if (global_search_tag != null) { // fix so that you can search with a filter on (search needs to overide (algorithm needs to check if row also fills search data requirements))
    //tags.push(search_tag); // + needs to fix so that search is non case sensetive or add a option to disable/enable it
  }
  filterListPrep(tags, global_search_tag, include_only_filtered_rows);
}

function findTag(item, tag, prop) {
  //console.log(item);
  //console.log(prop);
  //console.log(item.text());

  //console.log($J(this).text());
  if (prop == "data-search-tag") {
    if (item.text().toLowerCase().includes(tag.toLowerCase())) {
      // passed
      return true;
    }
  } else if (prop == "data-item-name-tag") {
    if (item.data("item-name").cleanup().includes(tag)) {
      // passed
      return true;
    }
    /*if (item.text().cleanup().includes(tag)) {
      // passed
      return true;
    }*/
  } else if (prop == "data-item-quality-tag") {
    if (item.data("item-quality").cleanup().includes(tag)) {
      // passed
      return true;
    }
  } else if (prop == "data-item-type-tag") {
    if (item.data("item-type").cleanup().includes(tag)) {
      // passed
      return true;
    }
  } else if (prop == "data-item-collection-tag") {
    if (item.data("item-collection").cleanup().includes(tag)) {
      // passed
      return true;
    }
  } else if (prop == "data-item-rarity-tag") {
    if (item.data("item-rarity").cleanup().includes(tag)) {
      // passed
      return true;
    }
  } else if (prop == "data-item-exterior-tag") {
    if (item.data("item-exterior").cleanup().includes(tag)) {
      // passed
      return true;
    }
  }
  return false; // any item with tag does not exist in row
}

function filterListTagInItems(items, tag, prop) {
  //console.log(items);
  for (let i = 0; i < items.length; i++) {
    //console.log("-----------------------------------");
    //console.log(items.eq(i));
    //console.log(tag);
    const passed = findTag(items.eq(i), tag, prop);
    if (passed) {
      // break out of the outer loop & found an item with the aquired requirments
      //console.log("true");
      return true; // item with tags is in items
    }
  }
  //console.log("false");
  return false;
}

function filterListActionV2(tags, global_search_tag, include_only_filtered_rows) {
  
  invHisTab.children().each(function() {
    var event_container = $J(this).find('.tradehistory_content').eq(0);
    var event_desc = $J(this).find('.tradehistory_event_description').eq(0);
    var items = $J(this).find('.history_item_name');
    //console.log(items);
    
    // Check Tags
    var passedAllChecks = false;
    for (let i = 0; i < tags.length; i++) {
      const props = tags[i];
      var tagsPassed = 0
      var tagsToPass = 0
      var global_search_override = false;
      var show_all_override = false;
      if (global_search_tag != null) { // if there is a global search tag
        tagsToPass++;
        if (event_container.text().toLowerCase().includes(global_search_tag.toLowerCase())) {
          global_search_override = !include_only_filtered_rows;
          tagsPassed++;
        }
      }
      for (const [prop, tag] of Object.entries(props)) {
        if (tag == null) {
          continue;
        } else {
          tagsToPass++;
        }

        if (prop == "data-overrule-tag") {
          if (tag == "everything") {
            show_all_override = true;
          }
        }

        if (prop == "data-main-tag") {
          if (event_desc.text().cleanup().includes(tag)) {
            // passed
            tagsPassed++;

            // end of loop iteration
          }
        } else if ( ["data-search-tag", "data-item-name-tag", "data-item-quality-tag", "data-item-type-tag", "data-item-collection-tag", "data-item-rarity-tag", "data-item-exterior-tag"].includes(prop) ) {
          //console.log(event_desc);
          //console.log(prop);
          //console.log(tag);
          if (prop == "data-search-tag" && event_desc.text().includes(tag)) { // if tag is in row desc
            tagsPassed++;
            //console.log("num1");
          } else if (prop != "data-search-tag" && event_desc.text().cleanup().includes(tag)) {
            tagsPassed++;
            //console.log("num2");
          } else if (filterListTagInItems(items, tag, prop)) {
            tagsPassed++;
            //console.log("num3");
          }
        }

      }
      //console.log(tagsPassed);
      //console.log(tagsToPass);
      if (tagsPassed == tagsToPass || global_search_override || show_all_override) {
        //console.log("==");
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

  //$J("#steam_filter_Options").removeClass("steam_filter_hide_class"); - only if window was open before
  $J("#steam_filter_loading_screen").addClass("steam_filter_hide_class");
}



function updateFilter() {
  var tags = [];
  $J("#filter_list_show").children().each(function() {
    tags.push(this.getAttribute("data-main-tag").cleanup());
  });
  //filterListPrep(tags);
}

function filterListPrep(tags, global_search_tag, include_only_filtered_rows) {
  //console.log(tags);
  if (invHisTab.children.length > 2500) {
    $J("#steam_filter_loading_screen").removeClass("steam_filter_hide_class");
    $J("#steam_filter_Options").addClass("steam_filter_hide_class");
  }
  //setTimeout(filterListAction, 0, tags);
  setTimeout(filterListActionV2, 0, tags, global_search_tag, include_only_filtered_rows);
}

function filterListAction(tags) {
  Array.from(invHisTab.children).forEach(child => {
    var content = child.querySelector('.tradehistory_content');
    var desc = content.querySelector('.tradehistory_event_description');
    //console.log(desc.innerHTML);
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
