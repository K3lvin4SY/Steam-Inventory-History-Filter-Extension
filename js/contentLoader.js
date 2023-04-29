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
    return "Invalid month number. Month number must be between 1 and 12.";
  }
}

function InventoryHistory_AddData( $Jnew, rgDescriptions )
{
	$Jnew.each(function() {
		$J(this).find('.tradehistory_items').each(function() {
			var plusminus = $J(this).find(".tradehistory_items_plusminus").eq(0).text();
			$J(this).find(".economy_item_hoverable").each(function() {
				var rgAppDescriptions = rgDescriptions[$J(this).data('appid')];
				if ( rgAppDescriptions && parseInt($J( this ).data( 'appid' )) == 730)
				{
					var rgItemDescription = rgDescriptions[$J( this ).data( 'appid' )][$J( this ).data( 'classid' ) + '_' + $J( this ).data( 'instanceid' )];
					var itemString = rgItemDescription.market_name;

					var tags = rgItemDescription.tags;
					var collection = null;
					var exterior = null;
					var rarity = null;
					var type = null;
					var weapon = null;
					var quality = null;
					var name = rgItemDescription.market_name;
					for (let index = 0; index < tags.length; index++) {
						const element = tags[index];
						if (element.category == "ItemSet") {
							collection = element.name;
						}
						if (element.category == "Rarity") {
							rarity = element.name;
						}
						if (element.category == "Type") {
							type = element.name;
						}
						if (element.category == "Weapon") {
							weapon = element.name;
						}
						if (element.category == "Exterior") {
							exterior = element.name;
						}
						if (element.category == "Quality") {
							quality = element.name;
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
				}
			})
		})
	})
}

function InventoryHistory_GetStatsData(itemName) {
	var itemListData = [];
	$J("#inventory_history_table").find(".tradehistoryrow").each(function() {
		var year = $J(this).find(".tradehistory_date").eq(0).text().replace(" ", "").split(",")[1];
		var mon = $J(this).find(".tradehistory_date").eq(0).text().replace(" ", "").split(",")[0].replace(/[0-9]/g, '');
		var month = getMonthFromString(mon);
		var quarter = getQuarter(month);
		var day = $J(this).find(".tradehistory_date").eq(0).text().replace(" ", "").split(",")[0].replace(/[a-zA-Z]/g, "");

		$J(this).find(".history_item_name").each(function() {
			var data = $J(this).data();
			if (data.itemName.toLowerCase().includes(itemName.toLowerCase())) {
				var itemData = {
					timeFrame: {
						quarter: quarter,
						year: year,
						month: month,
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

function InventoryHistory_AddStatsData( $Jnew, rgDescriptions )
{
	$Jnew.each(function() {
		var year = $J(this).find(".tradehistory_date").eq(0).text().replace(" ", "").split(",")[1];
		var mon = $J(this).find(".tradehistory_date").eq(0).text().replace(" ", "").split(",")[0].replace(/[0-9]/g, '');
		var month = getMonthFromString(mon);
		var quarter = getQuarter(month);
		var day = $J(this).find(".tradehistory_date").eq(0).text().replace(" ", "").split(",")[0].replace(/[a-zA-Z]/g, "");

		// container unbox
		if ($J(this).find(".tradehistory_event_description").eq(0).text().includes(languageOption.sel.uac)) {
			var typeOfCase;
			var output;
			$J(this).find('.economy_item_hoverable').each(function() {
				var data = $J(this).find(".history_item_name").eq(0).data();
				//console.log(data);
				if (data.itemType == languageOption.sel.container) {
					typeOfCase = data;
				} else if (data.transferDir == "+") {
					output = data;
				}
			})
			var unbox = {
				timeFrame: {
					quarter: quarter,
					year: year,
					month: month,
					day: day
				},
				container: typeOfCase,
				item: output
			};
			if (typeOfCase.itemName.includes(languageOption.sel.case)) {
				gameData.containerUnlocks.case.push(unbox);
			} else if (typeOfCase.itemName.includes(languageOption.sel.package)) {
				gameData.containerUnlocks.package.push(unbox);
			} else if (typeOfCase.itemName.includes(languageOption.sel.capsule)) {
				gameData.containerUnlocks.capsule.push(unbox);
			}
		}

		// game drop
		if ($J(this).find(".tradehistory_event_description").eq(0).text().includes(languageOption.sel.gaid) || $J(this).find(".tradehistory_event_description").eq(0).text().includes(languageOption.sel.eanragad)) {
			var data = $J(this).find('.history_item_name').eq(0).data();
			var drop = {
				timeFrame: {
					quarter: quarter,
					year: year,
					month: month,
					day: day
				},
				item: data
			};
			if (data.itemType == languageOption.sel.graffiti) {
				gameData.gameDrops.graffiti.push(drop);
			} else if (data.itemType == languageOption.sel.container) {
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
		ShowAlertDialog("History Loading error", "You have already loaded all your history", "CLOSE");
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
		$J("#steam_Inv_Loader_Message").text("Taking a "+time_display+" sec break due to making too many requests...");
		//console.log(((Date.now() - start_time)/1000));
		if (continueLOading) {
			setTimeout(InventoryHistory_LoadAll, 100);
		} else {
			too_many_req = false;
			continueLOading = true;
			$J("#steam_Inv_Loader_Win_Btn_Txt").text("CLOSE");
			$J("#steam_Inv_Loader_Message").text("The history loading have stopped.");
			$J("#steam_Inv_Loader_Win_Btn").removeClass("steam_Inv_Loader_Win_Stop");
			$J("#steam_Inv_Loader_Win_Btn").addClass("steam_Inv_Loader_Win_Dismiss");
			$J("#steam_Inv_Loader_spin").addClass("steam_filter_hide_class");
			$J("#steam_Inv_Loader_Win_FBtn").addClass("steam_filter_hide_class");
		}
		return;
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
			if (loadAllAmount == 0) {
				loadAllAmount++;
				if ( data.cursor )
				{
					cursurHistory = data.cursor;
				}
				InventoryHistory_LoadAll();
				return;
			}

			too_many_req = false;
			$J("#steam_Inv_Loader_Message").text("Please wait while all the history is being loaded...");
			$J("#Loading_For_Rows_Dialog").removeClass("steam_filter_hide_class");
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
			var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()];
			var day = date.getDate().toString();
			var formattedDate = day + ' ' + month + ' ' + year;
			$J('#inventory_history_load_date').text(formattedDate);

			if ( data.html )
			{
				var elem_prev = $J('#inventory_history_table').children().last();

				$J('#inventory_history_table').append( data.html );

				var new_elems = elem_prev.nextAll();
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
					$J("#steam_Inv_Loader_Win_Btn_Txt").text("CLOSE");
					$J("#steam_Inv_Loader_Message").text("The history loading have stopped.");
					$J("#steam_Inv_Loader_Win_Btn").removeClass("steam_Inv_Loader_Win_Stop");
					$J("#steam_Inv_Loader_Win_Btn").addClass("steam_Inv_Loader_Win_Dismiss");
					$J("#steam_Inv_Loader_spin").addClass("steam_filter_hide_class");
					$J("#steam_Inv_Loader_Win_FBtn").addClass("steam_filter_hide_class");
				}
			}
			else
			{
				// stop loading
				loadedAllHistory = true;
				$J("#steam_Inv_Loader_Win_Btn_Txt").text("CLOSE");
				$J("#steam_Inv_Loader_Message").text("All the history data has been loaded.");
				$J("#steam_Inv_Loader_Win_Btn").removeClass("steam_Inv_Loader_Win_Stop");
				$J("#steam_Inv_Loader_Win_Btn").addClass("steam_Inv_Loader_Win_Dismiss");
				$J("#steam_Inv_Loader_spin").addClass("steam_filter_hide_class");
				$J("#steam_Inv_Loader_Win_FBtn").addClass("steam_filter_hide_class");

				$J( '#load_more_button' ).hide();
			}
		}
		else
		{
			cursurHistory = prevCursor;
			$J( '#load_more_button' ).fadeIn( 50 );

			if ( data.error )
			{
				ShowAlertDialog( 'Error', data.error, 'OK' );
				//alert("Error //fix real Dialog! "+data.error)
			}
		}
	}).fail( function( jqXHR ) {
		cursurHistory = prevCursor;

		if ( jqXHR.status == 429 )
		{
			too_many_req = true;
			loadPartial = 0;
			$J("#steam_Inv_Loader_spin").addClass("steam_filter_hide_class");
			$J("#steam_Inv_Loader_Message").text("Taking a small break due to making too many requests...");
			InventoryHistory_LoadAll();
			//alert("Too many requests //fix real Dialog!")
			//ShowAlertDialog( 'Error', 'You\'ve made too many requests recently. Please wait and try your request again later.', 'OK' );
		}
		else if ( jqXHR.status == 503 )
		{
			ShowAlertDialog( 'Error', 'Steam service is currenty unavailable.', 'OK' );
			$J( '#load_more_button' ).fadeIn( 50 );
			continueLOading = false;
		}
		else
		{
			continueLOading = false;
			ShowAlertDialog( 'Error', 'There was a problem loading your inventory history.', 'OK' );
			$J( '#load_more_button' ).fadeIn( 50 );
		}
	}).always( function() {
		$J('#inventory_history_loading').hide();
	});
	
}