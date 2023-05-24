var sessionID;
var steamLanguage;
var cursurHistory;
var g_rgAppContextData = [];
var continueLOading = true;
var loadedAllHistory = false;
var validLanguage = true;

var aFilterSearchData = {
  search: "",
  collection: "any",
  weapon: "any",
  type: [],
  exterior: [],
  quality: [],
  rarity: []
};
var aFilterSearchData2 = {
  search: "",
  collection: "any",
  weapon: "any",
  type: [],
  exterior: [],
  quality: [],
  rarity: []
};

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

var internalData = {
  container: "CSGO_Type_WeaponCase",
  graffiti: "CSGO_Type_Spray",
  rarities: {
    skins: { // code
      consumerGrade: "Rarity_Common_Weapon",
      industrialGrade: "Rarity_Uncommon_Weapon",
      milspec: "Rarity_Rare_Weapon",
      restricted: "Rarity_Mythical_Weapon",
      classified: "Rarity_Legendary_Weapon",
      covert: "Rarity_Ancient_Weapon"
    },
    stickers: { // code
      highGrade: "Rarity_Rare",
      remarkable: "Rarity_Mythical",
      exotic: "Rarity_Legendary",
      extraordinary: "Rarity_Ancient"
    }
  }
}

var languageOption = {
  sel: {
    case: "Case", // code
    skins: "Skins",
    cases: "Cases",
    package: "Package", // code
    packages: "Packages",
    capsule: "Capsule", // code
    capsules: "Capsules",
    containers: "Containers",
    graffiti: "Graffiti", // code
    months: {
      jan: "Jan",
      feb: "Feb",
      mar: "Mar",
      apr: "Apr",
      may: "May",
      jun: "Jun",
      jul: "Jul",
      aug: "Aug",
      sep: "Sep",
      oct: "Oct",
      nov: "Nov",
      dec: "Dec"
    },
    largeMonths: [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ],
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
      back: "BACK",
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
        options: "Settings"
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
          data: { // code
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
      },
      loadingHistory: {
        rows: "Rows added:",
        loops: "Loops done:",
        loadedDate: "Loaded date:",
        buttons: {
          forceStop: "FORCE STOP" 
        }
      },
      options: {
        language: "Language",
        languages: {
          english: "English",
          swedish: "Swedish"
        },
        buttons: {
          save: "SAVE"
        }
      },
      stats: {
        warning: "*WARNING - You have not loaded all your history. The following data will be incomplete*",
        statsCategories: {
          containersOpened: "Containers Opened",
          drops: "Drops",
          specificItem: "Specific Item Stats"
        },
        statsHtml: {
          general: {
            title: "General Stats",
            opened: {
              cases: "Total cases opened:",
              capsules: "Total capsules opened:",
              packages: "Total packages opened:"
            },
            dropped: {
              cases: "Total cases dropped:",
              skins: "Total skins dropped:",
              graffiti: "Total graffiti dropped:"
            }
          },
          rarities: {
            skins: { // code
              consumerGrade: "Consumer Grade",
              industrialGrade: "Industrial Grade",
              milspec: "Mil-Spec Grade",
              restricted: "Restricted",
              classified: "Classified",
              covert: "Covert",
              gold: "Gold"
            },
            stickers: { // code
              highGrade: "High Grade",
              remarkable: "Remarkable",
              exotic: "Exotic",
              extraordinary: "Extraordinary"
            }
          },
          chartLabels: {
            openingsGraph: "Number of Openings over time",
            caseOpen: "All Case Openings",
            capsuleOpen: "All Capsule Openings",
            packageOpen: "All Package Openings",
            caseUnlocks: "Case Unlocks",
            capsuleUnlocks: "Capsule Unlucks",
            packageUnlocks: "Package Unlucks",

            dropsGraph: "Drops over time",
            caseDrops: "Case Drops",
            skinDrops: "Skin Drops",

          }
        }
      },
      advancedFilter: {
        collection: "Collection",
        weapon: "Weapon",
        type: "Type",
        exterior: "Exterior",
        quality: "Category",
        rarity: "Quality",
        current: "Current",
        reset: "RESET",
        any: "Any"
      }
    }
  },
  english: {
    case: "Case", // code
    skins: "Skins",
    cases: "Cases",
    package: "Package", // code
    packages: "Packages",
    capsule: "Capsule", // code
    capsules: "Capsules",
    containers: "Containers",
    graffiti: "Graffiti", // code
    months: {
      jan: "Jan",
      feb: "Feb",
      mar: "Mar",
      apr: "Apr",
      may: "May",
      jun: "Jun",
      jul: "Jul",
      aug: "Aug",
      sep: "Sep",
      oct: "Oct",
      nov: "Nov",
      dec: "Dec"
    },
    largeMonths: [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ],
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
      back: "BACK",
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
        options: "Settings"
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
          data: { // code
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
      },
      loadingHistory: {
        rows: "Rows added:",
        loops: "Loops done:",
        loadedDate: "Loaded date:",
        buttons: {
          forceStop: "FORCE STOP" 
        }
      },
      options: {
        language: "Language",
        languages: {
          english: "English",
          swedish: "Swedish"
        },
        buttons: {
          save: "SAVE"
        }
      },
      stats: {
        warning: "*WARNING - You have not loaded all your history. The following data will be incomplete*",
        statsCategories: {
          containersOpened: "Containers Opened",
          drops: "Drops",
          specificItem: "Specific Item Stats"
        },
        statsHtml: {
          general: {
            title: "General Stats",
            opened: {
              cases: "Total cases opened:",
              capsules: "Total capsules opened:",
              packages: "Total packages opened:"
            },
            dropped: {
              cases: "Total cases dropped:",
              skins: "Total skins dropped:",
              graffiti: "Total graffiti dropped:"
            }
          },
          rarities: {
            skins: { // code
              consumerGrade: "Consumer Grade",
              industrialGrade: "Industrial Grade",
              milspec: "Mil-Spec Grade",
              restricted: "Restricted",
              classified: "Classified",
              covert: "Covert",
              gold: "Gold"
            },
            stickers: { // code
              highGrade: "High Grade",
              remarkable: "Remarkable",
              exotic: "Exotic",
              extraordinary: "Extraordinary"
            }
          },
          chartLabels: {
            openingsGraph: "Number of Openings over time",
            caseOpen: "All Case Openings",
            capsuleOpen: "All Capsule Openings",
            packageOpen: "All Package Openings",
            caseUnlocks: "Case Unlocks",
            capsuleUnlocks: "Capsule Unlucks",
            packageUnlocks: "Package Unlucks",

            dropsGraph: "Drops over time",
            caseDrops: "Case Drops",
            skinDrops: "Skin Drops",

          }
        }
      },
      advancedFilter: {
        collection: "Collection",
        weapon: "Weapon",
        type: "Type",
        exterior: "Exterior",
        quality: "Category",
        rarity: "Quality",
        current: "Current",
        reset: "RESET",
        any: "Any"
      }
    }
  },
  swedish: {
    case: "Låda", // code
    skins: "Skins",
    cases: "Lådor",
    package: "Souvenirpaket", // code
    packages: "Souvenirpaket",
    capsule: "Kapsel", // code
    capsules: "Kapslar",
    containers: "Behållare",
    graffiti: "Graffiti", // code
    months: {
      jan: "Jan",
      feb: "Feb",
      mar: "Mar",
      apr: "Apr",
      may: "Maj",
      jun: "Jun",
      jul: "Jul",
      aug: "Aug",
      sep: "Sep",
      oct: "Okt",
      nov: "Nov",
      dec: "Dec"
    },
    largeMonths: [
      "Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"
    ],
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
      back: "TILLBAKA",
      steamServiceUnavailable: "Steam-tjänsten är för närvarande inte tillgänglig.",
      otherErrorMessage: "Det gick inte att läsa in din lagerhistorik.",
      loadingHistory: "Laddar Historik"
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
            caseOpened: "Öppnade Lådor",
            souvenirPackageOpened: "Öppnade Souvenirpaket",
            capsuleOpened: "Öppnade Kapslar",
            medals: "Medaljer",
            storageUnit: "Lagringsenhets flyttningar",
            caseDrops: "Hittade Lådor",
            itemDrops: "Hittade Föremål",
            trades: "Byten",
            containerOpened: "Behållare Öppnad",
            storePurchases: "Butiks köp",
            marketPurchases: "Marknads köp",
            marketListingCreated: "Skapade Marknads Artiklar",
            marketListingRemoved: "Avbrytna Marknads Artiklar",
            used: "Använt",
            souvenirDrop: "Hittade Souvenirpaket",
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
              itemName: ["nyckel", "Case Key"]
            },
            souvenirPackageOpened: {
              main: "Öppnade en låda",
              itemName: ["Souvenirpaket", "Souvenir Package"]
            },
            capsuleOpened: {
              main: "Öppnade en låda",
              itemName: ["kapsel", "Capsule"]
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
      },
      loadingHistory: {
        rows: "Rader tillagda:",
        loops: "Repetetioner gjorda:",
        loadedDate: "Laddat datum:",
        buttons: {
          forceStop: "AVBRYT" 
        }
      },
      options: {
        language: "Språk (language)",
        languages: {
          english: "Engelska (English)",
          swedish: "Svenska (Swedish)"
        },
        buttons: {
          save: "SPARA"
        }
      },
      stats: {
        warning: "*VARNING - Du har inte laddat all din historik. Följande data kommer vara inkomplett*",
        statsCategories: {
          containersOpened: "Behållare Öppnad",
          drops: "Hittade Föremål",
          specificItem: "Specifikt Föremål Statistik"
        },
        statsHtml: {
          general: {
            title: "Allmän Statistik",
            opened: {
              cases: "Lådor öppnade totalt:",
              capsules: "Capsules öppnade totalt:",
              packages: "Packages öppnade totalt:"
            },
            dropped: {
              cases: "Lådor hittade totalt:",
              skins: "Skins hittade totalt:",
              graffiti: "Graffitis hittade totalt:"
            }
          },
          rarities: {
            skins: { // code
              consumerGrade: "Konsumentklass",
              industrialGrade: "Industriklass",
              milspec: "Militärklass",
              restricted: "Begränsad",
              classified: "Sekretessbelagd",
              covert: "Konfidentiell",
              gold: "Guld"
            },
            stickers: { // code
              highGrade: "Högkvalitet",
              remarkable: "Enastående",
              exotic: "Exotisk",
              extraordinary: "Extraordinär"
            }
          },
          chartLabels: {
            openingsGraph: "Antal öppningar över tid",
            caseOpen: "Alla låd-öppningar",
            capsuleOpen: "Alla capsule-öppningar",
            packageOpen: "All package-öppningar",
            caseUnlocks: "Upplåsta lådor",
            capsuleUnlocks: "Upplåsta capsules",
            packageUnlocks: "Upplåsta packages",

            dropsGraph: "Hittade föremål över tid",
            caseDrops: "Hittade lådor",
            skinDrops: "Hittade skins",

          }
        }
      },
      advancedFilter: {
        collection: "Samling",
        weapon: "Vapen",
        type: "Typ",
        exterior: "Exteriör",
        quality: "Kategori",
        rarity: "Kvalitet",
        current: "Nuvarande",
        reset: "ÅTERSTÄLL",
        any: "Någon"
      }
    }
  }
}

