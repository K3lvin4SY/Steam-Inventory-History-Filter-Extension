var container_time_graph;
var case_types_chart;
var case_unlucks_chart;
var capsules_types_chart;
var capsules_unlucks_chart;
var packages_types_chart;
var packages_unlucks_chart;
var drops_time_graph;
var case_drops_chart;
var skins_drops_chart;
var item_graph;

function getStringFromMonth(month) {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return monthNames[month - 1];
}

function getMonthList(startMonth, startYear, endMonth, endYear) {
  if ([startMonth, startYear, endMonth, endYear].includes(null)) {
    return [];
  }
  let monthList = [];

  let currentMonth = startMonth;
  let currentYear = startYear;

  while (currentYear < endYear || (currentYear == endYear && currentMonth <= endMonth)) {
    let monthString = getStringFromMonth(parseInt(currentMonth));
    let yearString = currentYear.toString();
    let dateString = monthString + " " + yearString;

    monthList.push(dateString);

    currentMonth++;

    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
  }

  return monthList;
}

function getIndexFromDate(monthList, year, month) {
  let dateString = getStringFromMonth(parseInt(month)) + " " + year.toString();
  return monthList.indexOf(dateString);
}

function getZerosList(n) {
  let zerosList = [];
  for (let i = 0; i < n; i++) {
    zerosList.push(0);
  }
  return zerosList;
}


