function InventoryHistory_BindTooltips( $Jnew, rgDescriptions )
{
	$Jnew.find('.economy_item_hoverable').each( function( index ) {
		var rgAppDescriptions = rgDescriptions[$J(this).data('appid')];
		if ( rgAppDescriptions )
		{
			var rgItemDescription = rgDescriptions[$J( this ).data( 'appid' )][$J( this ).data( 'classid' ) + '_' + $J( this ).data( 'instanceid' )];
			if ( rgItemDescription )
			{
				rgItem = {
					appid: $J(this).data( 'appid' ),
					contextid: $J(this).data( 'contextid' ),
					amount: $J(this).data( 'amount' ),
					description: Object.assign( rgItemDescription )
				};

				if ( $J(this).data( 'currencyid' ) )
				{
					rgItem.currency = true;
					rgItem.currencyid = $J(this).data( 'currencyid' );
				}
				else
				{
					rgItem.is_stackable = rgItem.amount > 1;
				}

				//console.log("pass");
				AddItemHoverToElement( $J(this).attr( 'id' ), rgItem );
			}
		}
	} );
}

function getMonthFromString(mon){
	return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1
}

function getQuarter(month) {
  if (month >= 1 && month <= 3) {
    return "Q1";
  } else if (month >= 4 && month <= 6) {
    return "Q2";
  } else if (month >= 7 && month <= 9) {
    return "Q3";
  } else if (month >= 10 && month <= 12) {
    return "Q4";
  } else {
    return languageOption.sel.messages.invalidMonth;
  }
}

