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

function loadChartsNDiagrams() {
  // Create a bar chart for cases types
  var xValues = [];
  var yValues = [];
  var barColors = getColorList(xValues.length);

  /*case_types_chart = new Chart(document.getElementById('case_types_chart'), {
    type: "bar",
    data: {
      labels: [],
      datasets: [{
        backgroundColor: [],
        data: []
      }]
    },
    options: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "All Case Openings",
        fontStyle: "bold",
        fontColor: "#b1b1b1",
        fontSize: 24
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: "#b1b1b1",
            fontSize: 16
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: "#b1b1b1",
            fontSize: 16,
            beginAtZero: true
          }
        }]
      }
    }
  });*/

  // cases over time graph
  const xValues2 = ["Jan 2014","Feb 2014","Mar 2014","Apr 2014","May 2014","Jun 2014","Jul 2014","Aug 2014","Sep 2014","Oct 2014"];

  container_time_graph = new Chart(document.getElementById('container_time_graph'), {
    type: "line",
    data: {
      labels: xValues2,
      datasets: [{ 
        label: "Cases",
        data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
        borderColor: "orange",
        fill: false
      }, { 
        label: "Capsules",
        data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
        borderColor: "green",
        fill: false
      }, { 
        label: "Packages",
        data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
        borderColor: "#3161f3",
        fill: false
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
            size: 24,
            weight: "bold"
          },
          fontSize: 24,
          color: "#b1b1b1"
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true
            },
            mode: "xy"
          }
        }
      }
    }
    
    
    
  });

  /*
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
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "All Capsule Openings",
        fontStyle: "bold",
        fontColor: "#b1b1b1",
        fontSize: 24
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: "#b1b1b1",
            fontSize: 16
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: "#b1b1b1",
            fontSize: 16,
            beginAtZero: true
          }
        }]
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
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "All Package Openings",
        fontStyle: "bold",
        fontColor: "#b1b1b1",
        fontSize: 24
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: "#b1b1b1",
            fontSize: 16
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: "#b1b1b1",
            fontSize: 16,
            beginAtZero: true
          }
        }]
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
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Case Unlocks",
        fontStyle: "bold",
        fontColor: "#b1b1b1",
        fontSize: 24
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: "#b1b1b1",
            fontSize: 16
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: "#b1b1b1",
            fontSize: 16,
            beginAtZero: true
          }
        }]
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
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Capsule Unlocks",
        fontStyle: "bold",
        fontColor: "#b1b1b1",
        fontSize: 24
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: "#b1b1b1",
            fontSize: 16
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: "#b1b1b1",
            fontSize: 16,
            beginAtZero: true
          }
        }]
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
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Package Unlucks",
        fontStyle: "bold",
        fontColor: "#b1b1b1",
        fontSize: 24
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: "#b1b1b1",
            fontSize: 16
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: "#b1b1b1",
            fontSize: 16,
            beginAtZero: true
          }
        }]
      }
    }
  });

  // --------------------- Drops --------------------------

  // drops over time graph
  drops_time_graph = new Chart(document.getElementById('drops_time_graph'), {
    type: "line",
    data: {
      labels: ["Jan 2014","Feb 2014","Mar 2014","Apr 2014","May 2014","Jun 2014","Jul 2014","Aug 2014","Sep 2014","Oct 2014"],
      datasets: [{ 
        label: "Cases",
        data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
        borderColor: "orange",
        fill: false
      }, { 
        label: "Skins",
        data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
        borderColor: "#3161f3",
        fill: false
      }, { 
        label: "Graffiti",
        data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
        borderColor: "#b1c3d9",
        fill: false
      }]
    },
    options: {
      legend: {
        display: true,
        labels: {
          fontColor: '#b1b1b1',
          fontSize: 14
        }
      },
      title: {
        display: true,
        text: "Drops over time",
        fontStyle: "bold",
        fontColor: "#b1b1b1",
        fontSize: 24
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: "#b1b1b1",
            fontSize: 16
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: "#b1b1b1",
            fontSize: 16
          }
        }]
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
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Case Drops",
        fontStyle: "bold",
        fontColor: "#b1b1b1",
        fontSize: 24
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: "#b1b1b1",
            fontSize: 16
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: "#b1b1b1",
            fontSize: 16,
            beginAtZero: true
          }
        }]
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
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Skin Drops",
        fontStyle: "bold",
        fontColor: "#b1b1b1",
        fontSize: 24
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: "#b1b1b1",
            fontSize: 16
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: "#b1b1b1",
            fontSize: 16,
            beginAtZero: true
          }
        }]
      }
    }
  });*/
}