function loadChartsNDiagrams() {
  // Create a bar chart for cases types

  case_types_chart = new Chart(document.getElementById('case_types_chart'), {
    type: "bar",
    data: {
      labels: [],
      datasets: [{
        backgroundColor: [],
        data: []
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "All Case Openings",
          font: {
            size: 24,
            weight: 'bold'
          },
          color: "#b1b1b1"
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            }
          }
        },
        y: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            },
            beginAtZero: true
          }
        }
      }
    }
  });

  // cases over time graph

  container_time_graph = new Chart(document.getElementById('container_time_graph'), {
    type: "line",
    data: {
      labels: [],
      datasets: [{ 
        label: "Cases",
        data: [],
        borderColor: "orange",
        fill: false,
        tension: 0.25
      }, { 
        label: "Capsules",
        data: [],
        borderColor: "green",
        fill: false,
        tension: 0.25
      }, { 
        label: "Packages",
        data: [],
        borderColor: "#3161f3",
        fill: false,
        tension: 0.25
      }]
    },
    options: {
      scales: {
        x: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            }
          }
        },
        y: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            }
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: "#b1b1b1",
            font: {
              size: 14
            }
          }
        },
        title: {
          display: true,
          text: "Number of Openings over time",
          font: {
            size: 24
          },
          color: "#b1b1b1"
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true
            },
            mode: "x"
          }
        }
      }
    }
    
    
    
  });

  // capsules opened of each type
  capsules_types_chart = new Chart(document.getElementById('capsules_types_chart'), {
    type: "bar",
    data: {
      labels: [],
      datasets: [{
        backgroundColor: [],
        data: []
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "All Capsule Openings",
          font: {
            size: 24,
            weight: "bold"
          },
          color: "#b1b1b1"
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            }
          }
        },
        y: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            },
            beginAtZero: true
          }
        }
      }
    }
  });

  // packages opened of each type
  packages_types_chart = new Chart(document.getElementById('packages_types_chart'), {
    type: "bar",
    data: {
      labels: [],
      datasets: [{
        backgroundColor: [],
        data: []
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "All Package Openings",
          font: {
            weight: "bold",
            size: 24
          },
          color: "#b1b1b1"
        },
        tooltip: {
          bodyFont: {
            size: 16,
            color: "#b1b1b1"
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            }
          }
        },
        y: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            },
            beginAtZero: true
          }
        }
      }
    }    
  });

  // cases skins opened
  case_unlucks_chart = new Chart(document.getElementById('case_unlucks_chart'), {
    type: "bar",
    data: {
      labels: ["Mil-spec", "Restricted", "Classified", "Covert", "Gold"],
      datasets: [{
        backgroundColor: ["#4b69ff", "#8947ff", "#d32de5", "#eb4b4b", "#caab05"],
        data: [10, 10, 10, 10, 10]
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "Case Unlocks",
          font: {
            size: 24,
            weight: 'bold'
          },
          color: "#b1b1b1"
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            }
          }
        },
        y: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            },
            beginAtZero: true
          }
        }
      }
    }    
  });

  // capsule skins opened
  capsules_unlucks_chart = new Chart(document.getElementById('capsules_unlucks_chart'), {
    type: "bar",
    data: {
      labels: ["High Grade", "Remarkable", "Exotic", "Extraordinary"],
      datasets: [{
        backgroundColor: ["#4b69ff", "#8947ff", "#d32de5", "#eb4b4b"],
        data: [10, 10, 10, 10]
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "Capsule Unlucks",
          font: {
            size: 24,
            weight: "bold"
          },
          color: "#b1b1b1"
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            }
          }
        },
        y: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            },
            beginAtZero: true
          }
        }
      }
    } 
  });

  // packages skins opened
  packages_unlucks_chart = new Chart(document.getElementById('packages_unlucks_chart'), {
    type: "bar",
    data: {
      labels: ["Consumer Grade", "Industrial Grade", "Mil-spec", "Restricted", "Classified", "Covert"],
      datasets: [{
        backgroundColor: ["#b1c3d9", "#5e98d8", "#4b69ff", "#8947ff", "#d32de5", "#eb4b4b"],
        data: [10, 10, 10, 10, 10, 10]
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "Package Unlucks",
          font: {
            size: 24,
            weight: "bold"
          },
          color: "#b1b1b1"
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            }
          }
        },
        y: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            },
            beginAtZero: true
          }
        }
      }
    }    
  });

  // --------------------- Drops --------------------------

  // drops over time graph
  drops_time_graph = new Chart(document.getElementById('drops_time_graph'), {
    type: "line",
    data: {
      labels: [],
      datasets: [{ 
        label: "Cases",
        data: [],
        borderColor: "orange",
        fill: false,
        tension: 0.25
      }, { 
        label: "Skins",
        data: [],
        borderColor: "#3161f3",
        fill: false,
        tension: 0.25
      }, { 
        label: "Graffiti",
        data: [],
        borderColor: "#b1c3d9",
        fill: false,
        tension: 0.25
      }]
    },
    options: {
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#b1b1b1',
            font: {
              size: 14
            }
          }
        },
        title: {
          display: true,
          text: "Drops over time",
          font: {
            size: 24,
            weight: 'bold'
          },
          color: '#b1b1b1'
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true
            },
            mode: 'x',
          },
          pan: {
            enabled: true,
            mode: 'x',
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            }
          },
          zoom: {
            wheel: {
              enabled: true
            },
            pinch: {
              enabled: true
            },
            mode: 'x'
          },
          pan: {
            enabled: true,
            mode: 'x'
          }
        },
        y: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            }
          }
        }
      }
    }    
  });

  // All case drops
  case_drops_chart = new Chart(document.getElementById('case_drops_chart'), {
    type: "bar",
    data: {
      labels: [],
      datasets: [{
        backgroundColor: [],
        data: []
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "Case Drops",
          font: {
            size: 24,
            weight: 'bold'
          },
          color: "#b1b1b1"
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            }
          }
        },
        y: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            },
            beginAtZero: true
          }
        }
      }
    }    
  });

  // All skin drops
  skins_drops_chart = new Chart(document.getElementById('skins_drops_chart'), {
    type: "bar",
    data: {
      labels: ["Consumer Grade", "Industrial Grade", "Mil-spec", "Restricted", "Classified", "Covert"],
      datasets: [{
        backgroundColor: ["#b1c3d9", "#5e98d8", "#4b69ff", "#8947ff", "#d32de5", "#eb4b4b"],
        data: [10, 10, 10, 10, 10, 10]
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "Skin Drops",
          font: {
            size: 24,
            weight: "bold"
          },
          color: "#b1b1b1"
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            }
          }
        },
        y: {
          ticks: {
            color: "#b1b1b1",
            font: {
              size: 16
            },
            beginAtZero: true
          }
        }
      }
    }    
  });
}