function InventoryHistory_AddData( $Jnew, rgDescriptions )
{
	$Jnew.each(function() {
		$J(this).find('.tradehistory_items').each(function() {
			var plusminus = $J(this).find(".tradehistory_items_plusminus").eq(0).text();
			$J(this).find(".economy_item_hoverable").each(function() {
				var rgAppDescriptions = rgDescriptions[$J(this).data('appid')];
				if ($J( this ).data( 'appid' )) {
					$J(this).find(".history_item_name").eq(0).data("appid", parseInt($J( this ).data( 'appid' )));
				}
				if ( rgAppDescriptions && parseInt($J( this ).data( 'appid' )) == 730)
				{
					var rgItemDescription = rgDescriptions[$J( this ).data( 'appid' )][$J( this ).data( 'classid' ) + '_' + $J( this ).data( 'instanceid' )];
					

					var tags = rgItemDescription.tags;
					var collection = null;
					var exterior = null;
					var rarity = null;
					var type = null;
					var weapon = null;
					var quality = null;
					var name = rgItemDescription.market_name;
					var internal_name = rgItemDescription.market_hash_name;
					for (let index = 0; index < tags.length; index++) {
						const element = tags[index];
						if (element.category == "ItemSet") {
							collection = {
								name: element.name,
								internal_name: element.internal_name,
								category: element.category_name,
								internal_category: element.category
							};
						}
						if (element.category == "Rarity") {
							rarity = {
								name: element.name,
								internal_name: element.internal_name,
								category: element.category_name,
								internal_category: element.category,
								color: element.color
							};
						}
						if (element.category == "Type") {
							type = {
								name: element.name,
								internal_name: element.internal_name,
								category: element.category_name,
								internal_category: element.category
							};
						}
						if (element.category == "Weapon") {
							weapon = {
								name: element.name,
								internal_name: element.internal_name,
								category: element.category_name,
								internal_category: element.category
							};
						}
						if (element.category == "Exterior") {
							exterior = {
								name: element.name,
								internal_name: element.internal_name,
								category: element.category_name,
								internal_category: element.category
							};
						}
						if (element.category == "Quality") {
							quality = {
								name: element.name,
								internal_name: element.internal_name,
								category: element.category_name,
								internal_category: element.category
							};
						}
					}

					
					//console.log("--------------------");
					//console.log(rgItemDescription);
					//console.log(plusminus);
					if (rarity != null) {
						$J(this).find(".history_item_name").eq(0).data("item-rarity", rarity);
						//console.log(rarity);
					}
					$J(this).find(".history_item_name").eq(0).data("transfer-dir", plusminus);
					$J(this).find(".history_item_name").eq(0).data("item-name", name);
					$J(this).find(".history_item_name").eq(0).data("item-internal-name", internal_name);
					if (collection != null) {
						//console.log(collection);
						$J(this).find(".history_item_name").eq(0).data("item-collection", collection);
					}
					if (exterior != null) {
						//console.log(exterior);
						$J(this).find(".history_item_name").eq(0).data("item-exterior", exterior);
					}
					if (type != null) {
						//console.log(exterior);
						$J(this).find(".history_item_name").eq(0).data("item-type", type);
					}
					if (weapon != null) {
						//console.log(exterior);
						$J(this).find(".history_item_name").eq(0).data("item-weapon", weapon);
					}
					if (quality != null) {
						//console.log(exterior);
						$J(this).find(".history_item_name").eq(0).data("item-quality", quality);
					}
					//console.log($J(this).find(".history_item_name").eq(0).text());
					//console.log($J(this).find(".history_item_name").eq(0).data());

					// Adding html to aFilter
					function checkIfItemAlreadyExists(collection, value) {
						var returnValue = true;
						$J(collection).each(function() {
							if ($J(this).val() == value) {
								returnValue = false;
								return returnValue;
							}
						})
						return returnValue;
					}
					for (const [category, data] of Object.entries($J(this).find(".history_item_name").eq(0).data())) {
						if (category == "itemRarity") {
							const title = data.name;
							const value = data.internal_name;
							const color = data.color;
							if (checkIfItemAlreadyExists("#aFilter-rarity .input-option", value)) {
								$J("#aFilter-rarity").append('<div class="checkbox-container"><input class="input-option" value="'+value+'" type="checkbox"><span style="color: #'+color+';">'+title+'</span></div>');
								$J("#aFilter-rarity").find('.input-option[type="checkbox"]').last().click(function() {updateCurrentSearchList();});

								$J("#aFilter_handler-rarity").append('<div class="checkbox-container"><input class="input-option" value="'+value+'" type="checkbox"><span style="color: #'+color+';">'+title+'</span></div>');
								$J("#aFilter_handler-rarity").find('.input-option[type="checkbox"]').last().click(function() {updateCurrentSearchList2();});
							}
						} else if (category == "itemType") {
							const title = data.name;
							const value = data.internal_name;
							if (checkIfItemAlreadyExists("#aFilter-type .input-option", value)) {
								$J("#aFilter-type").append('<div class="checkbox-container"><input class="input-option" value="'+value+'" type="checkbox"><span>'+title+'</span></div>');
								$J("#aFilter-type").find('.input-option[type="checkbox"]').last().click(function() {updateCurrentSearchList();})

								$J("#aFilter_handler-type").append('<div class="checkbox-container"><input class="input-option" value="'+value+'" type="checkbox"><span>'+title+'</span></div>');
								$J("#aFilter_handler-type").find('.input-option[type="checkbox"]').last().click(function() {updateCurrentSearchList2();})
							}
						} else if (category == "itemWeapon") {
							const title = data.name;
							const value = data.internal_name;
							if (checkIfItemAlreadyExists("#aFilter-weapon option", value)) {
								$J("#aFilter-weapon").append('<option value="'+value+'">'+title+'</option>');

								$J("#aFilter_handler-weapon").append('<option value="'+value+'">'+title+'</option>');
							}
						} else if (category == "itemCollection") {
							const title = data.name;
							const value = data.internal_name;
							if (checkIfItemAlreadyExists("#aFilter-collection option", value)) {
								$J("#aFilter-collection").append('<option value="'+value+'">'+title+'</option>');

								$J("#aFilter_handler-collection").append('<option value="'+value+'">'+title+'</option>');
							}
						}
					}
				}
			})
		})
	})
}

function InventoryHistory_GetStatsData(itemName) {
	var itemListData = [];
	$J("#inventory_history_table").find(".tradehistoryrow").each(function() {
		var year = $J(this).find(".tradehistory_date").eq(0).text().replace(".", "").replace(",", "").split(" ")[2].cleanup().substring(0, 4);
		var mon = getEnglishMonth($J(this).find(".tradehistory_date").eq(0).text().replace(".", "").replace(",", "").split(" ")[1].cleanup().replace(/[0-9]/g, ''));
		var month = getMonthFromString(mon);
		var monthStr = getMonthFromString(mon)+"";
		if (monthStr.length == 1) {
			monthStr = "0"+monthStr;
		}
		var quarter = getQuarter(month);
		var day = $J(this).find(".tradehistory_date").eq(0).text().replace(".", "").replace(",", "").split(" ")[0].replace(/[a-zA-Z]/g, "").cleanup();
		if (day.length == 1) {
			day = "0"+day;
		}

		$J(this).find(".history_item_name").each(function() {
			var data = $J(this).data();
			if (data.itemName.toLowerCase().includes(itemName.toLowerCase())) {
				var itemData = {
					timeFrame: {
						quarter: quarter,
						year: year,
						month: monthStr,
						day: day
					},
					item: data
				};
				itemListData.push(itemData);
			}
		})
	})
	return itemListData;
}

