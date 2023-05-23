async function filterHandlerEdit() {
  const { userFilterData } = await chrome.storage.sync.get(["userFilterData"]);
  console.log(userFilterData);
}
async function filterHandlerAdd() {
  if ($J("#aFilter_handler-label").val() != "") {
    console.log("add");
    const { userFilterData } = await chrome.storage.sync.get(["userFilterData"]);
    userFilterData[$J("#aFilter_handler-label").val()] = aFilterSearchData2;
    await chrome.storage.sync.set({ userFilterData: userFilterData });
  }
}
async function filterHandlerRemove() {

}

async function updateFilterHandlerStorage() {
  const { userFilterData } = await chrome.storage.sync.get(["userFilterData"]);
  const keys = Object.keys(userFilterData);
  $J("#filter_handler_storage").html("")
  for (const key of keys) {
    $J("#filter_handler_storage").append('<li>'+key+'</li>');
  }
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