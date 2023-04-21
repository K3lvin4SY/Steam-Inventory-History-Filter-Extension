function createButtonLinks() {
  $J("#steam_Inv_His_Filter_Apply_Btn").click(() => {
    recieveCommand(document.getElementById('steam_Inv_His_Filter_Tag_Input').value+"@"+document.getElementById('steam_Inv_His_Filter_Type_Switch').checked);
  });

  $J("#reset_filter_list").click(() => {
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


  $J("#hide_all_filter_list").click(() => {
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

  $J("#move_left").click(() => {
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

  $J("#move_right").click(() => {
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

  $J('#filter_Transfer_List').click(function(event) {
    if (event.target.tagName === 'LI') {
      event.target.classList.toggle('selected');
    }
  });

  const filterSwitch = document.getElementById('steam_Inv_His_Filter_Type_Switch');
  const filterWindow = document.getElementById("steam_Inv_His_Filter_Window");

  filterSwitch.addEventListener("change", function() {
    if (filterSwitch.checked) {
      $J("#steam_Inv_His_Filter_Window").addClass("filter_window_minimized");
    } else {
    $J("#steam_Inv_His_Filter_Window").removeClass("filter_window_minimized");
    }
  });


  $J("#filter_window_open_btn").click(function() {
    $J('#steam_Inv_His_Filter_Type_Switch').trigger('click'); 
    $J("#steam_Inv_His_Filter_Window").removeClass("filter_window_minimized");
  });


  $J("#steam_Inv_His_Filter_Clear_Btn").click(function() {
    recieveCommand("clearFilter");
  });

  $J("#steam_Inv_His_Load_All").click(function() {
    InventoryHistory_LoadAll();
  });

  window.addEventListener('scroll', function() {
    if (window.pageYOffset >= 850) {
      filterWindow.classList.add('steam_Inv_His_Filter_Window_top');
    } else {
      filterWindow.classList.remove('steam_Inv_His_Filter_Window_top');
    }
  });
  

  $J("#steam_Inv_Loader_Win_Btn").click(function() {
    if ($J("#steam_Inv_Loader_Win_Btn").hasClass("steam_Inv_Loader_Win_Dismiss")) {

      console.log("Dismissing Loadin screen...");
      $J("#Loading_For_Rows_Dialog").addClass("steam_filter_hide_class");
      $J("#steam_Inv_Loader_Win_Btn_Txt").text("STOP");
      $J("#steam_Inv_Loader_Win_Title_Text").text("Loading History");
      $J("#steam_Inv_Loader_Win_Btn").addClass("steam_Inv_Loader_Win_Stop");
      $J("#steam_Inv_Loader_Win_Btn").removeClass("steam_Inv_Loader_Win_Dismiss");
      $J("#steam_Inv_Loader_spin").removeClass("steam_filter_hide_class");
      $J("#steam_Inv_Loader_Message").text("Please wait while all the history is being loaded...");
			$J("#steam_Inv_Loader_Win_FBtn").removeClass("steam_filter_hide_class");

    } else if ($J("#steam_Inv_Loader_Win_Btn").hasClass("steam_Inv_Loader_Win_Stop")) {

      // stop loading
      console.log("Loading Stopping...");
      continueLOading = false;

    }
  });

  $J("#steam_Inv_Loader_Win_FBtn").click(function() {
    console.log("!Loading Force Stopping!");
    continueLOading = false;

    console.log("Dismissing Loadin screen...");
    $J("#Loading_For_Rows_Dialog").addClass("steam_filter_hide_class");
    $J("#steam_Inv_Loader_Win_Btn_Txt").text("STOP");
    $J("#steam_Inv_Loader_Win_Title_Text").text("Loading History");
    $J("#steam_Inv_Loader_Win_Btn").addClass("steam_Inv_Loader_Win_Stop");
    $J("#steam_Inv_Loader_Win_Btn").removeClass("steam_Inv_Loader_Win_Dismiss");
    $J("#steam_Inv_Loader_spin").removeClass("steam_filter_hide_class");
    $J("#steam_Inv_Loader_Message").text("Please wait while all the history is being loaded...");
  });

  $J(".steam_filter_alert_Win_Dismiss").each(function() {
    $J(this).click(function() {
      $J("#steam_filter_alert_Dialog").addClass("steam_filter_hide_class");
    })
  })

  $J(".steam_filter_Options_Win_Dismiss").each(function() {
    $J(this).click(function() {
      $J("#steam_filter_Options").toggleClass("steam_filter_hide_class");
    })
  })
  
}