function updateCharts() {
  // PRep for drops
  // container get data
  
  var caseDropsData = gameData.gameDrops.case.sort((a, b) => parseInt(a.timeFrame.year+a.timeFrame.month+a.timeFrame.day) - parseInt(b.timeFrame.year+b.timeFrame.month+b.timeFrame.day));
  var skinDropsData = gameData.gameDrops.skin.sort((a, b) => parseInt(a.timeFrame.year+a.timeFrame.month+a.timeFrame.day) - parseInt(b.timeFrame.year+b.timeFrame.month+b.timeFrame.day));
  var graffitiDropsData = gameData.gameDrops.graffiti.sort((a, b) => parseInt(a.timeFrame.year+a.timeFrame.month+a.timeFrame.day) - parseInt(b.timeFrame.year+b.timeFrame.month+b.timeFrame.day));

  // general stats update
  $J("#case2TotNum").text( caseDropsData.length );
  $J("#skinTotNum").text( skinDropsData.length );
  $J("#grafTotNum").text( graffitiDropsData.length );

  // graph prep
  let caseDropStartDate, skinDropStartDate, graffitiDropStartDate;
  try {
    caseDropStartDate = parseInt(caseDropsData[0].timeFrame.year + caseDropsData[0].timeFrame.month + caseDropsData[0].timeFrame.day);
  } catch (error) {
    caseDropStartDate = null;
  }

  try {
    skinDropStartDate = parseInt(skinDropsData[0].timeFrame.year + skinDropsData[0].timeFrame.month + skinDropsData[0].timeFrame.day);
  } catch (error) {
    skinDropStartDate = null;
  }

  try {
    graffitiDropStartDate = parseInt(graffitiDropsData[0].timeFrame.year + graffitiDropsData[0].timeFrame.month + graffitiDropsData[0].timeFrame.day);
  } catch (error) {
    graffitiDropStartDate = null;
  }
  let startDropDateArray = [caseDropStartDate, skinDropStartDate, graffitiDropStartDate].filter(Boolean);
  let startDropDate = startDropDateArray.length > 0 ? ""+Math.min(...startDropDateArray) : null;

  let startDropMonth = null;
  let startDropYear = null;
  if (startDropDate !== null) {
    startDropMonth = startDropDate.substring(4, 6);
    startDropYear = startDropDate.substring(0, 4);
  }  

  let caseDropEndDate, skinDropEndDate, graffitiDropEndDate;
  try {
    caseDropEndDate = parseInt(caseDropsData[caseDropsData.length - 1].timeFrame.year + caseDropsData[caseDropsData.length - 1].timeFrame.month + caseDropsData[caseDropsData.length - 1].timeFrame.day);
  } catch (error) {
    caseDropEndDate = null;
  }

  try {
    skinDropEndDate = parseInt(skinDropsData[skinDropsData.length - 1].timeFrame.year + skinDropsData[skinDropsData.length - 1].timeFrame.month + skinDropsData[skinDropsData.length - 1].timeFrame.day);
  } catch (error) {
    skinDropEndDate = null;
  }

  try {
    graffitiDropEndDate = parseInt(graffitiDropsData[graffitiDropsData.length - 1].timeFrame.year + graffitiDropsData[graffitiDropsData.length - 1].timeFrame.month + graffitiDropsData[graffitiDropsData.length - 1].timeFrame.day);
  } catch (error) {
    graffitiDropEndDate = null;
  }

  let endDropDateArray = [caseDropEndDate, skinDropEndDate, graffitiDropEndDate].filter(Boolean);
  let endDropDate = endDropDateArray.length > 0 ? ""+Math.max(...endDropDateArray) : null;

  let endDropMonth = null;
  let endDropYear = null;
  
  if (endDropDate !== null) {
    endDropMonth = endDropDate.substring(4, 6);
    endDropYear = endDropDate.substring(0, 4);
  }  

  var timeLineDrop = getMonthList(startDropMonth, startDropYear, endDropMonth, endDropYear);
  
  var caseDropValue = getZerosList(timeLineDrop.length);
  var skinDropValue = getZerosList(timeLineDrop.length);
  var graffitiDropValue = getZerosList(timeLineDrop.length);



  // PRep for Openings
  // container get data
  var caseOpenings = gameData.containerUnlocks.case.sort((a, b) => parseInt(a.timeFrame.year+a.timeFrame.month+a.timeFrame.day) - parseInt(b.timeFrame.year+b.timeFrame.month+b.timeFrame.day));
  var capsuleOpenings = gameData.containerUnlocks.capsule.sort((a, b) => parseInt(a.timeFrame.year+a.timeFrame.month+a.timeFrame.day) - parseInt(b.timeFrame.year+b.timeFrame.month+b.timeFrame.day));
  var packageOpenings = gameData.containerUnlocks.package.sort((a, b) => parseInt(a.timeFrame.year+a.timeFrame.month+a.timeFrame.day) - parseInt(b.timeFrame.year+b.timeFrame.month+b.timeFrame.day));

  // general stats update
  $J("#caseTotNum").text( caseOpenings.length );
  $J("#capTotNum").text( capsuleOpenings.length );
  $J("#packTotNum").text( packageOpenings.length );

  // graph prep
  let caseStartDate, capsuleStartDate, packageStartDate;
  try {
    caseStartDate = parseInt(caseOpenings[0].timeFrame.year + caseOpenings[0].timeFrame.month + caseOpenings[0].timeFrame.day);
  } catch (error) {
    caseStartDate = null;
  }

  try {
    capsuleStartDate = parseInt(capsuleOpenings[0].timeFrame.year + capsuleOpenings[0].timeFrame.month + capsuleOpenings[0].timeFrame.day);
  } catch (error) {
    capsuleStartDate = null;
  }

  try {
    packageStartDate = parseInt(packageOpenings[0].timeFrame.year + packageOpenings[0].timeFrame.month + packageOpenings[0].timeFrame.day);
  } catch (error) {
    packageStartDate = null;
  }
  let startDateArray = [caseStartDate, capsuleStartDate, packageStartDate].filter(Boolean);
  let startDate = startDateArray.length > 0 ? ""+Math.min(...startDateArray) : null;

  let startMonth = null;
  let startYear = null;
  if (startDate !== null) {
    startMonth = startDate.substring(4, 6);
    startYear = startDate.substring(0, 4);
  }  

  let caseEndDate, capsuleEndDate, packageEndDate;
  try {
    caseEndDate = parseInt(caseOpenings[caseOpenings.length - 1].timeFrame.year + caseOpenings[caseOpenings.length - 1].timeFrame.month + caseOpenings[caseOpenings.length - 1].timeFrame.day);
  } catch (error) {
    caseEndDate = null;
  }

  try {
    capsuleEndDate = parseInt(capsuleOpenings[capsuleOpenings.length - 1].timeFrame.year + capsuleOpenings[capsuleOpenings.length - 1].timeFrame.month + capsuleOpenings[capsuleOpenings.length - 1].timeFrame.day);
  } catch (error) {
    capsuleEndDate = null;
  }

  try {
    packageEndDate = parseInt(packageOpenings[packageOpenings.length - 1].timeFrame.year + packageOpenings[packageOpenings.length - 1].timeFrame.month + packageOpenings[packageOpenings.length - 1].timeFrame.day);
  } catch (error) {
    packageEndDate = null;
  }

  let endDateArray = [caseEndDate, capsuleEndDate, packageEndDate].filter(Boolean);
  let endDate = endDateArray.length > 0 ? ""+Math.max(...endDateArray) : null;

  let endMonth = null;
  let endYear = null;
  
  if (endDate !== null) {
    endMonth = endDate.substring(4, 6);
    endYear = endDate.substring(0, 4);
  }  

  var timeLine = getMonthList(startMonth, startYear, endMonth, endYear);
  
  var caseOpenValue = getZerosList(timeLine.length);
  var capsuleOpenValue = getZerosList(timeLine.length);
  var packageOpenValue = getZerosList(timeLine.length);

  // case data collect
  var caseNames = [];
  var caseNamesAmount = [];

  var caseRarityItemsAmount = [0, 0, 0, 0, 0];

  //console.log(caseOpenings);

  for (let index = 0; index < caseOpenings.length; index++) {
    const caseOpen = caseOpenings[index];
    
    // add case names
    if (!caseNames.includes(caseOpen.container.itemName)) {
      caseNames.push(caseOpen.container.itemName);
      caseNamesAmount.push(0);
    }
    // add case amount to case names
    const caseRarityItemsAmountIndex = caseNames.indexOf(caseOpen.container.itemName);
    caseNamesAmount[caseRarityItemsAmountIndex] = caseNamesAmount[caseRarityItemsAmountIndex]+1;

    // add rarity amount on case open
    if (caseOpen.item.itemRarity.internal_name == internalData.rarities.skins.milspec) {
      caseRarityItemsAmount[0] = caseRarityItemsAmount[0]+1;
    } else if (caseOpen.item.itemRarity.internal_name == internalData.rarities.skins.restricted) {
      caseRarityItemsAmount[1] = caseRarityItemsAmount[1]+1;
    } else if (caseOpen.item.itemRarity.internal_name == internalData.rarities.skins.classified) {
      caseRarityItemsAmount[2] = caseRarityItemsAmount[2]+1;
    } else if (caseOpen.item.itemRarity.internal_name == internalData.rarities.skins.covert && caseOpen.item.itemQuality.name != "★") {
      caseRarityItemsAmount[3] = caseRarityItemsAmount[3]+1;
    } else if (caseOpen.item.itemQuality.name == "★") {
      caseRarityItemsAmount[4] = caseRarityItemsAmount[4]+1;
    }

    // graph stuff
    const timeLineIndex = getIndexFromDate(timeLine, caseOpen.timeFrame.year, caseOpen.timeFrame.month);
    caseOpenValue[timeLineIndex] = caseOpenValue[timeLineIndex]+1;
  }

  // case charts
  case_types_chart.data.datasets[0].data = [];
  case_types_chart.data.datasets[0].backgroundColor = "yellow";
  case_types_chart.data.labels = [];
  case_types_chart.update();
  case_types_chart.data.datasets[0].data = caseNamesAmount;
  case_types_chart.data.datasets[0].backgroundColor = getColorList(caseNamesAmount.length);
  case_types_chart.data.labels = caseNames;
  case_types_chart.update();

  case_unlucks_chart.data.datasets[0].data = [];
  case_unlucks_chart.update();
  case_unlucks_chart.data.datasets[0].data = caseRarityItemsAmount;
  case_unlucks_chart.update();

  container_time_graph.data.labels = [];
  container_time_graph.data.datasets[0].data = [];
  container_time_graph.update();
  container_time_graph.data.labels = timeLine;
  container_time_graph.data.datasets[0].data = caseOpenValue;
  container_time_graph.update();

  // ------------------------------------------------------------------------------------------

  // capsule data collect
  
  var capsuleNames = [];
  var capsuleNamesAmount = [];

  var capsuleRarityItemsAmount = [0, 0, 0, 0];

  for (let index = 0; index < capsuleOpenings.length; index++) {
    const capsuleOpen = capsuleOpenings[index];
    
    // add capsule names
    const shortItemName = capsuleOpen.container.itemName.replace("Challengers", "Chal").replace("Legends", "Leg").replace("Contenders", "Con").replace("Autograph ", "A-").replace("Sticker ", "S-");
    if (!capsuleNames.includes(shortItemName)) {
      capsuleNames.push(shortItemName);
      capsuleNamesAmount.push(0);
    }
    // add capsule amount to capsule names
    const capsuleRarityItemsAmountIndex = capsuleNames.indexOf(shortItemName);
    capsuleNamesAmount[capsuleRarityItemsAmountIndex] = capsuleNamesAmount[capsuleRarityItemsAmountIndex]+1;

    // add rarity amount on capsule open
    if (capsuleOpen.item.itemRarity.internal_name == internalData.rarities.stickers.highGrade) {
      capsuleRarityItemsAmount[0] = capsuleRarityItemsAmount[0]+1;
    } else if (capsuleOpen.item.itemRarity.internal_name == internalData.rarities.stickers.remarkable) {
      capsuleRarityItemsAmount[1] = capsuleRarityItemsAmount[1]+1;
    } else if (capsuleOpen.item.itemRarity.internal_name == internalData.rarities.stickers.exotic) {
      capsuleRarityItemsAmount[2] = capsuleRarityItemsAmount[2]+1;
    } else if (capsuleOpen.item.itemRarity.internal_name == internalData.rarities.stickers.extraordinary) {
      capsuleRarityItemsAmount[3] = capsuleRarityItemsAmount[3]+1;
    }

    // graph stuff
    const timeLineIndex = getIndexFromDate(timeLine, capsuleOpen.timeFrame.year, capsuleOpen.timeFrame.month);
    capsuleOpenValue[timeLineIndex] = capsuleOpenValue[timeLineIndex]+1;
  }

  // capsule charts
  capsules_types_chart.data.datasets[0].data = [];
  capsules_types_chart.data.datasets[0].backgroundColor = "yellow";
  capsules_types_chart.data.labels = [];
  capsules_types_chart.update();
  capsules_types_chart.data.datasets[0].data = capsuleNamesAmount;
  capsules_types_chart.data.datasets[0].backgroundColor = getColorList(capsuleNamesAmount.length);
  capsules_types_chart.data.labels = capsuleNames;
  capsules_types_chart.update();

  capsules_unlucks_chart.data.datasets[0].data = [];
  capsules_unlucks_chart.update();
  capsules_unlucks_chart.data.datasets[0].data = capsuleRarityItemsAmount;
  capsules_unlucks_chart.update();

  container_time_graph.data.datasets[1].data = [];
  container_time_graph.update();
  container_time_graph.data.datasets[1].data = capsuleOpenValue;
  container_time_graph.update();

  // ------------------------------------------------------------------------------------------

  // package data collect
  
  var packageNames = [];
  var packageNamesAmount = [];

  var packageRarityItemsAmount = [0, 0, 0, 0, 0, 0];

  for (let index = 0; index < packageOpenings.length; index++) {
    const packageOpen = packageOpenings[index];
    
    // add package names
    const shortPackageName = packageOpen.container.itemName.replace("Souvenir ", "S-");
    if (!packageNames.includes(shortPackageName)) {
      packageNames.push(shortPackageName);
      packageNamesAmount.push(0);
    }
    // add package amount to package names
    const packageRarityItemsAmountIndex = packageNames.indexOf(shortPackageName);
    packageNamesAmount[packageRarityItemsAmountIndex] = packageNamesAmount[packageRarityItemsAmountIndex]+1;

    // add rarity amount on package open
    if (packageOpen.item.itemRarity.internal_name == internalData.rarities.skins.consumerGrade) {
      packageRarityItemsAmount[0] = packageRarityItemsAmount[0]+1;
    } else if (packageOpen.item.itemRarity.internal_name == internalData.rarities.skins.industrialGrade) {
      packageRarityItemsAmount[1] = packageRarityItemsAmount[1]+1;
    } else if (packageOpen.item.itemRarity.internal_name == internalData.rarities.skins.milspec) {
      packageRarityItemsAmount[2] = packageRarityItemsAmount[2]+1;
    } else if (packageOpen.item.itemRarity.internal_name == internalData.rarities.skins.restricted) {
      packageRarityItemsAmount[3] = packageRarityItemsAmount[3]+1;
    } else if (packageOpen.item.itemRarity.internal_name == internalData.rarities.skins.classified) {
      packageRarityItemsAmount[4] = packageRarityItemsAmount[4]+1;
    } else if (packageOpen.item.itemRarity.internal_name == internalData.rarities.skins.covert) {
      packageRarityItemsAmount[5] = packageRarityItemsAmount[5]+1;
    }

    // graph stuff
    const timeLineIndex = getIndexFromDate(timeLine, packageOpen.timeFrame.year, packageOpen.timeFrame.month);
    packageOpenValue[timeLineIndex] = packageOpenValue[timeLineIndex]+1;
  }

  // package charts
  packages_types_chart.data.datasets[0].data = [];
  packages_types_chart.data.datasets[0].backgroundColor = "yellow";
  packages_types_chart.data.labels = [];
  packages_types_chart.update();
  packages_types_chart.data.datasets[0].data = packageNamesAmount;
  packages_types_chart.data.datasets[0].backgroundColor = getColorList(packageNamesAmount.length);
  packages_types_chart.data.labels = packageNames;
  packages_types_chart.update();

  packages_unlucks_chart.data.datasets[0].data = [];
  packages_unlucks_chart.update();
  packages_unlucks_chart.data.datasets[0].data = packageRarityItemsAmount;
  packages_unlucks_chart.update();

  container_time_graph.data.datasets[2].data = [];
  container_time_graph.update();
  container_time_graph.data.datasets[2].data = packageOpenValue;
  container_time_graph.update();

  // ------------------------------------------------------------------------------------------
  
  // case drops
  var caseDrops = gameData.gameDrops.case;
  var caseDropNames = [];
  var caseDropNamesAmount = [];

  //console.log(caseDrops);
  for (let index = 0; index < caseDrops.length; index++) {
    const caseDrop = caseDrops[index];

    // add case drop names
    //console.log(caseDrop);
    //console.log(caseDrop.item);
    if (!caseDropNames.includes(caseDrop.item.itemName)) {
      caseDropNames.push(caseDrop.item.itemName);
      caseDropNamesAmount.push(0);
    }
    // add case drop amount to case drop names
    const caseDropRarityItemsAmountIndex = caseDropNames.indexOf(caseDrop.item.itemName);
    caseDropNamesAmount[caseDropRarityItemsAmountIndex] = caseDropNamesAmount[caseDropRarityItemsAmountIndex]+1;

    // graph stuff
    const timeLineIndex = getIndexFromDate(timeLineDrop, caseDrop.timeFrame.year, caseDrop.timeFrame.month);
    caseDropValue[timeLineIndex] = caseDropValue[timeLineIndex]+1;
  }

  // case drop charts
  case_drops_chart.data.datasets[0].data = [];
  case_drops_chart.data.datasets[0].backgroundColor = "yellow";
  case_drops_chart.data.labels = [];
  case_drops_chart.update();
  case_drops_chart.data.datasets[0].data = caseDropNamesAmount;
  case_drops_chart.data.datasets[0].backgroundColor = getColorList(caseDropNamesAmount.length);
  case_drops_chart.data.labels = caseDropNames;
  case_drops_chart.update();

  drops_time_graph.data.labels = [];
  drops_time_graph.data.datasets[0].data = [];
  drops_time_graph.update();
  drops_time_graph.data.labels = timeLineDrop;
  drops_time_graph.data.datasets[0].data = caseDropValue;
  drops_time_graph.update();

  // ------------------------------------------------------------------------------------------
  
  // skin drops
  var skinDrops = gameData.gameDrops.skin;

  var skinDropRarityItemsAmount = [0, 0, 0, 0, 0, 0];

  for (let index = 0; index < skinDrops.length; index++) {
    const skinDrop = skinDrops[index];

    // add rarity amount on skin drop
    if (skinDrop.item.itemRarity.internal_name == internalData.rarities.skins.consumerGrade) {
      skinDropRarityItemsAmount[0] = skinDropRarityItemsAmount[0]+1;
    } else if (skinDrop.item.itemRarity.internal_name == internalData.rarities.skins.industrialGrade) {
      skinDropRarityItemsAmount[1] = skinDropRarityItemsAmount[1]+1;
    } else if (skinDrop.item.itemRarity.internal_name == internalData.rarities.skins.milspec) {
      skinDropRarityItemsAmount[2] = skinDropRarityItemsAmount[2]+1;
    } else if (skinDrop.item.itemRarity.internal_name == internalData.rarities.skins.restricted) {
      skinDropRarityItemsAmount[3] = skinDropRarityItemsAmount[3]+1;
    } else if (skinDrop.item.itemRarity.internal_name == internalData.rarities.skins.classified) {
      skinDropRarityItemsAmount[4] = skinDropRarityItemsAmount[4]+1;
    } else if (skinDrop.item.itemRarity.internal_name == internalData.rarities.skins.covert) {
      skinDropRarityItemsAmount[5] = skinDropRarityItemsAmount[5]+1;
    }

    // graph stuff
    const timeLineIndex = getIndexFromDate(timeLineDrop, skinDrop.timeFrame.year, skinDrop.timeFrame.month);
    skinDropValue[timeLineIndex] = skinDropValue[timeLineIndex]+1;
  }

  // skin drop charts
  skins_drops_chart.data.datasets[0].data = [];
  skins_drops_chart.update();
  skins_drops_chart.data.datasets[0].data = skinDropRarityItemsAmount;
  skins_drops_chart.update();

  drops_time_graph.data.datasets[1].data = [];
  drops_time_graph.update();
  drops_time_graph.data.datasets[1].data = skinDropValue;
  drops_time_graph.update();


  // ------------------------------------------------------------------------------------------
  

  var graffitiDrops = gameData.gameDrops.graffiti;

  for (let index = 0; index < graffitiDrops.length; index++) {
    const graffitiDrop = graffitiDrops[index];

    // graph stuff
    const timeLineIndex = getIndexFromDate(timeLineDrop, graffitiDrop.timeFrame.year, graffitiDrop.timeFrame.month);
    graffitiDropValue[timeLineIndex] = graffitiDropValue[timeLineIndex]+1;
  }

  drops_time_graph.data.datasets[2].data = [];
  drops_time_graph.update();
  drops_time_graph.data.datasets[2].data = graffitiDropValue;
  drops_time_graph.update();
}


