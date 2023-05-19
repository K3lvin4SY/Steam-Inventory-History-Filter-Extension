// Dialog handler
function ShowAlertDialog(title, desc, btn) {
	$J("#steam_filter_alert_Win_Title_Text").text(title);
	$J("#steam_filter_alert_Message").text(desc);
	$J("#steam_filter_alert_Win_Btn_Txt").text(btn);
	$J("#steam_filter_alert_Dialog").show();

	continueLOading = false;
	$J("#Loading_For_Rows_Dialog").hide();
	$J("#steam_Inv_Loader_Win_Btn_Txt").text(languageOption.sel.messages.stop);
	$J("#steam_Inv_Loader_Win_Title_Text").text(languageOption.sel.messages.loadingHistory);
	$J("#steam_Inv_Loader_Win_Btn").addClass("steam_Inv_Loader_Win_Stop");
	$J("#steam_Inv_Loader_Win_Btn").removeClass("steam_Inv_Loader_Win_Dismiss");
	$J("#steam_Inv_Loader_spin").show();
	$J("#steam_Inv_Loader_Message").text(languageOption.sel.messages.loadingInProgressText);
}