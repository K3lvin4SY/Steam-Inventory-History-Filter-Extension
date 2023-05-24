async function filterHandlerEdit() {
  if (!$J("#aFilter_handler_edit").hasClass("hFilter_button_unavailable")) {
    $J('#filter_handler_storage').children().each(function() {
      if ($J(this).hasClass('selected')) {
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

async function awdhauwhd() {
  // set
  await chrome.storage.session.set({ name: "David", color: "green" });
  
  // get 
  const { name, color } = await chrome.storage.session.get(["name", "color"]);
  
  // remove
  await chrome.storage.session.remove(["name", "color"]);
}