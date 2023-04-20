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

				console.log("pass");
				AddItemHoverToElement( $J(this).attr( 'id' ), rgItem );
			}
		}
	} );
}

function InventoryHistory_LoadAll()
{
	// variables
	var apps = [];
	var profileURL = window.location.href.split("/inventoryhistory/")[0];
	if (window.location.href.includes("?")) {
		window.location.href.split("?")[1].split("&").forEach(app => {
			apps.push(parseInt(app.split("=")[1]));
		});
	}

	// perperations
	$J("#Loading_For_Rows_Dialog").removeClass("steam_filter_hide_class");
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
	cursurHistory = null;

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

			if (loadAllAmount == 0) {
				loadAllAmount++;
				if ( data.cursor )
				{
					cursurHistory = data.cursor;
				}
				InventoryHistory_LoadAll();
				return;
			}

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
				if (loadAllAmount % 250 !== 0) {
					//window.scrollTo(0, document.body.scrollHeight);
					if (continueLOading) {
						InventoryHistory_LoadAll();
					} else {
						$J("#steam_Inv_Loader_Win_Btn_Txt").text("CLOSE");
						$J("#steam_Inv_Loader_Message").text("The history loading have stopped.");
						$J("#steam_Inv_Loader_Win_Btn").removeClass("steam_Inv_Loader_Win_Stop");
						$J("#steam_Inv_Loader_Win_Btn").addClass("steam_Inv_Loader_Win_Dismiss");
						$J("#steam_Inv_Loader_spin").addClass("steam_filter_hide_class");
					}
					
				}else {
					$J( '#load_more_button' ).fadeIn( 50 );
				}
			}
			else
			{
				// stop loading
				$J( '#load_more_button' ).hide();
			}
		}
		else
		{
			cursurHistory = prevCursor;
			$J( '#load_more_button' ).fadeIn( 50 );

			if ( data.error )
			{
				//ShowAlertDialog( 'Error', data.error, 'OK' );
				alert("Error //fix real Dialog! "+data.error)
			}
		}
	}).fail( function( jqXHR ) {
		cursurHistory = prevCursor;

		if ( jqXHR.status == 429 )
		{
			// wait & continue
			alert("Too many requests //fix real Dialog!")
			//ShowAlertDialog( 'Error', 'You\'ve made too many requests recently. Please wait and try your request again later.', 'OK' );
		}
		else
		{
			alert("Error - problem loading inventory history //fix real Dialog!")
			//ShowAlertDialog( 'Error', 'There was a problem loading your inventory history.', 'OK' );
			$J( '#load_more_button' ).fadeIn( 50 );
		}
	}).always( function() {
		$J('#inventory_history_loading').hide();
	});

	//InventoryHistory_LoadMore()
	//window.scrollTo(0, document.body.scrollHeight);
	
}

function InventoryHistory_InitMessages()
{
	$J('.inventory_history_message').each( function( index ) {
		var $JelMessage = $J(this);
		var $JelDetails = $J(this).find('.inventory_history_message_more');
		if ( $JelDetails.length > 0 )
		{
			var $JelMore = $J( '<div class="showmore"><span>Show more</span></div>' );
			$JelMore.click( function ()
			{
				$JelMore.slideUp();
				$JelDetails.slideDown();
			} );
			$JelMessage.append( $JelMore );
		}

		if (typeof(Storage) == "undefined" || !$JelMessage.hasClass('dismissable') )
		{
			$JelMessage.show();
		}
		else
		{
			// Check local storage to see if the user has dismissed this recently.
			var strLocalStorageKey = 'dismissed_' + $JelMessage.attr( 'id' );
			var rtNow = Date.now()/1000;
			var rtDismissed = parseInt( localStorage.getItem( strLocalStorageKey ) );
			if ( rtDismissed === null || isNaN( rtDismissed ) || rtNow > rtDismissed + (60 * 60 * 24 * 180) )
			{
				// Add a dismiss option
				var $JelDismiss = $J('<div class="dismiss"></div>');
				$JelDismiss.click( function() {
					localStorage.setItem( strLocalStorageKey, rtNow );
					$JelMessage.slideUp();
				} );
				$JelMessage.prepend( $JelDismiss );
				$JelMessage.show();
			}
		}
	} );
}

HistoryFiltersDialog = {
	m_bInitialized: false,

	m_fnDocumentKeyHandler: null,
	m_modal: null,

	Initialize: function() {
	},

	Show: function () {
		if ( !this.m_bInitialized )
			this.Initialize();

		this.m_fnDocumentKeyHandler = this.OnDocumentKeyPress.bindAsEventListener( this );
		$J(document).observe( 'keydown', this.m_fnDocumentKeyHandler );

		var _this = this;
		this.m_modal = ShowDialog( 'Filter options', $J('#inventory_history_filters_dialog' ).show() );
		this.m_modal.SetRemoveContentOnDismissal( false );
		this.m_modal.always( function() { _this.Dismiss(); } );
		$J('inventory_history_filters_dialog').focus();
	},

	Dismiss: function() {
		$J(document).stopObserving( 'keydown', this.m_fnDocumentKeyHandler );
		if ( this.m_modal )
		{
			this.m_modal.Dismiss();
			this.m_modal = null;
		}
	},

	OnCancel: function( event ) {
		this.Dismiss();
		event.stop();
	},

	OnDocumentKeyPress: function( event ) {
		if ( event.keyCode == Event.KEY_ESC )
		{
			this.Dismiss();
			event.stop();
		}
	}
};

function ShowHistoryFilterOptions()
{
	HistoryFiltersDialog.Show();
}

function ResetHistoryFilterOptions()
{
	$J('.econ_tag_filter_container input[type="checkbox"]').attr("checked", false);
	$J('.econ_tag_filter_category select').val( 'any' );
}