function getEnglishMonth(month) {
	var foundMonth = false;
	var monthFound;
	Object.entries(languageOption.sel.months).forEach(([eng, lang]) => {
    if (lang.cleanup() == month) {
			foundMonth = true;
			monthFound = eng;
			return;
		}
  });
	if (foundMonth) {
		return monthFound;
	}
	return null;
}

function InventoryHistory_AddStatsData( $Jnew, rgDescriptions )
{
	$Jnew.each(function() {
		var year = $J(this).find(".tradehistory_date").eq(0).text().replace(".", "").replace(",", "").split(" ")[2].cleanup().substring(0, 4);
		var mon = getEnglishMonth($J(this).find(".tradehistory_date").eq(0).text().replace(".", "").replace(",", "").split(" ")[1].cleanup().replace(/[0-9]/g, ''));
		var month = getMonthFromString(mon);
		var monthStr = getMonthFromString(mon)+"";
		if (monthStr.length == 1) {
			monthStr = "0"+monthStr;
		}
		var quarter = getQuarter(month);
		var day = $J(this).find(".tradehistory_date").eq(0).text().replace(".", "").replace(",", "").split(" ")[0].replace(/[a-zA-Z]/g, "").cleanup();
		if (day.length == 1) {
			day = "0"+day;
		}

		// container unbox
		var mainUnboxTitle;
		if (!validLanguage) {
			mainUnboxTitle = languageOption.english.html.filterOptions.filters.data.containerOpened.main;
		} else {
			mainUnboxTitle = languageOption[steamLanguage].html.filterOptions.filters.data.containerOpened.main;
		}
		if ($J(this).find(".tradehistory_event_description").eq(0).text().includes(mainUnboxTitle)) {
			var typeOfCase;
			var output;
			$J(this).find('.economy_item_hoverable').each(function() {
				var data = $J(this).find(".history_item_name").eq(0).data();
				//console.log(data);
				if (data.itemType.internal_name == internalData.container) {
					typeOfCase = data;
				} else if (data.transferDir == "+") {
					output = data;
				}
			})
			var unbox = {
				timeFrame: {
					quarter: quarter,
					year: year,
					month: monthStr,
					day: day
				},
				container: typeOfCase,
				item: output
			};
			if (typeOfCase.itemInternalName.toLowerCase().includes(languageOption.sel.case.toLowerCase()) || typeOfCase.itemName.toLowerCase().includes(languageOption.english.case.toLowerCase())) {
				gameData.containerUnlocks.case.push(unbox);
			} else if (typeOfCase.itemInternalName.toLowerCase().includes(languageOption.sel.package.toLowerCase()) || typeOfCase.itemName.toLowerCase().includes(languageOption.english.package.toLowerCase())) {
				gameData.containerUnlocks.package.push(unbox);
			} else if (typeOfCase.itemInternalName.toLowerCase().includes(languageOption.sel.capsule.toLowerCase()) || typeOfCase.itemName.toLowerCase().includes(languageOption.english.capsule.toLowerCase())) {
				gameData.containerUnlocks.capsule.push(unbox);
			}
		}

		// game drop
		var maindropTitle;
		var maindropitemTitle;
		if (!validLanguage) {
			maindropTitle = languageOption.english.html.filterOptions.filters.data.caseDrops.main;
			maindropitemTitle = languageOption.english.html.filterOptions.filters.data.itemDrops.main;
		} else {
			maindropTitle = languageOption[steamLanguage].html.filterOptions.filters.data.caseDrops.main;
			maindropitemTitle = languageOption[steamLanguage].html.filterOptions.filters.data.itemDrops.main;
		}
		if ($J(this).find(".tradehistory_event_description").eq(0).text().includes(maindropTitle) || $J(this).find(".tradehistory_event_description").eq(0).text().includes(maindropitemTitle)) {
			var data = $J(this).find('.history_item_name').eq(0).data();
			var drop = {
				timeFrame: {
					quarter: quarter,
					year: year,
					month: monthStr,
					day: day
				},
				item: data
			};
			if (data.itemType.internal_name == internalData.graffiti) {
				gameData.gameDrops.graffiti.push(drop);
			} else if (data.itemType.internal_name == internalData.container) {
				gameData.gameDrops.case.push(drop);
			} else { // drop is skin
				gameData.gameDrops.skin.push(drop);
			}
		}

	})
	$Jnew.find('.economy_item_hoverable').each( function( index ) {
		var rgAppDescriptions = rgDescriptions[$J(this).data('appid')];
		if ( rgAppDescriptions )
		{
			var rgItemDescription = rgDescriptions[$J( this ).data( 'appid' )][$J( this ).data( 'classid' ) + '_' + $J( this ).data( 'instanceid' )];
			//console.log(rgItemDescription);
			if ( rgItemDescription )
			{
				rgItem = {
					appid: $J(this).data( 'appid' ),
					contextid: $J(this).data( 'contextid' ),
					amount: $J(this).data( 'amount' ),
					description: Object.assign( rgItemDescription )
				};

				if ( $J(this).data( 'currencyid' ) )
				{
					rgItem.currency = true;
					rgItem.currencyid = $J(this).data( 'currencyid' );
				}
				else
				{
					rgItem.is_stackable = rgItem.amount > 1;
				}

				//console.log("pass");
				//AddItemHoverToElement( $J(this).attr( 'id' ), rgItem );
			}
		}
	} );
}

