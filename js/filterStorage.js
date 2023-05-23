async function filterHandlerEdit() {

}
async function filterHandlerAdd() {
  console.log("add");
  await chrome.storage.session.set({ name: "David", color: "green" });
}
async function filterHandlerRemove() {

}

async function updateFilterHandlerStorage() {
  const { name, color } = await chrome.storage.session.get(["name", "color"]);
  console.log(name);
  console.log(color);
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