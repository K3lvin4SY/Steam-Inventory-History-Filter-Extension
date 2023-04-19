// Applies Html and hooks onto script
async function addFilterOptions() {
  const resp = await fetch(chrome.runtime.getURL('./components/filterWindow.html'));
  const html = await resp.text();
  const contentDiv = document.getElementById("BG_bottom");
  contentDiv.insertAdjacentHTML("beforebegin", html);

    
  $("#steam_Inv_His_Filter_Apply_Btn").click(() => {
    recieveCommand(document.getElementById('steam_Inv_His_Filter_Tag_Input').value+"@"+document.getElementById('steam_Inv_His_Filter_Type_Switch').checked);
  });

  $("#reset_filter_list").click(() => {
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
    updateFilter();
  });


  $("#hide_all_filter_list").click(() => {
    const list1Elements = document.querySelectorAll('.list1 > *');
    const list2 = document.querySelectorAll('.list2');

    for (let i = 0; i < list1Elements.length; i++) {
      if (list1Elements[i].classList.contains('selected')) {
        list1Elements[i].classList.remove('selected');
      }
      for (let j = 0; j < list2.length; j++) {
        list2[j].appendChild(list1Elements[i]);
      }
    }
    updateFilter();
  });

  $("#move_left").click(() => {
    const list1 = document.querySelectorAll('.list1');
    const selected = document.querySelectorAll('.list2 .selected');

    for (let i = 0; i < selected.length; i++) {
      selected[i].classList.remove('selected');
      for (let j = 0; j < list1.length; j++) {
        list1[j].appendChild(selected[i]);
      }
    }
    updateFilter();
  });

  $("#move_right").click(() => {
    const list1Selected = document.querySelectorAll('.list1 .selected');
    const list2 = document.querySelectorAll('.list2');

    for (let i = 0; i < list1Selected.length; i++) {
      list1Selected[i].classList.remove('selected');
      for (let j = 0; j < list2.length; j++) {
        list2[j].prepend(list1Selected[i]);
      }
    }
    updateFilter();
  });

  $('#filter_Transfer_List').click(function(event) {
    if (event.target.tagName === 'LI') {
      event.target.classList.toggle('selected');
    }
  });

  const filterSwitch = document.getElementById('steam_Inv_His_Filter_Type_Switch');
  const filterWindow = document.getElementById("steam_Inv_His_Filter_Window");

  filterSwitch.addEventListener("change", function() {
    if (filterSwitch.checked) {
      $("#steam_Inv_His_Filter_Window").addClass("filter_window_minimized");
    } else {
    $("#steam_Inv_His_Filter_Window").removeClass("filter_window_minimized");
    }
  });


  $("#filter_window_open_btn").click(function() {
    $('#steam_Inv_His_Filter_Type_Switch').trigger('click'); 
    $("#steam_Inv_His_Filter_Window").removeClass("filter_window_minimized");
  });


  $("#steam_Inv_His_Filter_Clear_Btn").click(function() {
    recieveCommand("clearFilter");
  });

  $("#steam_Inv_His_Load_All").click(function() {
    InventoryHistory_LoadAll();
  });

  window.addEventListener('scroll', function() {
    if (window.pageYOffset >= 850) {
      filterWindow.classList.add('steam_Inv_His_Filter_Window_top');
    } else {
      filterWindow.classList.remove('steam_Inv_His_Filter_Window_top');
    }
  });
}
addFilterOptions();

/*document.addEventListener('DOMContentLoaded', function() {
    var checkButton = document.getElementById('check');
    checkButton.addEventListener('click', function() {
        alert("Hey your button is working!");
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { type: "change-color" });
        });
    }, false);
}, false);*/

/*
//document.body.style.backgroundColor = "yellow";
var button = document.createElement("a");
//var link = document.createElement("a");
button.textContent = 'Multisell Page';
button.onclick = openMultiSellPage;

button.style.color = "white";
button.style.marginTop = "20px";
button.style.padding = "4px 4px 4px 4px";
button.style.position = "absolute";
button.style.fontSize = "1.25em";
button.style.borderWidth = "1px";
button.style.borderStyle = "solid";
button.style.borderRadius = "5px";


document.getElementById("inventory_history_table").appendChild(button);

function openMultiSellPage() {
    const { host, hostname, href, origin, pathname, port, protocol, search } = window.location
    window.open("https://steamcommunity.com/market/multisell?appid=730&contextid=2&items%5B%5D="+pathname.split("/")[4]);
}*/