// Applies Html and hooks onto script
async function addFilterOptions() {
  const { userFilterData } = await chrome.storage.sync.get(["userFilterData"]);
  if (!(typeof userFilterData === 'object')) {
    await chrome.storage.sync.set({ userFilterData: {} });
  }
  const resp = await fetch(chrome.runtime.getURL('./components/filterWindow.html'));
  const html = await resp.text();
  const contentDiv = document.getElementById("BG_bottom");
  contentDiv.insertAdjacentHTML("beforebegin", html);
  
  loadChartsNDiagrams();

  if (Object.keys(languageOption).includes(steamLanguage)) {
    const selectedLanguageProperties = languageOption[steamLanguage];
    languageOption["sel"] = selectedLanguageProperties;
    updateHtmlText();
    updateData();
    $J('#steam_filter_language_option').val(steamLanguage);
  } else {
    console.log("CSGO HUF: "+steamLanguage+" not supported");
    validLanguage = false;
    updateValidLanguage();
    updateHtmlText();
    updateData();
  }
    
  createButtonLinks();
  $J( '#load_more_button' ).hide();
  InventoryHistory_Load50More();

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
//document.cookie = "Steam_Language=english;expires=Thu, 01 Jan 1970 00:00:00 UTC;priority=high";
var loadAllAmount = 0;
var loadPartial = 0;
cursurHistory = Math.floor(Date.now() / 1000);

function updateData() {
  // filters data
  $J("#modal-filterOptions-data-caseOpened").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.caseOpened.main);
  $J("#modal-filterOptions-data-caseOpened").data("data-item-name-tag", "Case Key");

  $J("#modal-filterOptions-data-souvenirPackageOpened").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.souvenirPackageOpened.main);
  $J("#modal-filterOptions-data-souvenirPackageOpened").data("data-item-name-tag", "Souvenir Package");

  $J("#modal-filterOptions-data-capsuleOpened").data("data-main-tag", languageOption.sel.html.filterOptions.filters.data.capsuleOpened.main);
  $J("#modal-filterOptions-data-capsuleOpened").data("data-item-name-tag", "Capsule");

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