var too_many_req = false;
var start_time = 0;
function InventoryHistory_LoadAll()
{
	if (loadedAllHistory) {
		ShowAlertDialog(languageOption.sel.messages.historyErrorTitle, languageOption.sel.messages.historyErrorDesc, languageOption.sel.messages.close);
		return;
	}
	// variables
	var apps = [];
	var profileURL = window.location.href.split("/inventoryhistory/")[0];
	if (window.location.href.includes("?")) {
		window.location.href.split("?")[1].split("&").forEach(app => {
			apps.push(parseInt(app.split("=")[1]));
		});
	}

	// perperations
	$J('#load_more_button').hide();
	$J("#Loading_For_Rows_Dialog").show();
	
	
	// Start
	var request_data = {
		ajax: 1,
		cursor: cursurHistory,
		sessionid: sessionID
	};

	if ( apps && apps.length > 0 )
	{
		request_data.app = apps;
	}

	var prevCursor = cursurHistory;

	if (too_many_req && (Date.now() - start_time < 60*1000)) {
		var time_display = (Math.round((60-((Date.now() - start_time)/1000))*10)/10).toString();
		if (!time_display.includes(".")) { time_display = time_display+".0" }
		$J("#steam_Inv_Loader_Message").text(languageOption.sel.messages.timerText.pre+time_display+languageOption.sel.messages.timerText.post);
		//console.log(((Date.now() - start_time)/1000));
		if (continueLOading) {
			setTimeout(InventoryHistory_LoadAll, 100);
		} else {
			too_many_req = false;
			continueLOading = true;
			$J("#steam_Inv_Loader_Win_Btn_Txt").text(languageOption.sel.messages.close);
			$J("#steam_Inv_Loader_Message").text(languageOption.sel.messages.historyLoadingStopped);
			$J("#steam_Inv_Loader_Win_Btn").removeClass("steam_Inv_Loader_Win_Stop");
			$J("#steam_Inv_Loader_Win_Btn").addClass("steam_Inv_Loader_Win_Dismiss");
			$J("#steam_Inv_Loader_spin").hide();
			$J("#steam_Inv_Loader_Win_FBtn").hide();
		}
		return;
	}
	
	if (!validLanguage) {
		document.cookie = "Steam_Language=english;priority=high;path=/";
	}

	$J.ajax({
		type: "GET",
		url: profileURL + "/inventoryhistory/",
		data: request_data
	}).done( function( data ) {
		if ( data.success )
		{
			for ( var appid in data.apps )
			{
				g_rgAppContextData[appid] = data.apps[appid];
			}

			if (loadPartial == 0) {
				start_time = Date.now();
			}

			too_many_req = false;
			$J("#steam_Inv_Loader_Message").text(languageOption.sel.messages.loadingInProgressText);
			$J('#inventory_history_count_rows').text( parseInt( $J('#inventory_history_count_rows').text() ) + data.num );
			$J('#inventory_history_count').text( parseInt( $J('#inventory_history_count').text() ) + data.num );
			$J('#inventory_history_loop_count').text( parseInt( $J('#inventory_history_loop_count').text() ) + 1 );
			var unix_timestamp;
			if (data.cursor) {
				unix_timestamp = data.cursor;
			} else {
				unix_timestamp = prevCursor;
			}
			var date = new Date(unix_timestamp.time * 1000);
			var year = date.getFullYear().toString();
			var month = languageOption.sel.largeMonths[date.getMonth()];
			var day = date.getDate().toString();
			var formattedDate = day + ' ' + month + ' ' + year;
			$J('#inventory_history_load_date').text(formattedDate);

			if ( data.html )
			{
				var elem_prev = $J('#inventory_history_table').children().last();

				if (loadAllAmount == 0) {
					loadAllAmount++;
					$J('#inventory_history_table').empty();
					$J('#inventory_history_count').text("50");
					$J('#inventory_history_table').append( data.html );
					var new_elems = $J('#inventory_history_table').children();
				} else {
					$J('#inventory_history_table').append( data.html );
					var new_elems = elem_prev.nextAll();
				}

				//new_elems.hide();
				//new_elems.fadeIn( 200 );

				InventoryHistory_BindTooltips( new_elems, data.descriptions );
				InventoryHistory_AddData( new_elems, data.descriptions );
				InventoryHistory_AddStatsData( new_elems, data.descriptions );
			}

			if ( data.cursor )
			{
				cursurHistory = data.cursor;
				// Run again
				loadAllAmount++;
				loadPartial++;
				
				if (continueLOading) {
					InventoryHistory_LoadAll();
				} else {
					continueLOading = true;
					$J("#steam_Inv_Loader_Win_Btn_Txt").text(languageOption.sel.messages.close);
					$J("#steam_Inv_Loader_Message").text(languageOption.sel.messages.historyLoadingStopped);
					$J("#steam_Inv_Loader_Win_Btn").removeClass("steam_Inv_Loader_Win_Stop");
					$J("#steam_Inv_Loader_Win_Btn").addClass("steam_Inv_Loader_Win_Dismiss");
					$J("#steam_Inv_Loader_spin").hide();
					$J("#steam_Inv_Loader_Win_FBtn").hide();
				}
			}
			else
			{
				// stop loading
				loadedAllHistory = true;
				$J("#steam_Inv_Loader_Win_Btn_Txt").text(languageOption.sel.messages.close);
				$J("#steam_Inv_Loader_Message").text(languageOption.sel.messages.historyLoadingDone);
				$J("#steam_Inv_Loader_Win_Btn").removeClass("steam_Inv_Loader_Win_Stop");
				$J("#steam_Inv_Loader_Win_Btn").addClass("steam_Inv_Loader_Win_Dismiss");
				$J("#steam_Inv_Loader_spin").hide();
				$J("#steam_Inv_Loader_Win_FBtn").hide();

				$J( '#load_more_button' ).hide();
			}
		}
		else
		{
			cursurHistory = prevCursor;

			if ( data.error )
			{
				ShowAlertDialog( languageOption.sel.messages.error, data.error, languageOption.sel.messages.ok );
				//alert("Error //fix real Dialog! "+data.error)
			}
		}
	}).fail( function( jqXHR ) {
		cursurHistory = prevCursor;

		if ( jqXHR.status == 429 )
		{
			too_many_req = true;
			loadPartial = 0;
			$J("#steam_Inv_Loader_spin").hide();
			$J("#steam_Inv_Loader_Message").text(languageOption.sel.messages.timerAltText);
			InventoryHistory_LoadAll();
			//alert("Too many requests //fix real Dialog!")
			//ShowAlertDialog( 'Error', 'You\'ve made too many requests recently. Please wait and try your request again later.', 'OK' );
		}
		else if ( jqXHR.status == 503 )
		{
			ShowAlertDialog( languageOption.sel.messages.error, languageOption.sel.messages.steamServiceUnavailable, languageOption.sel.messages.ok );
			continueLOading = false;
		}
		else
		{
			continueLOading = false;
			ShowAlertDialog( languageOption.sel.messages.error, languageOption.sel.messages.otherErrorMessage, languageOption.sel.messages.ok );
		}
	}).always( function() {
		$J('#inventory_history_loading').hide();
	});
	
}

