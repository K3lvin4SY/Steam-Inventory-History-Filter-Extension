var sessionID;
var steamLanguage;
var cursurHistory;
var g_rgAppContextData = [];
var continueLOading = true;
var loadedAllHistory = false;

var gameData = {
  containerUnlocks: {
    case: [],
    capsule: [],
    package: []
  },
  gameDrops: {
    case: [],
    skin: [],
    graffiti: []
  }
};

var languageOption = {
  sel: {
    case: "Case",
    package: "Package",
    capsule: "Capsule",
    uac: "Unlocked a container",
    container: "Container",
    gaid: "Got an item drop",
    eanragad: "Earned a new rank and got a drop",
    graffiti: "Graffiti",
    messages: {
      invalidMonth: "Invalid month number. Month number must be between 1 and 12.",
      historyErrorTitle: "History Loading error",
      historyErrorDesc: "You have already loaded all your history",
      close: "CLOSE",
      historyLoadingStopped: "The history loading have stopped.",
      historyLoadingDone: "All the history data has been loaded.",
      timerText: {
        pre: "Taking a ",
        post: " sec break due to making too many requests..."
      },
      loadingInProgressText: "Please wait while all the history is being loaded...",
      timerAltText: "Taking a small break due to making too many requests...",
      ok: "OK",
      error: "Error",
      stop: "STOP",
      steamServiceUnavailable: "Steam service is currenty unavailable.",
      otherErrorMessage: "There was a problem loading your inventory history.",
      loadingHistory: "Loading History"
    },
    html: {
      toolbar: {
        searchEngine: "Search Engine",
        loadHistory: "Load History",
        statistics: "Statistics",
        openFilter: "Filter Options",
        options: "Options"
      },
      simpleSearch: {
        searchBarLabel: "Search",
        includeSearchOutsideFilters: "Include search outside filters",
        advanced: "Advanced",
        close: "Close"
      },
      filterOptions: {
        showTitle: "Show",
        altLabel: "Alt. Label",
        buttons: {
          add: "Add",
          showAll: "Show All",
          apply: "Apply",
          hideAll: "Hide All"
        },
        filtersLabel: "Filters",
        filters: {
          labels: {
            caseOpened: "Case Opened",
            souvenirPackageOpened: "Souvenir Package Opened",
            capsuleOpened: "Capsule Opened",
            medals: "Medals",
            storageUnit: "Storage Unit",
            caseDrops: "Case Drops",
            itemDrops: "Item Drops",
            trades: "Trades",
            containerOpened: "Container Opened",
            storePurchases: "Store Purchases",
            marketPurchases: "Market Purchases",
            marketListingCreated: "Market Created Listings",
            marketListingRemoved: "Market Removed Listings",
            used: "Used",
            souvenirDrop: "Souvenir drop",
            tradeUps: "Trade ups",
            stickerApplied: "Sticker applied",
            stickerRemoved: "Sticker removed",
            deletedItem: "Deleted Item",
            unsealedGraffiti: "Unsealed Graffiti",
            missionReward: "Mission Reward (Operations)"
          },
          data: {
            caseOpened: {
              main: "Unlocked a container",
              itemName: "Case Key"
            },
            souvenirPackageOpened: {
              main: "Unlocked a container",
              itemName: "Souvenir Package"
            },
            capsuleOpened: {
              main: "Unlocked a container",
              itemName: "Capsule"
            },
            medals: {
              main: "Earned"
            },
            storageUnit: {
              main: "Moved to Storage Unit"
            },
            caseDrops: {
              main: "Got an item drop"
            },
            itemDrops: {
              main: "Earned a new rank and got a drop"
            },
            trades: {
              main: "You traded with "
            },
            containerOpened: {
              main: "Unlocked a container"
            },
            storePurchases: {
              main: "Purchased from the store"
            },
            marketPurchases: {
              main: "You purchased an item on the Community Market."
            },
            marketListingCreated: {
              main: "You listed an item on the Community Market."
            },
            marketListingRemoved: {
              main: "You canceled a listing on the Community Market. The item was returned to you."
            },
            used: {
              main: "Used"
            },
            souvenirDrop: {
              main: "Earned a souvenir drop"
            },
            tradeUps: {
              main: "Crafted"
            },
            stickerApplied: {
              main: "Sticker applied"
            },
            stickerRemoved: {
              main: "Sticker removed"
            },
            deletedItem: {
              main: "You deleted"
            },
            unsealedGraffiti: {
              main: "Unsealed"
            },
            missionReward: {
              main: "Mission reward"
            }
          }
        }
      }
    }
  },
  english: {
    case: "Case",
    package: "Package",
    capsule: "Capsule",
    uac: "Unlocked a container",
    container: "Container",
    gaid: "Got an item drop",
    eanragad: "Earned a new rank and got a drop",
    graffiti: "Graffiti",
    messages: {
      invalidMonth: "Invalid month number. Month number must be between 1 and 12.",
      historyErrorTitle: "History Loading error",
      historyErrorDesc: "You have already loaded all your history",
      close: "CLOSE",
      historyLoadingStopped: "The history loading have stopped.",
      historyLoadingDone: "All the history data has been loaded.",
      timerText: {
        pre: "Taking a ",
        post: " sec break due to making too many requests..."
      },
      loadingInProgressText: "Please wait while all the history is being loaded...",
      timerAltText: "Taking a small break due to making too many requests...",
      ok: "OK",
      error: "Error",
      stop: "STOP",
      steamServiceUnavailable: "Steam service is currenty unavailable.",
      otherErrorMessage: "There was a problem loading your inventory history.",
      loadingHistory: "Loading History"
    },
    html: {
      toolbar: {
        searchEngine: "Search Engine",
        loadHistory: "Load History",
        statistics: "Statistics",
        openFilter: "Filter Options",
        options: "Options"
      },
      simpleSearch: {
        searchBarLabel: "Search",
        includeSearchOutsideFilters: "Include search outside filters",
        advanced: "Advanced",
        close: "Close"
      },
      filterOptions: {
        showTitle: "Show",
        altLabel: "Alt. Label",
        buttons: {
          add: "Add",
          showAll: "Show All",
          apply: "Apply",
          hideAll: "Hide All"
        },
        filtersLabel: "Filters",
        filters: {
          labels: {
            caseOpened: "Case Opened",
            souvenirPackageOpened: "Souvenir Package Opened",
            capsuleOpened: "Capsule Opened",
            medals: "Medals",
            storageUnit: "Storage Unit",
            caseDrops: "Case Drops",
            itemDrops: "Item Drops",
            trades: "Trades",
            containerOpened: "Container Opened",
            storePurchases: "Store Purchases",
            marketPurchases: "Market Purchases",
            marketListingCreated: "Market Created Listings",
            marketListingRemoved: "Market Removed Listings",
            used: "Used",
            souvenirDrop: "Souvenir drop",
            tradeUps: "Trade ups",
            stickerApplied: "Sticker applied",
            stickerRemoved: "Sticker removed",
            deletedItem: "Deleted Item",
            unsealedGraffiti: "Unsealed Graffiti",
            missionReward: "Mission Reward (Operations)"
          },
          data: {
            caseOpened: {
              main: "Unlocked a container",
              itemName: "Case Key"
            },
            souvenirPackageOpened: {
              main: "Unlocked a container",
              itemName: "Souvenir Package"
            },
            capsuleOpened: {
              main: "Unlocked a container",
              itemName: "Capsule"
            },
            medals: {
              main: "Earned"
            },
            storageUnit: {
              main: "Moved to Storage Unit"
            },
            caseDrops: {
              main: "Got an item drop"
            },
            itemDrops: {
              main: "Earned a new rank and got a drop"
            },
            trades: {
              main: "You traded with "
            },
            containerOpened: {
              main: "Unlocked a container"
            },
            storePurchases: {
              main: "Purchased from the store"
            },
            marketPurchases: {
              main: "You purchased an item on the Community Market."
            },
            marketListingCreated: {
              main: "You listed an item on the Community Market."
            },
            marketListingRemoved: {
              main: "You canceled a listing on the Community Market. The item was returned to you."
            },
            used: {
              main: "Used"
            },
            souvenirDrop: {
              main: "Earned a souvenir drop"
            },
            tradeUps: {
              main: "Crafted"
            },
            stickerApplied: {
              main: "Sticker applied"
            },
            stickerRemoved: {
              main: "Sticker removed"
            },
            deletedItem: {
              main: "You deleted"
            },
            unsealedGraffiti: {
              main: "Unsealed"
            },
            missionReward: {
              main: "Mission reward"
            }
          }
        }
      }
    }
  },
  swedish: {
    case: "låda",
    package: "Package",
    capsule: "Capsule",
    uac: "Öppnade en låda",
    container: "Behållare",
    gaid: "Hittade ett föremål",
    eanragad: "Uppnådde en ny rang och hittade ett föremål",
    graffiti: "Graffiti",
    messages: {
      invalidMonth: "Ogiltigt månadsnummer. Månadsnummer måste vara mellan 1 och 12.",
      historyErrorTitle: "Historik Laddnings fel",
      historyErrorDesc: "Du har redan laddat in all din historik",
      close: "STÄNG",
      historyLoadingStopped: "Historieladdningen har stoppats.",
      historyLoadingDone: "All historikdata har blivit laddat.",
      timerText: {
        pre: "Tar en ",
        post: " sek paus på grund av för många förfrågningar..."
      },
      loadingInProgressText: "Snälla vänta medan all historik laddas...",
      timerAltText: "Tar en liten paus på grund av för många förfrågningar...",
      ok: "OK",
      error: "Fel",
      stop: "STOP",
      steamServiceUnavailable: "Steam-tjänsten är för närvarande inte tillgänglig.",
      otherErrorMessage: "Det gick inte att läsa in din lagerhistorik.",
      loadingHistory: "Laddnings Historik"
    },
    html: {
      toolbar: {
        searchEngine: "Sök Motor",
        loadHistory: "Ladda Historik",
        statistics: "Statestik",
        openFilter: "Filter Alternativ",
        options: "Inställningar"
      },
      simpleSearch: {
        searchBarLabel: "Sök",
        includeSearchOutsideFilters: "Inkludera sök utanför filtreringen",
        advanced: "Advancerat",
        close: "Stäng"
      },
      filterOptions: {
        showTitle: "Visa",
        altLabel: "Etikett",
        buttons: {
          add: "Lägg till",
          showAll: "Visa Alla",
          apply: "Applicera",
          hideAll: "Göm Alla"
        },
        filtersLabel: "Filtren",
        filters: {
          labels: {
            caseOpened: "Låda Öppnad",
            souvenirPackageOpened: "Souvenir Package Öppnad",
            capsuleOpened: "Capsule Öppnad",
            medals: "Medals",
            storageUnit: "Lagringsenhets flyttningar",
            caseDrops: "Hittade Lådor",
            itemDrops: "Hittade ",
            trades: "Byten",
            containerOpened: "Behållare Öppnad",
            storePurchases: "Butiks köp",
            marketPurchases: "Marknads köp",
            marketListingCreated: "Skapade Marknads Artiklar",
            marketListingRemoved: "Avbrytna Marknads Artiklar",
            used: "Använt",
            souvenirDrop: "Hittade Souvenirs",
            tradeUps: "Tillvärkningar",
            stickerApplied: "Klistermärke applicerat",
            stickerRemoved: "Klistermärke borttaget",
            deletedItem: "Raderade Föremål",
            unsealedGraffiti: "Öppnade Graffiti",
            missionReward: "Uppdragsbelöning (Operationer)"
          },
          data: {
            caseOpened: {
              main: "Öppnade en låda",
              itemName: "nyckel"
            },
            souvenirPackageOpened: {
              main: "Öppnade en låda",
              itemName: "Souvenir Package"
            },
            capsuleOpened: {
              main: "Öppnade en låda",
              itemName: "Capsule"
            },
            medals: {
              main: "Intjänad"
            },
            storageUnit: {
              main: "Flyttades till lagringsenhet"
            },
            caseDrops: {
              main: "Hittade ett föremål"
            },
            itemDrops: {
              main: "Uppnådde en ny rang och hittade ett föremål"
            },
            trades: {
              main: "Du bytte med "
            },
            containerOpened: {
              main: "Öppnade en låda"
            },
            storePurchases: {
              main: "Köpt från butiken"
            },
            marketPurchases: {
              main: "Du köpte ett föremål på gemenskapsmarknaden."
            },
            marketListingCreated: {
              main: "Du lade upp ett föremål på gemenskapsmarknaden."
            },
            marketListingRemoved: {
              main: "Du avbröt en annons på gemenskapsmarknaden. Föremålet återgick till dig."
            },
            used: {
              main: "Använt"
            },
            souvenirDrop: {
              main: "Intjänade ett souvenirföremål"
            },
            tradeUps: {
              main: "Tillverkad"
            },
            stickerApplied: {
              main: "Klistermärke applicerat"
            },
            stickerRemoved: {
              main: "Klistermärke borttaget"
            },
            deletedItem: {
              main: "Du raderade"
            },
            unsealedGraffiti: {
              main: "Öppnade graffiti"
            },
            missionReward: {
              main: "Uppdragsbelöning"
            }
          }
        }
      }
    }
  }
}