function updateHtmlText() {
  // toolbar //
  $J("#languageText-toolBar-searchEngine").text(languageOption.sel.html.toolbar.searchEngine);
  $J("#languageText-toolBar-loadHistory").text(languageOption.sel.html.toolbar.loadHistory);
  $J("#languageText-toolBar-statistics").text(languageOption.sel.html.toolbar.statistics);
  $J("#languageText-toolBar-openFilter").text(languageOption.sel.html.toolbar.openFilter);
  $J("#languageText-toolBar-options").text(languageOption.sel.html.toolbar.options);

  // simple search //
  $J("#modal-title-simpleSearch").text(languageOption.sel.html.toolbar.searchEngine);
  $J(".modal-includeCheckbox-simpleSearch").each(function() {
    $J(this).text(languageOption.sel.html.simpleSearch.includeSearchOutsideFilters);
  });
  $J("#steam_filter_simple_searchbar_advanced").text(languageOption.sel.html.simpleSearch.advanced);
  $J("#steam_filter_simple_searchbar_win_dismiss_btn").text(languageOption.sel.html.simpleSearch.close);
  $J("#steam_filter_simple_searchbar_search_submit_btn").text(languageOption.sel.html.simpleSearch.searchBarLabel);
  $J("#modal-label-simpleSearch").text(languageOption.sel.html.simpleSearch.searchBarLabel);

  // filter options //
  $J("#steam_filter_Options_Win_Title_Text").text(languageOption.sel.html.toolbar.openFilter);
  $J("#modal-filterOptions-showTitle").text(languageOption.sel.html.filterOptions.showTitle);
  $J("#steam_filter_Options_Win_Btn_Txt").text(languageOption.sel.messages.close);
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
  
  // Loading History //
  $J("#steam_Inv_Loader_Win_Title_Text").text(languageOption.sel.messages.loadingHistory);
  $J("#steam_Inv_Loader_Message").text(languageOption.sel.messages.loadingInProgressText);
  $J("#modal-loadHistory-rows").text(languageOption.sel.html.loadingHistory.rows);
  $J("#modal-loadHistory-loops").text(languageOption.sel.html.loadingHistory.loops);
  $J("#modal-loadHistory-date").text(languageOption.sel.html.loadingHistory.loadedDate);
  $J("#steam_Inv_Loader_Win_Btn_Txt").text(languageOption.sel.messages.stop);
  $J("#steam_Inv_Loader_Win_FBtn_Txt").text(languageOption.sel.html.loadingHistory.buttons.forceStop);

  // Options //
  $J("#steam_filter_options2_Win_Title_Text").text(languageOption.sel.html.toolbar.options);
  $J("#steam_filter_language_option_title").text(languageOption.sel.html.options.language)
  Object.entries(languageOption.sel.html.options.languages).forEach(([lang, langStr]) => {
    $J("#steam_filter_language_option option[value="+lang+"]").text(langStr);
  });
  $J("#steam_filter_options_Win_Btn_Txt").text(languageOption.sel.html.options.buttons.save);

  // Stats //
  $J("#steam_filter_stats_win_title_text").text(languageOption.sel.html.toolbar.statistics);
  $J("#steam_filter_stats_alert_message").text(languageOption.sel.html.stats.warning);

  $J("#stats-radio-label-containersOpened").text(languageOption.sel.html.stats.statsCategories.containersOpened);
  $J("#stats-radio-label-drops").text(languageOption.sel.html.stats.statsCategories.drops);
  $J("#stats-radio-label-itemStats").text(languageOption.sel.html.stats.statsCategories.specificItem);

  $J("#stats-general-title").text(languageOption.sel.html.stats.statsHtml.general.title);
  $J("#steam_filter_stats_win_btn_txt").text(languageOption.sel.messages.close);
  // general stats
  $J("#stats-general-total-cases-opened").text(languageOption.sel.html.stats.statsHtml.general.opened.cases);
  $J("#stats-general-total-capsules-opened").text(languageOption.sel.html.stats.statsHtml.general.opened.capsules);
  $J("#stats-general-total-packages-opened").text(languageOption.sel.html.stats.statsHtml.general.opened.packages);
  $J("#stats-general-total-cases-dropped").text(languageOption.sel.html.stats.statsHtml.general.dropped.cases);
  $J("#stats-general-total-skins-dropped").text(languageOption.sel.html.stats.statsHtml.general.dropped.skins);
  $J("#stats-general-total-graffiti-dropped").text(languageOption.sel.html.stats.statsHtml.general.dropped.graffiti);
  // labels n titels on charts n graphs
  container_time_graph.options.plugins.title.text = languageOption.sel.html.stats.statsHtml.chartLabels.openingsGraph;
  container_time_graph.data.datasets[0].label = languageOption.sel.cases;
  container_time_graph.data.datasets[1].label = languageOption.sel.capsules;
  container_time_graph.data.datasets[2].label = languageOption.sel.packages;
  container_time_graph.update();

  case_types_chart.options.plugins.title.text = languageOption.sel.html.stats.statsHtml.chartLabels.caseOpen;
  capsules_types_chart.options.plugins.title.text = languageOption.sel.html.stats.statsHtml.chartLabels.capsuleOpen;
  packages_types_chart.options.plugins.title.text = languageOption.sel.html.stats.statsHtml.chartLabels.packageOpen;
  case_types_chart.update();
  capsules_types_chart.update();
  packages_types_chart.update();

  case_unlucks_chart.options.plugins.title.text = languageOption.sel.html.stats.statsHtml.chartLabels.caseUnlocks;
  case_unlucks_chart.data.labels = [languageOption.sel.html.stats.statsHtml.rarities.skins.milspec, languageOption.sel.html.stats.statsHtml.rarities.skins.restricted, languageOption.sel.html.stats.statsHtml.rarities.skins.classified, languageOption.sel.html.stats.statsHtml.rarities.skins.covert, languageOption.sel.html.stats.statsHtml.rarities.skins.gold]
  case_unlucks_chart.update();
  capsules_unlucks_chart.options.plugins.title.text = languageOption.sel.html.stats.statsHtml.chartLabels.capsuleUnlocks;
  capsules_unlucks_chart.data.labels = [languageOption.sel.html.stats.statsHtml.rarities.stickers.highGrade, languageOption.sel.html.stats.statsHtml.rarities.stickers.remarkable, languageOption.sel.html.stats.statsHtml.rarities.stickers.exotic, languageOption.sel.html.stats.statsHtml.rarities.stickers.extraordinary];
  capsules_unlucks_chart.update();
  packages_unlucks_chart.options.plugins.title.text = languageOption.sel.html.stats.statsHtml.chartLabels.packageUnlocks;
  packages_unlucks_chart.data.labels = [languageOption.sel.html.stats.statsHtml.rarities.skins.consumerGrade, languageOption.sel.html.stats.statsHtml.rarities.skins.industrialGrade, languageOption.sel.html.stats.statsHtml.rarities.skins.milspec, languageOption.sel.html.stats.statsHtml.rarities.skins.restricted, languageOption.sel.html.stats.statsHtml.rarities.skins.classified, languageOption.sel.html.stats.statsHtml.rarities.skins.covert];
  packages_unlucks_chart.update();

  drops_time_graph.options.plugins.title.text = languageOption.sel.html.stats.statsHtml.chartLabels.dropsGraph;
  drops_time_graph.data.datasets[0].label = languageOption.sel.cases;
  drops_time_graph.data.datasets[1].label = languageOption.sel.skins;
  drops_time_graph.data.datasets[2].label = languageOption.sel.graffiti;
  drops_time_graph.update();

  case_drops_chart.options.plugins.title.text = languageOption.sel.html.stats.statsHtml.chartLabels.caseDrops;
  case_drops_chart.update();
  skins_drops_chart.options.plugins.title.text = languageOption.sel.html.stats.statsHtml.chartLabels.skinDrops;
  skins_drops_chart.data.labels = [languageOption.sel.html.stats.statsHtml.rarities.skins.consumerGrade, languageOption.sel.html.stats.statsHtml.rarities.skins.industrialGrade, languageOption.sel.html.stats.statsHtml.rarities.skins.milspec, languageOption.sel.html.stats.statsHtml.rarities.skins.restricted, languageOption.sel.html.stats.statsHtml.rarities.skins.classified, languageOption.sel.html.stats.statsHtml.rarities.skins.covert];
  skins_drops_chart.update();

  // advanced filter search //
  $J("#steam_filter_advanced_win_title_text").text(languageOption.sel.html.simpleSearch.advanced+" "+languageOption.sel.html.simpleSearch.searchBarLabel);
  $J("#steam_filter_advanced_win_btn_reset_txt").text(languageOption.sel.html.advancedFilter.reset);
  $J("#steam_filter_advanced_win_btn_txt").text(languageOption.sel.messages.back);
  $J("#aFilter_html_title-search").text(languageOption.sel.html.simpleSearch.searchBarLabel);
  $J("#aFilter_html_title-collection").text(languageOption.sel.html.advancedFilter.collection);
  $J("#aFilter_html_title-weapon").text(languageOption.sel.html.advancedFilter.weapon);
  $J("#aFilter_html_title-type").text(languageOption.sel.html.advancedFilter.type);
  $J("#aFilter_html_title-exterior").text(languageOption.sel.html.advancedFilter.exterior);
  $J("#aFilter_html_title-quality").text(languageOption.sel.html.advancedFilter.quality);
  $J("#aFilter_html_title-rarity").text(languageOption.sel.html.advancedFilter.rarity);
  $J("#aFilter_html_title-current").text(languageOption.sel.html.advancedFilter.current);
  $J(".aFilter_html_title-any").each(function() {
    $J(this).text(languageOption.sel.html.advancedFilter.any);
  })
  updateCurrentSearchList();
  updateCurrentSearchList2();

}

addFilterOptions();