/*
function updateCharts() {
  var caseOpenings = gameData.containerUnlocks.case;

  var caseNames = [];
  var caseNamesAmount = [];

  var caseRarityItemsAmount = [0, 0, 0, 0, 0];

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
    if (caseOpen.item.itemRarity == "Mil-Spec Grade") {
      caseRarityItemsAmount[0] = caseRarityItemsAmount[0]+1;
    } else if (caseOpen.item.itemRarity == "Restricted") {
      caseRarityItemsAmount[1] = caseRarityItemsAmount[1]+1;
    } else if (caseOpen.item.itemRarity == "Classified") {
      caseRarityItemsAmount[2] = caseRarityItemsAmount[2]+1;
    } else if (caseOpen.item.itemRarity == "Covert" && caseOpen.item.itemQuality != "★") {
      caseRarityItemsAmount[3] = caseRarityItemsAmount[3]+1;
    } else if (caseOpen.item.itemQuality == "★") {
      caseRarityItemsAmount[4] = caseRarityItemsAmount[4]+1;
    }
  }

  // case charts
  case_types_chart.data.datasets[0].data = caseNamesAmount;
  case_types_chart.data.datasets[0].backgroundColor = getColorList(caseNamesAmount.length);
  case_types_chart.data.labels = caseNames;
  case_types_chart.update();

  case_unlucks_chart.data.datasets[0].data = caseRarityItemsAmount;
  case_unlucks_chart.update();

  // ------------------------------------------------------------------------------------------

  // capsule data collect
  var capsuleOpenings = gameData.containerUnlocks.capsule;
  
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
    if (capsuleOpen.item.itemRarity == "High Grade") {
      capsuleRarityItemsAmount[0] = capsuleRarityItemsAmount[0]+1;
    } else if (capsuleOpen.item.itemRarity == "Remarkable") {
      capsuleRarityItemsAmount[1] = capsuleRarityItemsAmount[1]+1;
    } else if (capsuleOpen.item.itemRarity == "Exotic") {
      capsuleRarityItemsAmount[2] = capsuleRarityItemsAmount[2]+1;
    } else if (capsuleOpen.item.itemRarity == "Extraordinary") {
      capsuleRarityItemsAmount[3] = capsuleRarityItemsAmount[3]+1;
    }
  }

  // capsule charts
  capsules_types_chart.data.datasets[0].data = capsuleNamesAmount;
  capsules_types_chart.data.datasets[0].backgroundColor = getColorList(capsuleNamesAmount.length);
  capsules_types_chart.data.labels = capsuleNames;
  capsules_types_chart.update();

  capsules_unlucks_chart.data.datasets[0].data = capsuleRarityItemsAmount;
  capsules_unlucks_chart.update();

  // ------------------------------------------------------------------------------------------

  // package data collect
  var packageOpenings = gameData.containerUnlocks.package;
  
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
    if (packageOpen.item.itemRarity == "Consumer Grade") {
      packageRarityItemsAmount[0] = packageRarityItemsAmount[0]+1;
    } else if (packageOpen.item.itemRarity == "Industral Grade") {
      packageRarityItemsAmount[1] = packageRarityItemsAmount[1]+1;
    } else if (packageOpen.item.itemRarity == "Mil-Spec Grade") {
      packageRarityItemsAmount[2] = packageRarityItemsAmount[2]+1;
    } else if (packageOpen.item.itemRarity == "Restricted") {
      packageRarityItemsAmount[3] = packageRarityItemsAmount[3]+1;
    } else if (packageOpen.item.itemRarity == "Classified") {
      packageRarityItemsAmount[4] = packageRarityItemsAmount[4]+1;
    } else if (packageOpen.item.itemRarity == "Covert") {
      packageRarityItemsAmount[5] = packageRarityItemsAmount[5]+1;
    }
  }

  // package charts
  packages_types_chart.data.datasets[0].data = packageNamesAmount;
  packages_types_chart.data.datasets[0].backgroundColor = getColorList(packageNamesAmount.length);
  packages_types_chart.data.labels = packageNames;
  packages_types_chart.update();

  packages_unlucks_chart.data.datasets[0].data = packageRarityItemsAmount;
  packages_unlucks_chart.update();

  // ------------------------------------------------------------------------------------------
  
  // case drops
  var caseDrops = gameData.gameDrops.case;
  var caseDropNames = [];
  var caseDropNamesAmount = [];

  for (let index = 0; index < caseDrops.length; index++) {
    const caseDrop = caseDrops[index];

    // add case drop names
    if (!caseDropNames.includes(caseDrops.container.itemName)) {
      caseDropNames.push(caseDrops.container.itemName);
      caseDropNamesAmount.push(0);
    }
    // add case drop amount to case drop names
    const caseDropRarityItemsAmountIndex = caseDropNames.indexOf(caseDrops.container.itemName);
    caseDropNamesAmount[caseDropRarityItemsAmountIndex] = caseDropNamesAmount[caseDropRarityItemsAmountIndex]+1;
  }

  // case drop charts
  case_drops_chart.data.datasets[0].data = caseDropNamesAmount;
  case_drops_chart.data.datasets[0].backgroundColor = getColorList(caseDropNamesAmount.length);
  case_drops_chart.data.labels = caseDropNames;
  case_drops_chart.update();

  // ------------------------------------------------------------------------------------------
  
  // skin drops
  var skinDrops = gameData.gameDrops.skin;

  var skinDropRarityItemsAmount = [0, 0, 0, 0, 0, 0];

  for (let index = 0; index < skinDrops.length; index++) {
    const skinDrop = skinDrops[index];

    // add rarity amount on skin drop
    if (skinDrop.item.itemRarity == "Consumer Grade") {
      skinDropRarityItemsAmount[0] = skinDropRarityItemsAmount[0]+1;
    } else if (skinDrop.item.itemRarity == "Industral Grade") {
      skinDropRarityItemsAmount[1] = skinDropRarityItemsAmount[1]+1;
    } else if (skinDrop.item.itemRarity == "Mil-Spec Grade") {
      skinDropRarityItemsAmount[2] = skinDropRarityItemsAmount[2]+1;
    } else if (skinDrop.item.itemRarity == "Restricted") {
      skinDropRarityItemsAmount[3] = skinDropRarityItemsAmount[3]+1;
    } else if (skinDrop.item.itemRarity == "Classified") {
      skinDropRarityItemsAmount[4] = skinDropRarityItemsAmount[4]+1;
    } else if (skinDrop.item.itemRarity == "Covert") {
      skinDropRarityItemsAmount[5] = skinDropRarityItemsAmount[5]+1;
    }
  }

  // skin drop charts
  skins_drops_chart.data.datasets[0].data = skinDropRarityItemsAmount;
  skins_drops_chart.update();


  // ------------------------------------------------------------------------------------------
  

  var graffitiDrops = gameData.gameDrops.graffiti;

  for (let index = 0; index < graffitiDrops.length; index++) {
    const graffitiDrop = graffitiDrops[index];
  }
}
*/


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