// Applies Html and hooks onto script
async function addFilterOptions() {
  const resp = await fetch(chrome.runtime.getURL('./components/filterWindow.html'));
  const html = await resp.text();
  const contentDiv = document.getElementById("BG_bottom");
  contentDiv.insertAdjacentHTML("beforebegin", html);

  const selectedLanguageProperties = languageOption[steamLanguage];
  languageOption["sel"] = selectedLanguageProperties;
  updateHtmlText();
  $J('#steam_filter_language_option').val(steamLanguage);
    
  createButtonLinks();

  loadChartsNDiagrams();
}

const cookies = document.cookie.split("; ")
for (let index = 0; index < cookies.length; index++) {
  const key = cookies[index].split("=")[0];
  const value = cookies[index].split("=")[1];
  if (key == "sessionid") {
    sessionID = value;
  } else if (key == "Steam_Language") {
    steamLanguage = value;
  }
}   
var loadAllAmount = 0;
var loadPartial = 0;
cursurHistory = Math.floor(Date.now() / 1000);

function updateHtmlText() {
  // toolbar //
  $J("#languageText-toolBar-searchEngine").text(languageOption.sel.html.toolbar.searchEngine);
  $J("#languageText-toolBar-loadHistory").text(languageOption.sel.html.toolbar.loadHistory);
  $J("#languageText-toolBar-statistics").text(languageOption.sel.html.toolbar.statistics);
  $J("#languageText-toolBar-openFilter").text(languageOption.sel.html.toolbar.openFilter);
  $J("#languageText-toolBar-options").text(languageOption.sel.html.toolbar.options);

  // simple search //
  $J("#modal-title-simpleSearch").text(languageOption.sel.html.toolbar.searchEngine);
  $J("#modal-includeCheckbox-simpleSearch").text(languageOption.sel.html.simpleSearch.includeSearchOutsideFilters);
  $J("#steam_filter_simple_searchbar_advanced").text(languageOption.sel.html.simpleSearch.advanced);
  $J("#steam_filter_simple_searchbar_win_dismiss_btn").text(languageOption.sel.html.simpleSearch.close);
  $J("#steam_filter_simple_searchbar_search_submit_btn").text(languageOption.sel.html.simpleSearch.searchBarLabel);

  // filter options //
  $J("#steam_filter_Options_Win_Title_Text").text(languageOption.sel.html.toolbar.openFilter);
  $J("#modal-filterOptions-showTitle").text(languageOption.sel.html.filterOptions.showTitle);
  // search panel
  $J("#modal-filterOptions-search-title").text(languageOption.sel.html.toolbar.searchEngine);
  $J("#modal-filterOptions-search-label").text(languageOption.sel.html.simpleSearch.searchBarLabel);
  $J("#modal-filterOptions-search-button").val(languageOption.sel.html.simpleSearch.searchBarLabel);
  $J("#modal-filterOptions-add-button").val(languageOption.sel.html.filterOptions.buttons.add);
  $J("#modal-filterOptions-search-altLabel").text(languageOption.sel.html.filterOptions.altLabel);
  // advanced button
  $J("#steam_filter_searchbar_advanced").text(languageOption.sel.html.simpleSearch.advanced);
  // buttons
  $J("#apply_filter_list").text(languageOption.sel.html.filterOptions.buttons.apply);
  $J("#reset_filter_list").text(languageOption.sel.html.filterOptions.buttons.showAll);
  $J("#hide_all_filter_list").text(languageOption.sel.html.filterOptions.buttons.hideAll);
  // filters data labels
  $J("#modal-filterOptions-filterTitle").text(languageOption.sel.html.filterOptions.filtersLabel);
  $J("#modal-filterOptions-data-showAll").text(languageOption.sel.html.filterOptions.buttons.showAll);
  $J("#modal-filterOptions-data-caseOpened").text(languageOption.sel.html.filterOptions.filters.labels.caseOpened);
  $J("#modal-filterOptions-data-souvenirPackageOpened").text(languageOption.sel.html.filterOptions.filters.labels.souvenirPackageOpened);
  $J("#modal-filterOptions-data-capsuleOpened").text(languageOption.sel.html.filterOptions.filters.labels.capsuleOpened);
  $J("#modal-filterOptions-data-medals").text(languageOption.sel.html.filterOptions.filters.labels.medals);
  $J("#modal-filterOptions-data-storageUnit").text(languageOption.sel.html.filterOptions.filters.labels.storageUnit);
  $J("#modal-filterOptions-data-caseDrops").text(languageOption.sel.html.filterOptions.filters.labels.caseDrops);
  $J("#modal-filterOptions-data-itemDrops").text(languageOption.sel.html.filterOptions.filters.labels.itemDrops);
  $J("#modal-filterOptions-data-trades").text(languageOption.sel.html.filterOptions.filters.labels.trades);
  $J("#modal-filterOptions-data-containerOpened").text(languageOption.sel.html.filterOptions.filters.labels.containerOpened);
  $J("#modal-filterOptions-data-storePurchases").text(languageOption.sel.html.filterOptions.filters.labels.storePurchases);
  $J("#modal-filterOptions-data-marketPurchases").text(languageOption.sel.html.filterOptions.filters.labels.marketPurchases);
  $J("#modal-filterOptions-data-marketListingCreated").text(languageOption.sel.html.filterOptions.filters.labels.marketListingCreated);
  $J("#modal-filterOptions-data-marketListingRemoved").text(languageOption.sel.html.filterOptions.filters.labels.marketListingRemoved);
  $J("#modal-filterOptions-data-used").text(languageOption.sel.html.filterOptions.filters.labels.used);
  $J("#modal-filterOptions-data-souvenirDrop").text(languageOption.sel.html.filterOptions.filters.labels.souvenirDrop);
  $J("#modal-filterOptions-data-tradeUps").text(languageOption.sel.html.filterOptions.filters.labels.tradeUps);
  $J("#modal-filterOptions-data-stickerApplied").text(languageOption.sel.html.filterOptions.filters.labels.stickerApplied);
  $J("#modal-filterOptions-data-stickerRemoved").text(languageOption.sel.html.filterOptions.filters.labels.stickerRemoved);
  $J("#modal-filterOptions-data-deletedItem").text(languageOption.sel.html.filterOptions.filters.labels.deletedItem);
  $J("#modal-filterOptions-data-unsealedGraffiti").text(languageOption.sel.html.filterOptions.filters.labels.unsealedGraffiti);
  $J("#modal-filterOptions-data-missionReward").text(languageOption.sel.html.filterOptions.filters.labels.missionReward);
  // filters data
  $J("#modal-filterOptions-data-caseOpened").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.caseOpened.main);
  $J("#modal-filterOptions-data-caseOpened").data("data-item-name-tag", languageOption.sel.html.filterOptions.filters.data.caseOpened.itemName);

  $J("#modal-filterOptions-data-souvenirPackageOpened").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.souvenirPackageOpened.main);
  $J("#modal-filterOptions-data-souvenirPackageOpened").data("data-item-name-tag", languageOption.sel.html.filterOptions.filters.data.souvenirPackageOpened.itemName);

  $J("#modal-filterOptions-data-capsuleOpened").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.capsuleOpened.main);
  $J("#modal-filterOptions-data-capsuleOpened").data("data-item-name-tag", languageOption.sel.html.filterOptions.filters.data.capsuleOpened.itemName);

  $J("#modal-filterOptions-data-medals").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.medals.main);
  $J("#modal-filterOptions-data-storageUnit").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.storageUnit.main);
  $J("#modal-filterOptions-data-caseDrops").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.caseDrops.main);
  $J("#modal-filterOptions-data-itemDrops").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.itemDrops.main);
  $J("#modal-filterOptions-data-trades").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.trades.main);
  $J("#modal-filterOptions-data-containerOpened").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.containerOpened.main);
  $J("#modal-filterOptions-data-storePurchases").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.storePurchases.main);
  $J("#modal-filterOptions-data-marketPurchases").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.marketPurchases.main);
  $J("#modal-filterOptions-data-marketListingCreated").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.marketListingCreated.main);
  $J("#modal-filterOptions-data-marketListingRemoved").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.marketListingRemoved.main);
  $J("#modal-filterOptions-data-used").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.used.main);
  $J("#modal-filterOptions-data-souvenirDrop").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.souvenirDrop.main);
  $J("#modal-filterOptions-data-tradeUps").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.tradeUps.main);
  $J("#modal-filterOptions-data-stickerApplied").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.stickerApplied.main);
  $J("#modal-filterOptions-data-stickerRemoved").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.stickerRemoved.main);
  $J("#modal-filterOptions-data-deletedItem").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.deletedItem.main);
  $J("#modal-filterOptions-data-unsealedGraffiti").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.unsealedGraffiti.main);
  $J("#modal-filterOptions-data-missionReward").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.missionReward.main);
}

addFilterOptions();