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
    updateFilterTagCollector()
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
      $J("#steam_Inv_His_Filter_Window #modal_bottom_bar").show();
    } else {
      $J("#steam_Inv_His_Filter_Window #modal_bottom_bar").hide();
    }
  });
  

  $J("#steam_Inv_Loader_Win_Btn").click(function() {
    if ($J("#steam_Inv_Loader_Win_Btn").hasClass("steam_Inv_Loader_Win_Dismiss")) {

      console.log("Dismissing Loadin screen...");
      $J("#Loading_For_Rows_Dialog").hide();
      $J("#steam_Inv_Loader_Win_Btn_Txt").text(languageOption.sel.messages.stop);
      $J("#steam_Inv_Loader_Win_Title_Text").text(languageOption.sel.messages.loadingHistory);
      $J("#steam_Inv_Loader_Win_Btn").addClass("steam_Inv_Loader_Win_Stop");
      $J("#steam_Inv_Loader_Win_Btn").removeClass("steam_Inv_Loader_Win_Dismiss");
      $J("#steam_Inv_Loader_spin").show();
      $J("#steam_Inv_Loader_Message").text(languageOption.sel.messages.loadingInProgressText);
			$J("#steam_Inv_Loader_Win_FBtn").show();

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
    $J("#Loading_For_Rows_Dialog").hide();
    $J("#steam_Inv_Loader_Win_Btn_Txt").text(languageOption.sel.messages.stop);
    $J("#steam_Inv_Loader_Win_Title_Text").text(languageOption.sel.messages.loadingHistory);
    $J("#steam_Inv_Loader_Win_Btn").addClass("steam_Inv_Loader_Win_Stop");
    $J("#steam_Inv_Loader_Win_Btn").removeClass("steam_Inv_Loader_Win_Dismiss");
    $J("#steam_Inv_Loader_spin").show();
    $J("#steam_Inv_Loader_Message").text(languageOption.sel.messages.loadingInProgressText);
  });

  $J(".steam_filter_alert_Win_Dismiss").each(function() {
    $J(this).click(function() {
      $J("#steam_filter_alert_Dialog").hide();
    })
  })

  $J(".steam_filter_Options_Win_Dismiss").each(function() {
    $J(this).click(function() {
      $J("#steam_filter_Options").toggle();
    })
  })

  $J(".steam_filter_stats_win_dismiss").each(function() {
    $J(this).click(function() {
      if (loadedAllHistory) {
        $J("#steam_filter_stats_alert_message").hide();
      } else {
        $J("#steam_filter_stats_alert_message").show();
      }
      if ($J("#steam_filter_stats").is(":hidden")) {
        updateCharts();
      }
      $J("#steam_filter_stats").toggle();
    })
  })

  // close aFilter Search
  $J("#steam_filter_advanced_win_dismiss").each(function() {
    $J(this).click(function() {
      $J("#steam_filter_advanced").hide();
    })
  });
  $J("#steam_filter_advanced_win_btn").each(function() {
    $J(this).click(function() {
      $J("#steam_filter_advanced").toggle();
      $J("#steam_filter_simple_searchbar").toggle();
    })
  });

  $J(".steam_filter_options_Win_Dismiss").each(function() {
    $J(this).click(function() {
      $J("#steam_filter_options_Dialog").toggle();
    })
  });

  $J("#steam_filter_options_Win_Btn").click(function() {
    $J("#steam_filter_options_Dialog").hide();
    const selectedLanguageProperties = languageOption[$J("#steam_filter_language_option").val()];
    languageOption["sel"] = selectedLanguageProperties;
    updateHtmlText();
  });

  // aFilter open
  /*$J("#steam_filter_searchbar_advanced").click(function() {
    $J("#steam_filter_advanced").toggle();
    $J("#steam_filter_Options").toggle();
  });*/
  $J("#steam_filter_simple_searchbar_advanced").click(function() {
    $J("#steam_filter_advanced").toggle();
    $J("#steam_filter_simple_searchbar").toggle();
  });

  $J("#steam_Inv_His_Search").click(() => {
    $J("#steam_filter_simple_searchbar").show();
  })
  $J("#steam_filter_simple_searchbar_win_dismiss_btn").click(() => {
    $J("#steam_filter_simple_searchbar").hide();
  })

  // send simple search
  $J("#steam_filter_simple_searchbar_search_submit_btn").click(function() {
    var tagToSearch = {
      search: $J("#steam_filter_simple_searchbar_data").val(),
      collection: "any",
      weapon: "any",
      type: [],
      exterior: [],
      quality: [],
      rarity: []
    };
    var include_only_filtered_rows = !$J("#include_search_outside_filters_box").is(":checked");
    $J("#steam_filter_simple_searchbar").hide();
    updateFilterTagCollector(tagToSearch, include_only_filtered_rows);
    
  })

  // stats windows buttons chack its chackbox
  $J("#steam_filter_stats .stats_content_container .stats_list div > *").each(function() {
    $J(this).click(function() {
      if ($J(this).prev("input").is(':checked')) {
        $J(this).prev("input").prop("checked", false);
      } else {
        $J(this).prev("input").prop("checked", true);
      }
      
    })
  })

  // aFilter only one checked
  $J('#advanced_filter_window .input-select[type="checkbox"]').each(function() {
    $J(this).click(function() {
      const clickedBtn = this;
      $J('#advanced_filter_window .input-select[type="checkbox"]').each(function() {
        if ($J(this).is(':checked') && this != clickedBtn) {
          $J(this).prop("checked", false);
        }
      })
    })
  })
  $J('#advanced_filter_window .aFilter_container select').each(function() {
    $J(this).click(function() {
      $J('#advanced_filter_window .input-select[type="checkbox"]').each(function() {
        if ($J(this).is(':checked')) {
          $J(this).prop("checked", false);
        }
      })
    })
  })
  $J("#aFilter-search").on('click', function() {
    $J('#advanced_filter_window .input-select[type="checkbox"]').each(function() {
      if ($J(this).is(':checked')) {
        $J(this).prop("checked", false);
      }
    })
  })

  // aFilter reset btn
  $J(".steam_filter_advanced_win_btn_reset").each(function() {
    $J(this).click(function() {
      $J("#advanced_filter_window").find("input:checkbox:checked").each(function() {
        $J(this).prop("checked", false);
      });
      $J("#advanced_filter_window").find("select").each(function() {
        $J(this).val($J(this).find("option:first").val());
      });
      updateCurrentSearchList();
    });
  });

  // aFilter on change
  $J('#advanced_filter_window .input-option[type="checkbox"]').each(function() {
    $J(this).click(function() {
      updateCurrentSearchList();
    })
  })
  $J('#advanced_filter_window .aFilter_container select').each(function() {
    $J(this).change(function() {
      updateCurrentSearchList();
    })
  })
  $J("#aFilter-search").on('input', function() {
    updateCurrentSearchList();
  })

  // aFilter Search
  $J("#aFilter_search").click(function() {
    console.log(aFilterSearchData);
    var include_only_filtered_rows = !$J("#aFilter_include_search_outside_filters_box").is(":checked");
    updateFilterTagCollector(aFilterSearchData, include_only_filtered_rows);
    $J("#steam_filter_advanced").hide();
  })
}