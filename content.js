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

Array.prototype.cleanup = function() {
  //console.log(this);
  var newArray = [];
  for (let index = 0; index < this.length; index++) {
    const element = this[index];
    newArray.push(element.cleanup());
  }
  return newArray;
}

function updateFilterTagCollector(global_search_tag = null, include_only_filtered_rows = true) {
  var tags = [];
  $J("#filter_list_show").children().each(function() {
    var props = {};
    // The following tags are *props* for each row
    // For a row to be shown it has to have all the prop requirements
    props["data-search-tag"] = this.getAttribute("data-search-tag"); // Search for specific text
    props["data-overrule-tag"] = this.getAttribute("data-overrule-tag"); // shows everything
    
    var tag1 = $J(this).data("data-main-tag");
    if (tag1 != null) {
      tag1 = tag1.cleanup()
    }
    props["data-main-tag"] = tag1; // Search for type of event (description of row)

    var tag2 = $J(this).data("data-item-name-tag");
    //console.log(tag2);
    if (tag2 != null) {
      tag2 = tag2.cleanup()
    }
    //console.log(tag2);
    props["data-item-name-tag"] = tag2; // Search for a specific item
    //console.log(props);

    var tag3 = $J(this).data("data-item-quality-tag");
    if (tag3 != null) {
      tag3 = tag3.cleanup()
    }
    props["data-item-quality-tag"] = tag3; // Search for all StatTrak, normal, knifes items, etc
    
    var tag4 = $J(this).data("data-item-type-tag");
    if (tag4 != null) {
      tag4 = tag4.cleanup()
    }
    props["data-item-type-tag"] = tag4; // Search for specific item type ex: stickers, cases
    
    var tag5 = $J(this).data("data-item-collection-tag");
    if (tag5 != null) {
      tag5 = tag5.cleanup()
    }
    props["data-item-collection-tag"] = tag5; // Search for item in a specific collection
    
    var tag6 = $J(this).data("data-item-rarity-tag");
    if (tag6 != null) {
      tag6 = tag6.cleanup()
    }
    props["data-item-rarity-tag"] = tag6; // Search for specific item quality ex: Covert
    
    var tag7 = $J(this).data("data-item-exterior-tag");
    if (tag7 != null) {
      tag7 = tag7.cleanup()
    }
    props["data-item-exterior-tag"] = tag7; // Search for specific item exterior ex: Minimal-Wear
    
    //console.log(props);
    tags.push(props);
  });
  if (global_search_tag != null) { // fix so that you can search with a filter on (search needs to overide (algorithm needs to check if row also fills search data requirements))
    //tags.push(search_tag); // + needs to fix so that search is non case sensetive or add a option to disable/enable it
  }
  //console.log(tags);
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
    //console.log(item);
    //console.log(item.data());
    if (typeof tag === 'string') {
      if (item.data("item-internal-name").cleanup().includes(tag)) {
        // passed
        return true;
      }
    } else if (Array.isArray(tag)) {
      for (let index = 0; index < tag.length; index++) {
        const innerTag = tag[index];
        if (item.data("item-internal-name").cleanup().includes(innerTag)) {
          // passed
          return true;
        }
      }
    } else {
      console.log("ERROR - sum ting wong");
    }
    /*if (item.text().cleanup().includes(tag)) {
      // passed
      return true;
    }*/
  } else if (prop == "data-item-quality-tag") {
    if (item.data("item-quality").internal_name.cleanup().includes(tag)) {
      // passed
      return true;
    }
  } else if (prop == "data-item-type-tag") {
    if (item.data("item-type").internal_name.cleanup().includes(tag)) {
      // passed
      return true;
    }
  } else if (prop == "data-item-collection-tag") {
    if (item.data("item-collection").internal_name.cleanup().includes(tag)) {
      // passed
      return true;
    }
  } else if (prop == "data-item-rarity-tag") {
    if (item.data("item-rarity").internal_name.cleanup().includes(tag)) {
      // passed
      return true;
    }
  } else if (prop == "data-item-exterior-tag") {
    if (item.data("item-exterior").internal_name.cleanup().includes(tag)) {
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
    if (items.eq(i).data("appid") != 730) {
      return false;
    }
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
  var rowsVisable = 0;
  //console.log(tags);
  invHisTab.children().each(function() {
    var event_container = $J(this).find('.tradehistory_content').eq(0);
    var event_desc = $J(this).find('.tradehistory_event_description').eq(0);
    var items = $J(this).find('.history_item_name');
    //console.log(items);
    
    // Check Tags
    var passedAllChecks = false;
    for (let i = 0; i < tags.length; i++) {
      const props = tags[i];
      var searchPassed = false;
      var tagsPassed = 0
      var tagsToPass = 0
      var global_search_override = false;
      var show_all_override = false;
      if (global_search_tag != null) { // if there is a global search tag
        tagsToPass++;
        if (event_container.text().toLowerCase().includes(global_search_tag.toLowerCase())) {
          global_search_override = !include_only_filtered_rows;
          tagsPassed++;
          searchPassed = true;
        }
      }
      //console.log(props);
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
            console.log("num0");

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
      if (tagsPassed == tagsToPass || global_search_override || (show_all_override && ( (global_search_tag != null) == (searchPassed))) ) {
        //console.log("==");
        // Total pass
        passedAllChecks = true;
        break;
      }
    };
    if (passedAllChecks) {
      $J(this).css("display", "block")
      rowsVisable++;
    } else {
      $J(this).css("display", "none")
    }
  });

  $J('#inventory_history_count').text(rowsVisable+"");
  //$J("#steam_filter_Options").show(); - only if window was open before
  $J("#steam_filter_loading_screen").hide();
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
    $J("#steam_filter_loading_screen").show();
    $J("#steam_filter_Options").hide();
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
  $J("#steam_filter_Options").show();
  $J("#steam_filter_loading_screen").hide();
}

/*function ChangeLanguage( strTargetLanguage, bStayOnPage )
{
	var Modal = ShowBlockingWaitDialog( 'Change language', '' );
	$J.post( 'https://steamcommunity.com/actions/SetLanguage/', {language: strTargetLanguage, sessionid: sessionID })
		.done( function() {
			if ( bStayOnPage )
				Modal.Dismiss();
			else
			{
								if( g_steamID )
					window.location = 'https://store.steampowered.com/account/languagepreferences/';
				else if ( window.location.href.match( /[?&]l=/ ) )
					window.location = window.location.href.replace( /([?&])l=[^&]*&?/, '$1' );
				else
					window.location.reload();
			}
		}).fail( function() {
			Modal.Dismiss();
			ShowAlertDialog( 'Change language', 'There was a problem communicating with the Steam servers.  Please try again later.' );
		});
}*/

function updateValidLanguage() {
  if (validLanguage) {
    // Language is valid
    //$J("#steam_Inv_His_toolbar_filterOptions").show();
    $J("#languageNotSupportedWindow").hide();
  } else {
    // Language is not valid
    //$J("#steam_Inv_His_toolbar_filterOptions").hide();
    $J("#current_Language_that_is_not_supported").text(steamLanguage);
    $J("#languageNotSupportedWindow").show();

  }
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
