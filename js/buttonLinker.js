
function createButtonLinks() {
 $J("#reset_filter_list").click(() => {
    $J('#hide_all_filter_list').trigger('click');
    const list1 = document.querySelectorAll('.list1');
    const showAll = document.querySelectorAll('#modal-filterOptions-data-showAll');

    for (let i = 0; i < showAll.length; i++) {
      for (let j = 0; j < list1.length; j++) {
        list1[j].appendChild(showAll[i]);
      }
    }
  });


  $J("#hide_all_filter_list").click(() => {
    const list1Elements = document.querySelectorAll('.list1 > *');
    const list2 = document.querySelectorAll('.list2');
    const list3 = document.querySelectorAll('.list3');

    for (let i = 0; i < list1Elements.length; i++) {
      if (list1Elements[i].classList.contains('selected')) {
        list1Elements[i].classList.remove('selected');
      }
      if (list1Elements[i].classList.contains("user_made_filter")) {
        for (let j = 0; j < list3.length; j++) {
          list3[j].appendChild(list1Elements[i]);
        }
      } else {
        for (let j = 0; j < list2.length; j++) {
          list2[j].appendChild(list1Elements[i]);
        }
      }
    }
  });

  $J("#move_left").click(() => {
    const list1 = document.querySelectorAll('.list1');
    const selected = document.querySelectorAll('.list2 .selected, .list3 .selected');

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
    const list3 = document.querySelectorAll('.list3');

    for (let i = 0; i < list1Selected.length; i++) {
      list1Selected[i].classList.remove('selected');
      if (list1Selected[i].classList.contains("user_made_filter")) {
        for (let j = 0; j < list3.length; j++) {
          list3[j].appendChild(list1Selected[i]);
        }
      } else {
        for (let j = 0; j < list2.length; j++) {
          list2[j].appendChild(list1Selected[i]);
        }
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
      if ($J("#steam_filter_Options").is(":hidden")) {
        updateFilterOptionsStorage();
      }
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
  // close and open filter handler
  $J("#steam_filter_handler_win_dismiss").each(function() {
    $J(this).click(function() {
      $J("#steam_filter_handler").hide();
    })
  });
  $J("#steam_filter_handler_win_btn").each(function() {
    $J(this).click(function() {
      updateFilterOptionsStorage();
      $J("#steam_filter_handler").toggle();
      $J("#steam_filter_Options").toggle();
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
  $J("#steam_filter_searchbar_advanced").click(function() {
    updateFilterHandlerStorage();
    $J("#steam_filter_handler").toggle();
    $J("#steam_filter_Options").toggle();
  });
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

  // Filter handler reset btn
  $J(".steam_filter_handler_win_btn_reset").each(function() {
    $J(this).click(function() {
      $J("#handler_filter_window").find("input:checkbox:checked").each(function() {
        $J(this).prop("checked", false);
      });
      $J("#handler_filter_window").find("select").each(function() {
        $J(this).val($J(this).find("option:first").val());
      });
      $J("#aFilter_handler-search").val("");
      $J("#aFilter_handler-label").val("");
      $J("#aFilter_handler_add").addClass("hFilter_button_unavailable");
      updateCurrentSearchList2();
    });
  });

  // Filter handler on change
  $J('#handler_filter_window .input-option[type="checkbox"]').each(function() {
    $J(this).click(function() {
      updateCurrentSearchList2();
    })
  })
  $J('#handler_filter_window .aFilter_container select').each(function() {
    $J(this).change(function() {
      updateCurrentSearchList2();
    })
  })
  $J("#aFilter_handler-search").on('input', function() {
    updateCurrentSearchList2();
  })
  $J("#aFilter_handler-label").on('input', function() {
    if ($J("#aFilter_handler-label").val() == "") {
      $J("#aFilter_handler_add").addClass("hFilter_button_unavailable");
    } else {
      $J("#aFilter_handler_add").removeClass("hFilter_button_unavailable");
    }
  })

  // Filter handler staorage toggle selected
  $J('#filter_handler_storage').click(function(event) {
    $J('#filter_handler_storage').children().each(function() {
      if (this != event.target) {
        //$J(this).removeClass('selected');
      }
    })
    if (event.target.tagName === 'LI') {
      event.target.classList.toggle('selected');
    }
    var amountSelected = 0;
    $J('#filter_handler_storage').children().each(function() {
      if ($J(this).hasClass('selected')) {
        amountSelected += 1;
      }
    })
    if (amountSelected == 0) {
      $J("#aFilter_handler_edit").addClass("hFilter_button_unavailable");
      $J("#aFilter_handler_remove").addClass("hFilter_button_unavailable");
    } else if (amountSelected == 1) {
      $J("#aFilter_handler_edit").removeClass("hFilter_button_unavailable");
      $J("#aFilter_handler_remove").removeClass("hFilter_button_unavailable");
    } else {
      $J("#aFilter_handler_edit").addClass("hFilter_button_unavailable");
      $J("#aFilter_handler_remove").removeClass("hFilter_button_unavailable");
    }
  });

  // Filter handler button calls
  $J("#aFilter_handler_edit").click(function() {
    filterHandlerEdit();
  })
  $J("#aFilter_handler_add").click(function() {
    filterHandlerAdd();
  })
  $J("#aFilter_handler_remove").click(function() {
    filterHandlerRemove();
  })

  // filter handler only one checked
  $J('#handler_filter_window .input-select[type="checkbox"]').each(function() {
    $J(this).click(function() {
      const clickedBtn = this;
      $J('#handler_filter_window .input-select[type="checkbox"]').each(function() {
        if ($J(this).is(':checked') && this != clickedBtn) {
          $J(this).prop("checked", false);
        }
      })
    })
  })
  $J('#handler_filter_window .aFilter_container select').each(function() {
    $J(this).click(function() {
      $J('#handler_filter_window .input-select[type="checkbox"]').each(function() {
        if ($J(this).is(':checked')) {
          $J(this).prop("checked", false);
        }
      })
    })
  })
  $J("#aFilter_handler-search").on('click', function() {
    $J('#handler_filter_window .input-select[type="checkbox"]').each(function() {
      if ($J(this).is(':checked')) {
        $J(this).prop("checked", false);
      }
    })
  })
  $J("#aFilter_handler-label").on('click', function() {
    $J('#handler_filter_window .input-select[type="checkbox"]').each(function() {
      if ($J(this).is(':checked')) {
        $J(this).prop("checked", false);
      }
    })
  })

  // small search engine in filter options V2 // --------------

  // buttons color handler
  $J("#small_search_engine_search_data, #small_search_engine_label_data").each(function() {
    $J(this).on('input', function() {
      if ($J("#small_search_engine_label_data").val() != "" && $J("#small_search_engine_search_data").val() != "") {
        $J("#modal-filterOptions-add-button").addClass("small_search_engine_button_unavailable");
        $J("#modal-filterOptions-search-button").addClass("small_search_engine_button_unavailable");
      } else if ($J("#small_search_engine_search_data").val() != "") {
        $J("#modal-filterOptions-add-button").removeClass("small_search_engine_button_unavailable");
        $J("#modal-filterOptions-search-button").addClass("small_search_engine_button_unavailable");
      } else {
        $J("#modal-filterOptions-add-button").removeClass("small_search_engine_button_unavailable");
        $J("#modal-filterOptions-search-button").removeClass("small_search_engine_button_unavailable");
      }
    })
  })

  //button on click handler
  $J("#modal-filterOptions-add-button").click(function() {
    smallSearchEngineAdd($J("#small_search_engine_label_data").val(), $J("#small_search_engine_search_data").val());
  })
  $J("#modal-filterOptions-search-button").click(function() {
    smallSearchEngineSearch($J("#small_search_engine_search_data").val());
  })
  
  
  // export stats data
  $J("#steam_filter_stats_win_export").click(function() {
    injectXLSXLibrary(function() {
      var wb = XLSX.utils.book_new();

      const statsData = getStatsData();
    
      var generalDataWS = XLSX.utils.json_to_sheet(flattenGeneralStatsData(statsData.unlocks.general, statsData.drops.general));
      XLSX.utils.book_append_sheet(wb, generalDataWS, "General Stats Data");

      var unlocksLineChartDataWS = XLSX.utils.json_to_sheet(flattenLineChartStatsData(statsData.unlocks.lineChartData));
      XLSX.utils.book_append_sheet(wb, unlocksLineChartDataWS, "Unlocks LineChart Stats Data");

      var unlocksBarChartsDataWS = XLSX.utils.json_to_sheet(flattenBarChartsStatsData(statsData.unlocks.barChartData));
      XLSX.utils.book_append_sheet(wb, unlocksBarChartsDataWS, "Unlocks BarCharts Stats Data");

      var dropsLineChartDataWS = XLSX.utils.json_to_sheet(flattenLineChartStatsData(statsData.drops.lineChartData));
      XLSX.utils.book_append_sheet(wb, dropsLineChartDataWS, "Drops LineChart Stats Data");

      var dropsBarChartsDataWS = XLSX.utils.json_to_sheet(flattenBarChartsStatsData(statsData.drops.barChartData));
      XLSX.utils.book_append_sheet(wb, dropsBarChartsDataWS, "Drops BarCharts Stats Data");

      // Convert containerUnlocks data to worksheet
      var containerUnlocksWS = XLSX.utils.json_to_sheet(flattenUnlockData(gameData.containerUnlocks));
      XLSX.utils.book_append_sheet(wb, containerUnlocksWS, "Container Unlocks");
    
      // Convert gameDrops data to worksheet
      var gameDropsWS = XLSX.utils.json_to_sheet(flattenDropData(gameData.gameDrops));
      XLSX.utils.book_append_sheet(wb, gameDropsWS, "Game Drops");
    
      // Save workbook as Excel file
      XLSX.writeFile(wb, "CS_Inventory_Stats_Data.xlsx");
    })
  })

  // export history data
  $J("#steam_filter_options_Win_Export_History_Btn").click(function() {
    
    var jsonData = gottenHistoryDataSegments;
    
    var jsonString = JSON.stringify(jsonData, null, 2);
    
    var blob = new Blob([jsonString], {type: "application/json"});
    
    var url = URL.createObjectURL(blob);
    
    var a = document.createElement('a');
    a.href = url;
    a.download = 'STEAM_Inventory_History_Data.json';
    
    a.click();
    
    URL.revokeObjectURL(url);
  })
}