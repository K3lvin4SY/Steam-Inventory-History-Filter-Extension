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
		console.log(((Date.now() - start_time)/1000));
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