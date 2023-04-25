function createButtonLinks() {
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
  });

  $J('#apply_filter_list').click(function() {
    updateFilter();
  });

  $J('#filter_Transfer_List').click(function(event) {
    if (event.target.tagName === 'LI') {
      event.target.classList.toggle('selected');
    }
  });

  $J("#steam_Inv_His_Load_All").click(function() {
    InventoryHistory_LoadAll();
  });

  window.addEventListener('scroll', function() {
    if (window.pageYOffset >= 300) {
      $J("#steam_Inv_His_Filter_Window #modal_bottom_bar").removeClass("steam_filter_hide_class");
    } else {
      $J("#steam_Inv_His_Filter_Window #modal_bottom_bar").addClass("steam_filter_hide_class");
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

  $J(".steam_filter_stats_win_dismiss").each(function() {
    $J(this).click(function() {
      if (loadedAllHistory) {
        $J("#steam_filter_stats_alert_message").addClass("steam_filter_hide_class");
      } else {
        $J("#steam_filter_stats_alert_message").removeClass("steam_filter_hide_class");
      }
      $J("#steam_filter_stats").toggleClass("steam_filter_hide_class");
    })
  })

  $J(".steam_filter_advanced_win_dismiss").each(function() {
    $J(this).click(function() {
      console.log("test");
      $J("#steam_filter_advanced").toggleClass("steam_filter_hide_class");
      $J("#steam_filter_Options").toggleClass("steam_filter_hide_class");
    })
  });

  $J("#steam_filter_searchbar_advanced").click(function() {
    $J("#steam_filter_advanced").toggleClass("steam_filter_hide_class");
    $J("#steam_filter_Options").toggleClass("steam_filter_hide_class");
  });

  $J(".steam_filter_advanced_win_btn_reset").each(function() {
    $J(this).click(function() {
      $J("#market_advancedsearch_filters").find("input:checkbox:checked").each(function() {
        $J(this).prop("checked", false);
      });
      $J("#market_advancedsearch_filters").find("select").each(function() {
        $J(this).val($J(this).find("option:first").val());
      });
    });
  });

  $J("#steam_Inv_His_Search").click(() => {
    $J("#steam_filter_simple_searchbar").removeClass("steam_filter_hide_class");
  })
  $J("#steam_filter_simple_searchbar_win_dismiss_btn").click(() => {
    $J("#steam_filter_simple_searchbar").addClass("steam_filter_hide_class");
  })
}