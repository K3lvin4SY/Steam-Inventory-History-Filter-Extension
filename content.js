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
    props["data-search-tag"] = $J(this).data("data-search-tag"); // Search for specific text
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
    props["data-item-quality-tag"] = tag3; // Search for all StatTrak, normal, knifes items, etc
    
    var tag4 = $J(this).data("data-item-type-tag");
    props["data-item-type-tag"] = tag4; // Search for specific item type ex: stickers, cases
    
    var tag5 = $J(this).data("data-item-collection-tag");
    props["data-item-collection-tag"] = tag5; // Search for item in a specific collection
    
    var tag6 = $J(this).data("data-item-rarity-tag");
    props["data-item-rarity-tag"] = tag6; // Search for specific item quality ex: Covert
    
    var tag7 = $J(this).data("data-item-exterior-tag");
    props["data-item-exterior-tag"] = tag7; // Search for specific item exterior ex: Minimal-Wear

    var tag8 = $J(this).data("data-item-weapon-tag");
    props["data-item-weapon-tag"] = tag8; // Search for specific item waepon type ex: Ak47
    
    //console.log($J(this).data());
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
    if (tag.length == 0) {
      return true;
    }
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
      //console.log("ERROR - sum ting wong");
    }
    /*if (item.text().cleanup().includes(tag)) {
      // passed
      return true;
    }*/
  } else if (prop == "data-item-quality-tag") {
    if (tag.length == 0) {
      return true;
    }
    if (typeof tag === 'string') { //
      if (item.data("item-quality").internal_name == tag) {
        // passed
        return true;
      }
    } else if (Array.isArray(tag)) {
      for (let index = 0; index < tag.length; index++) {
        const innerTag = tag[index]; //
        if (item.data("item-quality").internal_name == innerTag) {
          // passed
          return true;
        }
      }
    }
  } else if (prop == "data-item-type-tag") {
    
    if (tag.length == 0) {
      return true;
    }
    if (typeof tag === 'string') { //
      if (item.data("item-type").internal_name == tag) {
        // passed
        return true;
      }
    } else if (Array.isArray(tag)) {
      for (let index = 0; index < tag.length; index++) {
        const innerTag = tag[index]; //
        if (item.data("item-type").internal_name == innerTag) {
          // passed
          return true;
        }
      }
    }
  } else if (prop == "data-item-collection-tag") {
    if (tag.length == 0) {
      return true;
    }
    if (typeof tag === 'string') { //
      if (!Object.keys(item.data()).includes("itemCollection") && tag != "any") {
        return false;
      } else if (!Object.keys(item.data()).includes("itemCollection") && tag == "any") {
        return true;
      }
      if (item.data("item-collection").internal_name == tag || tag == "any") {
        // passed
        return true;
      }
    } else if (Array.isArray(tag)) {
      for (let index = 0; index < tag.length; index++) {
        const innerTag = tag[index]; //
        if (item.data("item-collection").internal_name == innerTag || tag == "any") {
          // passed
          return true;
        }
      }
    }
  } else if (prop == "data-item-rarity-tag") {
    if (tag.length == 0) {
      return true;
    }
    if (typeof tag === 'string') { //
      if (item.data("item-rarity").internal_name == tag) {
        // passed
        return true;
      }
    } else if (Array.isArray(tag)) {
      for (let index = 0; index < tag.length; index++) {
        const innerTag = tag[index]; //
        if (item.data("item-rarity").internal_name == innerTag) {
          // passed
          return true;
        }
      }
    }
  } else if (prop == "data-item-exterior-tag") {
    if (tag.length == 0) {
      return true;
    }
    if (typeof tag === 'string') { //
      if (item.data("item-exterior").internal_name == tag) {
        // passed
        return true;
      }
    } else if (Array.isArray(tag)) {
      for (let index = 0; index < tag.length; index++) {
        const innerTag = tag[index]; //
        if (item.data("item-exterior").internal_name == innerTag) {
          // passed
          return true;
        }
      }
    }
  } else if (prop == "data-item-weapon-tag") {
    if (tag.length == 0) {
      return true;
    }
    if (typeof tag === 'string') { //
      if (!Object.keys(item.data()).includes("itemWeapon") && tag != "any") {
        return false;
      } else if (!Object.keys(item.data()).includes("itemWeapon") && tag == "any") {
        return true;
      }
      if (item.data("item-weapon").internal_name == tag || tag == "any") {
        // passed
        return true;
      }
    } else if (Array.isArray(tag)) {
      for (let index = 0; index < tag.length; index++) {
        const innerTag = tag[index]; //
        if (item.data("item-weapon").internal_name == innerTag || tag == "any") {
          // passed
          return true;
        }
      }
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
    //console.log("---------");
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
        if (event_container.text().toLowerCase().includes(global_search_tag.search.toLowerCase())) {
          if (filterListTagInItems(items, global_search_tag.collection, "data-item-collection-tag")) {
            
            if (filterListTagInItems(items, global_search_tag.weapon, "data-item-weapon-tag")) {
              
              if (filterListTagInItems(items, global_search_tag.type, "data-item-type-tag")) {
                
                if (filterListTagInItems(items, global_search_tag.exterior, "data-item-exterior-tag")) {
                  
                  if (filterListTagInItems(items, global_search_tag.quality, "data-item-quality-tag")) {
                    
                    if (filterListTagInItems(items, global_search_tag.rarity, "data-item-rarity-tag")) {
                      
                      global_search_override = !include_only_filtered_rows;
                      tagsPassed++;
                      searchPassed = true;
                    }
                  }
                }
              }
            }
          }
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
            //console.log("num0");

            // end of loop iteration
          }
        } else if ( ["data-search-tag", "data-item-name-tag", "data-item-quality-tag", "data-item-type-tag", "data-item-collection-tag", "data-item-rarity-tag", "data-item-exterior-tag", "data-item-weapon-tag"].includes(prop) ) {
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
      //console.log("tagsPassed: "+tagsPassed);
      //console.log("tagsToPass: "+tagsToPass);
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

function ChangeLanguage( strTargetLanguage )
{
	$J.post( 'https://steamcommunity.com/actions/SetLanguage/', {language: strTargetLanguage, sessionid: sessionID })
		.done( function() {
      location.reload();
		}).fail( function() {
			ShowAlertDialog( 'Change language', 'There was a problem communicating with the Steam servers.  Please try again later.' );
		});
}

function updateValidLanguage() {
  if (validLanguage) {
    // Language is valid
    //$J("#steam_Inv_His_toolbar_filterOptions").show();
    //$J("#languageNotSupportedWindow").hide();
  } else {
    // Language is not valid
    //$J("#steam_Inv_His_toolbar_filterOptions").hide();
    $J("#current_Language_that_is_not_supported").text(steamLanguage);
    //$J("#languageNotSupportedWindow").show();

  }
}

function updateCurrentSearchList() {
  const data = $J("#advanced_filter_window .aFilter_current .aFilter_data").eq(0);
  const searchData = $J("#aFilter-search").val();
  const collectionData = $J("#aFilter-collection option:checked").text();
  const weaponData = $J("#aFilter-weapon option:checked").text();
  
  aFilterSearchData.search = searchData;
  aFilterSearchData.collection = $J("#aFilter-collection option:checked").val();
  aFilterSearchData.weapon = $J("#aFilter-weapon option:checked").val();

  // type
  var typeDataExists = false;
  var typeData = "<p><h5>"+languageOption.sel.html.advancedFilter.type+":</h5>";
  aFilterSearchData.type = [];
  $J("#aFilter-type .checkbox-container .input-option").each(function() {
    if ($J(this).is(':checked')) {
      typeData += "<li>"+$J(this).next().text()+"</li>";
      aFilterSearchData.type.push($J(this).val());
      typeDataExists = true;
    }
  })
  typeData += "</p>";

  // exterior
  var exteriorDataExists = false;
  var exteriorData = "<p><h5>"+languageOption.sel.html.advancedFilter.exterior+":</h5>";
  aFilterSearchData.exterior = [];
  $J("#aFilter-exterior .checkbox-container .input-option").each(function() {
    if ($J(this).is(':checked')) {
      exteriorData += "<li>"+$J(this).next().text()+"</li>";
      aFilterSearchData.exterior.push($J(this).val());
      exteriorDataExists = true;
    }
  })
  exteriorData += "</p>";

  // quality
  var qualityDataExists = false;
  var qualityData = "<p><h5>"+languageOption.sel.html.advancedFilter.quality+":</h5>";
  aFilterSearchData.quality = [];
  $J("#aFilter-quality .checkbox-container .input-option").each(function() {
    if ($J(this).is(':checked')) {
      qualityData += '<li style="color: '+$J(this).next().css("color")+'">'+$J(this).next().text()+"</li>";
      aFilterSearchData.quality.push($J(this).val());
      qualityDataExists = true;
    }
  })
  qualityData += "</p>";

  // rarity
  var rarityDataExists = false;
  var rarityData = "<p><h5>"+languageOption.sel.html.advancedFilter.rarity+":</h5>";
  aFilterSearchData.rarity = [];
  $J("#aFilter-rarity .checkbox-container .input-option").each(function() {
    if ($J(this).is(':checked')) {
      rarityData += '<li style="color: '+$J(this).next().css("color")+'">'+$J(this).next().text()+"</li>";
      aFilterSearchData.rarity.push($J(this).val());
      rarityDataExists = true;
    }
  })
  rarityData += "</p>";

  data.html('');
  if (searchData != '') {
    data.append('<p><h5>'+languageOption.sel.html.simpleSearch.searchBarLabel+':</h5><li>'+searchData+'</li></p>');
  }
  data.append('<p><h5>'+languageOption.sel.html.advancedFilter.collection+':</h5><li>'+collectionData+'</li></p>');
  data.append('<p><h5>'+languageOption.sel.html.advancedFilter.weapon+':</h5><li>'+weaponData+'</li></p>');
  if (typeDataExists) {
    data.append(typeData);
  }
  if (exteriorDataExists) {
    data.append(exteriorData);
  }
  if (qualityDataExists) {
    data.append(qualityData);
  }
  if (rarityDataExists) {
    data.append(rarityData);
  }
}
function updateCurrentSearchList2() {
  const data = $J("#handler_filter_window .aFilter_current .aFilter_data").eq(0);
  const searchData = $J("#aFilter_handler-search").val();
  const collectionData = $J("#aFilter_handler-collection option:checked").text();
  aFilterSearchData2Html.collection = $J("#aFilter_handler-collection option:checked").prop('outerHTML');
  const weaponData = $J("#aFilter_handler-weapon option:checked").text();
  aFilterSearchData2Html.weapon = $J("#aFilter_handler-weapon option:checked").prop('outerHTML');
  
  aFilterSearchData2.search = searchData;
  aFilterSearchData2.collection = $J("#aFilter_handler-collection option:checked").val();
  aFilterSearchData2.weapon = $J("#aFilter_handler-weapon option:checked").val();

  // type
  var typeDataExists = false;
  var typeData = "<p><h5>"+languageOption.sel.html.advancedFilter.type+":</h5>";
  aFilterSearchData2.type = [];
  aFilterSearchData2Html.type = {};
  $J("#aFilter_handler-type .checkbox-container .input-option").each(function() {
    if ($J(this).is(':checked')) {
      typeData += "<li>"+$J(this).next().text()+"</li>";
      aFilterSearchData2.type.push($J(this).val());
      aFilterSearchData2Html.type[$J(this).val()] = '<div class="checkbox-container">'+$J(this).parents().eq(0).html()+"</div>";
      typeDataExists = true;
    }
  })
  typeData += "</p>";

  // exterior
  var exteriorDataExists = false;
  var exteriorData = "<p><h5>"+languageOption.sel.html.advancedFilter.exterior+":</h5>";
  aFilterSearchData2.exterior = [];
  $J("#aFilter_handler-exterior .checkbox-container .input-option").each(function() {
    if ($J(this).is(':checked')) {
      exteriorData += "<li>"+$J(this).next().text()+"</li>";
      aFilterSearchData2.exterior.push($J(this).val());
      exteriorDataExists = true;
    }
  })
  exteriorData += "</p>";

  // quality
  var qualityDataExists = false;
  var qualityData = "<p><h5>"+languageOption.sel.html.advancedFilter.quality+":</h5>";
  aFilterSearchData2.quality = [];
  $J("#aFilter_handler-quality .checkbox-container .input-option").each(function() {
    if ($J(this).is(':checked')) {
      qualityData += '<li style="color: '+$J(this).next().css("color")+'">'+$J(this).next().text()+"</li>";
      aFilterSearchData2.quality.push($J(this).val());
      qualityDataExists = true;
    }
  })
  qualityData += "</p>";

  // rarity
  var rarityDataExists = false;
  var rarityData = "<p><h5>"+languageOption.sel.html.advancedFilter.rarity+":</h5>";
  aFilterSearchData2.rarity = [];
  aFilterSearchData2Html.rarity = {};
  $J("#aFilter_handler-rarity .checkbox-container .input-option").each(function() {
    if ($J(this).is(':checked')) {
      rarityData += '<li style="color: '+$J(this).next().css("color")+'">'+$J(this).next().text()+"</li>";
      aFilterSearchData2.rarity.push($J(this).val());
      aFilterSearchData2Html.rarity[$J(this).val()] = '<div class="checkbox-container">'+$J(this).parents().eq(0).html()+"</div>";
      rarityDataExists = true;
    }
  })
  rarityData += "</p>";

  data.html('');
  if (searchData != '') {
    data.append('<p><h5>'+languageOption.sel.html.simpleSearch.searchBarLabel+':</h5><li>'+searchData+'</li></p>');
  }
  data.append('<p><h5>'+languageOption.sel.html.advancedFilter.collection+':</h5><li>'+collectionData+'</li></p>');
  data.append('<p><h5>'+languageOption.sel.html.advancedFilter.weapon+':</h5><li>'+weaponData+'</li></p>');
  if (typeDataExists) {
    data.append(typeData);
  }
  if (exteriorDataExists) {
    data.append(exteriorData);
  }
  if (qualityDataExists) {
    data.append(qualityData);
  }
  if (rarityDataExists) {
    data.append(rarityData);
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

// ***** FOR EXPORT OF DATA *******
function injectXLSXLibrary(callback) {
  var xlsxScript = document.createElement('script');
  xlsxScript.src = chrome.runtime.getURL('js/background/xlsx.full.min.js');
  xlsxScript.onload = callback;
  document.head.appendChild(xlsxScript);
}

function flattenDropData(data) {
  var flattenedData = [];
  for (var dropType in data) {
    const entriesLength = data[dropType].length;
    for (var dataEntry = 0; dataEntry < entriesLength; dataEntry++) {
      const item = data[dropType][dataEntry]["item"];
      const timeFrame = data[dropType][dataEntry]["timeFrame"];
      const flattenDataEntry = {
        "Drop Type": dropType,
        "Item Type": item.itemType.name,
        "Item Category": item.itemQuality.name,
        "Item Name": item.itemName,
        "Item Weapon": item.itemWeapon.name,
        "Item Exterior": item.itemExterior.name,
        "Item Quality": { t: 's', v: item.itemRarity.name, s: { fill: { patternType: "solid", fgColor: { rgb: "ff"+item.itemRarity.color } } } },
        "Date": "Y:"+timeFrame.year+", Q:"+timeFrame.quarter+", M:"+timeFrame.month+", D:"+timeFrame.day
      };
      flattenedData.push(flattenDataEntry);
    }
  }
  return flattenedData;
}
function flattenUnlockData(data) {
  var flattenedData = [];
  for (var conatinerType in data) {
    const entriesLength = data[conatinerType].length;
    for (var dataEntry = 0; dataEntry < entriesLength; dataEntry++) {
      const container = data[conatinerType][dataEntry]["container"];
      const item = data[conatinerType][dataEntry]["item"];
      const timeFrame = data[conatinerType][dataEntry]["timeFrame"];
      const flattenDataEntry = {
        "Container Type": conatinerType,
        "Container Name": container.itemName,
        "Item Type": item.itemType.name,
        "Item Category": item.itemQuality.name,
        "Item Name": item.itemName,
        "Item Weapon": item.itemWeapon.name,
        "Item Exterior": item.itemExterior.name,
        "Item Quality": { t: 's', v: item.itemRarity.name, s: { fill: { patternType: "solid", fgColor: { rgb: "ff"+item.itemRarity.color } } } },
        "Date": "Y:"+timeFrame.year+", Q:"+timeFrame.quarter+", M:"+timeFrame.month+", D:"+timeFrame.day
      };
      flattenedData.push(flattenDataEntry);
    }
  }
  return flattenedData;
}
// ***** FOR EXPORT OF DATA ******* END