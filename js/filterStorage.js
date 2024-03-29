function filterHandlerEdit() {
  if (!$J("#aFilter_handler_edit").hasClass("hFilter_button_unavailable")) {

    $J('#filter_handler_storage').children().each(async function() {
      if ($J(this).hasClass('selected')) {

        const key = $J(this).text();
        const { userFilterData, userFilterDataHtml } = await chrome.storage.sync.get(["userFilterData", "userFilterDataHtml"]);
        const dataToLoad = userFilterData[key];
        const htmlToLoad = userFilterDataHtml[key];
        changeFilterHanderValues(key, dataToLoad, htmlToLoad);

        $J(this).removeClass('selected');
      }
    })
    $J("#aFilter_handler_edit").addClass("hFilter_button_unavailable");
    $J("#aFilter_handler_remove").addClass("hFilter_button_unavailable");
  }
}
async function filterHandlerAdd() {
  if ($J("#aFilter_handler-label").val() != "") {
    console.log("add");
    const { userFilterData, userFilterDataHtml } = await chrome.storage.sync.get(["userFilterData", "userFilterDataHtml"]);
    userFilterData[$J("#aFilter_handler-label").val()] = aFilterSearchData2;
    userFilterDataHtml[$J("#aFilter_handler-label").val()] = aFilterSearchData2Html;
    await chrome.storage.sync.set({ userFilterData: userFilterData, userFilterDataHtml: userFilterDataHtml });
    updateFilterHandlerStorage();
  }
}
async function filterHandlerRemove() {
  if (!$J("#aFilter_handler_remove").hasClass("hFilter_button_unavailable")) {
    const { userFilterData, userFilterDataHtml } = await chrome.storage.sync.get(["userFilterData", "userFilterDataHtml"]);
    $J('#filter_handler_storage').children().each(function() {
      if ($J(this).hasClass('selected')) {
        const key = $J(this).text();
        delete userFilterData[key];
        delete userFilterDataHtml[key];
        $J("#filter_list_show li").each(function() {
          if ($J(this).hasClass("user_made_filter")) {
            if ($J(this).text() == key) {
              $J(this).remove();
            }
          }
        })
      }
    })
    await chrome.storage.sync.set({ userFilterData: userFilterData, userFilterDataHtml: userFilterDataHtml });
    updateFilterHandlerStorage();
    $J("#aFilter_handler_edit").addClass("hFilter_button_unavailable");
    $J("#aFilter_handler_remove").addClass("hFilter_button_unavailable");
  }
}

async function updateFilterHandlerStorage() {
  const { userFilterData } = await chrome.storage.sync.get(["userFilterData"]);
  const keys = Object.keys(userFilterData);
  $J("#filter_handler_storage").html("")
  for (const key of keys) {
    $J("#filter_handler_storage").append('<li>'+key+'</li>');
  }
  $J("#aFilter_handler_edit").addClass("hFilter_button_unavailable");
  $J("#aFilter_handler_remove").addClass("hFilter_button_unavailable");
}
function convertNewKeyToOldKey(newKey) {
  if (newKey == "search") {
    return "data-search-tag";
  } else {
    return "data-item-"+newKey+"-tag";
  }
}
function convertLiElementsToText(liElements) {
  var list = [];
  liElements.each(function() {
    if ($J(this).hasClass("user_made_filter")) {
      list.push($J(this).text());
    }
  })
  return list;
}
async function updateFilterOptionsStorage() {
  const { userFilterData } = await chrome.storage.sync.get(["userFilterData"]);
  const kvp = Object.entries(userFilterData);
  $J("#user_made_filters_storage_conatiner").html("");
  for (const [key, data] of kvp) {
    if (!convertLiElementsToText($J("#filter_list_show li")).includes(key)) {
      $J("#user_made_filters_storage_conatiner").append('<li class="user_made_filter">'+key+'</li>');
      for (const [dataKey, dataValue] of Object.entries(data)) {
        $J("#user_made_filters_storage_conatiner li").last().data(convertNewKeyToOldKey(dataKey), dataValue);
      }
    }
  }
}

function changeFilterHanderValues(label, data, html) {
  // text inputs
  $J("#aFilter_handler-label").val(label);
  $J("#aFilter_handler-search").val(data.search);

  // hard values
  $J("#aFilter_handler-exterior").find(".input-option").each(function() {
    if (data.exterior.includes($J(this).val())) {
      $J(this).prop( "checked", true )
    } else {
      $J(this).prop( "checked", false )
    }
  });
  $J("#aFilter_handler-quality").find(".input-option").each(function() {
    if (data.quality.includes($J(this).val())) {
      $J(this).prop( "checked", true )
    } else {
      $J(this).prop( "checked", false )
    }
  });

  function getMissingCheckboxes(title, data) {
    var dataList = [];
    for (const value of data) {
      dataList.push(value);
    }
    $J("#aFilter_handler-"+title).find(".input-option").each(function() {
      if (dataList.includes($J(this).val())) {
        delete dataList[dataList.indexOf($J(this).val())]
      }
    });
    return dataList;
  }
  // liquid values
  for (const key of getMissingCheckboxes("type", data.type)) {
    $J("#aFilter_handler-type").append(html.type[key]);
  }
  $J("#aFilter_handler-type").find(".input-option").each(function() {
    if (data.type.includes($J(this).val())) {
      $J(this).prop( "checked", true )
    } else {
      $J(this).prop( "checked", false )
    }
  });

  for (const key of getMissingCheckboxes("rarity", data.rarity)) {
    $J("#aFilter_handler-rarity").append(html.rarity[key]);
  }
  $J("#aFilter_handler-rarity").find(".input-option").each(function() {
    if (data.rarity.includes($J(this).val())) {
      $J(this).prop( "checked", true )
    } else {
      $J(this).prop( "checked", false )
    }
  });

  function isSelectOptionMissing(title, data) {
    var returnValue = true;
    $J("#aFilter_handler-"+title+" option").each(function() {
      if (data == $J(this).val()) {
        returnValue = false;
      }
    })
    return returnValue;
  }

  if (isSelectOptionMissing("collection", data.collection)) {
    $J("#aFilter_handler-collection").append(html.collection);
  }
  $J("#aFilter_handler-collection").val(data.collection);

  if (isSelectOptionMissing("weapon", data.weapon)) {
    $J("#aFilter_handler-weapon").append(html.weapon);
  }
  $J("#aFilter_handler-weapon").val(data.weapon);

  // update current list
  updateCurrentSearchList2();
}

async function smallSearchEngineAdd(labelData, searchData) {
  if ($J("#modal-filterOptions-add-button").hasClass("small_search_engine_button_unavailable")) {
    var tagToSearch = {
      search: searchData,
      collection: "any",
      weapon: "any",
      type: [],
      exterior: [],
      quality: [],
      rarity: []
    };
    const { userFilterData } = await chrome.storage.sync.get(["userFilterData"]);
    userFilterData[labelData] = tagToSearch;
    await chrome.storage.sync.set({ userFilterData: userFilterData });
    updateFilterOptionsStorage();
  }
}
function smallSearchEngineSearch(searchData) {
  if ($J("#modal-filterOptions-search-button").hasClass("small_search_engine_button_unavailable")) {
    var tagToSearch = {
      search: searchData,
      collection: "any",
      weapon: "any",
      type: [],
      exterior: [],
      quality: [],
      rarity: []
    };
    updateFilterTagCollector(tagToSearch);
    $J("#steam_filter_Options").hide();
  }
}