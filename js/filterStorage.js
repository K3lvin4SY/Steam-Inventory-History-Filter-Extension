async function filterHandlerEdit() {
  if (!$J("#aFilter_handler_edit").hasClass("hFilter_button_unavailable")) {

    $J('#filter_handler_storage').children().each(async function() {
      if ($J(this).hasClass('selected')) {

        const key = $J(this).text();
        const { userFilterData } = await chrome.storage.sync.get(["userFilterData"]);
        const dataToLoad = userFilterData[key];
        changeFilterHanderValues(key, dataToLoad);

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
    const { userFilterData } = await chrome.storage.sync.get(["userFilterData"]);
    userFilterData[$J("#aFilter_handler-label").val()] = aFilterSearchData2;
    await chrome.storage.sync.set({ userFilterData: userFilterData });
    updateFilterHandlerStorage();
  }
}
function filterHandlerRemove() {
  if (!$J("#aFilter_handler_remove").hasClass("hFilter_button_unavailable")) {
    $J('#filter_handler_storage').children().each(async function() {
      if ($J(this).hasClass('selected')) {
        const key = $J(this).text();
        const { userFilterData } = await chrome.storage.sync.get(["userFilterData"]);
        delete userFilterData[key];
        await chrome.storage.sync.set({ userFilterData: userFilterData });
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
async function updateFilterOptionsStorage() {

}

function changeFilterHanderValues(label, data) {
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

  // liquid values

  // update current list
  updateCurrentSearchList2();
}