const button1 = document.getElementById("steam_Inv_His_Filter_Apply_Btn");
console.log(button1);
button1.addEventListener("click", () => {
  console.log("test1");
  recieveCommand(document.getElementById('steam_Inv_His_Filter_Tag_Input').value+"@"+document.getElementById('steam_Inv_His_Filter_Type_Switch').checked);
});

document.getElementById("reset_filter_list").addEventListener("click", () => {
  const list1 = document.querySelectorAll('.list1');
  const list2Elements = document.querySelectorAll('.list2 > *');

  for (let i = 0; i < list2Elements.length; i++) {
    if (list2Elements[i].classList.contains('selected')) {
      list2Elements[i].classList.remove('selected');
    }
    for (let j = 0; j < list1.length; j++) {
      list1[j].appendChild(list2Elements[i]);
    }
  }
});

document.getElementById("move_left").addEventListener("click", () => {
  const list1 = document.querySelectorAll('.list1');
  const selected = document.querySelectorAll('.list2 .selected');

  for (let i = 0; i < selected.length; i++) {
    selected[i].classList.remove('selected');
    for (let j = 0; j < list1.length; j++) {
      list1[j].appendChild(selected[i]);
    }
  }
});

document.getElementById("move_right").addEventListener("click", () => {
  const list1Selected = document.querySelectorAll('.list1 .selected');
  const list2 = document.querySelectorAll('.list2');

  for (let i = 0; i < list1Selected.length; i++) {
    list1Selected[i].classList.remove('selected');
    for (let j = 0; j < list2.length; j++) {
      list2[j].prepend(list1Selected[i]);
    }
  }
});

const filterTransferList = document.querySelector('#filter_Transfer_List');
filterTransferList.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('selected');
  }
});

const filterSwitch = document.getElementById('steam_Inv_His_Filter_Type_Switch');
const filterWindow = document.getElementById("steam_Inv_His_Filter_Window");

filterSwitch.addEventListener("change", function() {
  if (filterSwitch.checked) {
    filterWindow.classList.add("filter_window_minimized");
  } else {
    filterWindow.classList.remove("filter_window_minimized");
  }
});

const openBtn = document.getElementById("filter_window_open_btn");

// Add click event listener to open button
openBtn.addEventListener("click", function() {
  // Toggle filter switch
  filterSwitch.checked = !filterSwitch.checked;

  // Remove filter_window_minimized class
  filterWindow.classList.remove("filter_window_minimized");
});

const button2 = document.getElementById("steam_Inv_His_Filter_Clear_Btn");
console.log(button2);
button2.addEventListener("click", () => {
  console.log("test2");
  recieveCommand("clearFilter");
  ShowAlertDialog( 'Error', 'There was a problem loading your inventory history.', 'OK' );
});

window.addEventListener('scroll', function() {
  if (window.pageYOffset >= 850) {
    filterWindow.classList.add('steam_Inv_His_Filter_Window_top');
  } else {
    filterWindow.classList.remove('steam_Inv_His_Filter_Window_top');
  }
});