// Color Generator
function getColorList(numColors) {
  const startColor = "#00c0f0";
  const endColor = "#3161f3";
  const colorList = [];

  // convert hex colors to RGB values
  const startColorRGB = hexToRgb(startColor);
  const endColorRGB = hexToRgb(endColor);

  // calculate the step size for each RGB value
  const stepSize = 1 / (numColors - 1);
  let currentStep = 0;

  // generate colors in between start and end colors
  for (let i = 0; i < numColors; i++) {
    const r = Math.round(
      interpolateValue(startColorRGB.r, endColorRGB.r, currentStep)
    );
    const g = Math.round(
      interpolateValue(startColorRGB.g, endColorRGB.g, currentStep)
    );
    const b = Math.round(
      interpolateValue(startColorRGB.b, endColorRGB.b, currentStep)
    );
    const color = rgbToHex(r, g, b);
    colorList.push(color);
    currentStep += stepSize;
  }

  return colorList;
}

// helper function to convert hex color to RGB values
function hexToRgb(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return { r, g, b };
}

// helper function to convert RGB values to hex color
function rgbToHex(r, g, b) {
  const hexR = r.toString(16).padStart(2, "0");
  const hexG = g.toString(16).padStart(2, "0");
  const hexB = b.toString(16).padStart(2, "0");
  return `#${hexR}${hexG}${hexB}`;
}

// helper function to interpolate a value between start and end
function interpolateValue(start, end, step) {
  return start + (end - start) * step;
}