async function filterHandlerEdit() {
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
  const { userFilterData } = await chrome.storage.sync.get(["userFilterData"]);
  console.log(userFilterData);
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
function filterHandlerRemove() {
  if (!$J("#aFilter_handler_remove").hasClass("hFilter_button_unavailable")) {
    $J('#filter_handler_storage').children().each(async function() {
      if ($J(this).hasClass('selected')) {
        const key = $J(this).text();
        const { userFilterData, userFilterDataHtml } = await chrome.storage.sync.get(["userFilterData", "userFilterDataHtml"]);
        delete userFilterData[key];
        delete userFilterDataHtml[key];
        await chrome.storage.sync.set({ userFilterData: userFilterData, userFilterDataHtml: userFilterDataHtml });
        updateFilterHandlerStorage();
        $J("#aFilter_handler_edit").addClass("hFilter_button_unavailable");
        $J("#aFilter_handler_remove").addClass("hFilter_button_unavailable");
      }
    })
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
async function updateFilterOptionsStorage() {
  const { userFilterData } = await chrome.storage.sync.get(["userFilterData"]);
  const kvp = Object.entries(userFilterData);
  $J("#user_made_filters_storage_conatiner").html("")
  for (const [key, data] of kvp) {
    $J("#user_made_filters_storage_conatiner").append('<li class="user_made_filter">'+key+'</li>');
    for (const [dataKey, dataValue] of Object.entries(data)) {
      $J("#user_made_filters_storage_conatiner li").last().data(convertNewKeyToOldKey(dataKey), dataValue);
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