function InventoryHistory_Load50More()
{

	// variables
	var apps = [];
	var profileURL = window.location.href.split("/inventoryhistory/")[0];
	if (window.location.href.includes("?")) {
		window.location.href.split("?")[1].split("&").forEach(app => {
			if (app.split("=")[0] == "app%5B%5D") {
				apps.push(parseInt(app.split("=")[1]));
			} else if (app.split("=")[0] == "start_time") {
				cursurHistory = parseInt(app.split("=")[1]);
			}
		});
	}

	// perperations
	$J('#load_more_button').hide();
	
	// Start
	var request_data = {
		ajax: 1,
		cursor: {
			time: cursurHistory
		},
		sessionid: sessionID
	};

	if ( apps && apps.length > 0 )
	{
		request_data.app = apps;
	}

	var prevCursor = cursurHistory;
	
	if (!validLanguage) {
		document.cookie = "Steam_Language=english;priority=high;path=/";
	}

	$J.ajax({
		type: "GET",
		url: profileURL + "/inventoryhistory/",
		data: request_data
	}).done( function( data ) {
		if ( data.success )
		{
			for ( var appid in data.apps )
			{
				g_rgAppContextData[appid] = data.apps[appid];
			}

			if (loadPartial == 0) {
				start_time = Date.now();
			}

			too_many_req = false;
			$J("#steam_Inv_Loader_Message").text(languageOption.sel.messages.loadingInProgressText);
			$J('#inventory_history_count_rows').text( parseInt( $J('#inventory_history_count_rows').text() ) + data.num );
			$J('#inventory_history_count').text( parseInt( $J('#inventory_history_count').text() ) + data.num );
			$J('#inventory_history_loop_count').text( parseInt( $J('#inventory_history_loop_count').text() ) + 1 );
			var unix_timestamp;
			if (data.cursor) {
				unix_timestamp = data.cursor;
			} else {
				unix_timestamp = prevCursor;
			}
			var date = new Date(unix_timestamp.time * 1000);
			var year = date.getFullYear().toString();
			var month = languageOption.sel.largeMonths[date.getMonth()];
			var day = date.getDate().toString();
			var formattedDate = day + ' ' + month + ' ' + year;
			$J('#inventory_history_load_date').text(formattedDate);

			if ( data.html )
			{
				var elem_prev = $J('#inventory_history_table').children().last();

				if (loadAllAmount == 0) {
					loadAllAmount++;
					$J('#inventory_history_table').empty();
					$J('#inventory_history_count').text("50");
					$J('#inventory_history_table').append( data.html );
					var new_elems = $J('#inventory_history_table').children();
				} else {
					$J('#inventory_history_table').append( data.html );
					var new_elems = elem_prev.nextAll();
				}

				//new_elems.hide();
				//new_elems.fadeIn( 200 );

				InventoryHistory_BindTooltips( new_elems, data.descriptions );
				InventoryHistory_AddData( new_elems, data.descriptions );
				InventoryHistory_AddStatsData( new_elems, data.descriptions );
			}

			if ( data.cursor )
			{
				cursurHistory = data.cursor;
				// Run again
				loadAllAmount++;
				loadPartial++;
			}
		}
		else
		{
			cursurHistory = prevCursor;

			if ( data.error )
			{
				ShowAlertDialog( languageOption.sel.messages.error, data.error, languageOption.sel.messages.ok );
				//alert("Error //fix real Dialog! "+data.error)
			}
		}
	}).fail( function( jqXHR ) {
		cursurHistory = prevCursor;

		if ( jqXHR.status == 429 )
		{
			ShowAlertDialog( languageOption.sel.messages.error, 'You\'ve made too many requests recently. Please wait and try your request again later.', languageOption.sel.messages.ok );
		}
		else if ( jqXHR.status == 503 )
		{
			ShowAlertDialog( languageOption.sel.messages.error, languageOption.sel.messages.steamServiceUnavailable, languageOption.sel.messages.ok );
		}
		else
		{
			ShowAlertDialog( languageOption.sel.messages.error, languageOption.sel.messages.otherErrorMessage, languageOption.sel.messages.ok );
		}
	}).always( function() {
		$J('#inventory_history_loading').hide();
	});
	
}