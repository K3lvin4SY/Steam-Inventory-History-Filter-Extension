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

  case_types_chart = new Chart(document.getElementById('case_types_chart'), {
    type: "bar",
    data: {
      labels: [],
      datasets: [{
        backgroundColor: getColorList(/*length of lables*/),
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
            fontSize: 16
          }
        }]
      }
    }
  });

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
      legend: {
        display: true,
        labels: {
          fontColor: '#b1b1b1',
          fontSize: 14
        }
      },
      title: {
        display: true,
        text: "Number of Openings over time",
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

  // capsules opened of each type
  capsules_types_chart = new Chart(document.getElementById('capsules_types_chart'), {
    type: "bar",
    data: {
      labels: [],
      datasets: [{
        backgroundColor: getColorList(/*length of lables*/),
        data: []
      }]
    },
    options: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "All Capsules Openings",
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

  // packages opened of each type
  packages_types_chart = new Chart(document.getElementById('packages_types_chart'), {
    type: "bar",
    data: {
      labels: [],
      datasets: [{
        backgroundColor: getColorList(/*length of lables*/),
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
            fontSize: 16
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
            fontSize: 16
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
            fontSize: 16
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
            fontSize: 16
          }
        }]
      }
    }
  });

  /* --------------------- Drops -------------------------- */

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
        backgroundColor: getColorList(/* lenght */),
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
            fontSize: 16
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
            fontSize: 16
          }
        }]
      }
    }
  });

  // All Graffiti drops
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
            fontSize: 16
          }
        }]
      }
    }
  });
}


function updateCharts() {
  var caseOpenings = gameData.containerUnlocks.case;

  var caseNames = [];
  var caseNamesAmount = [];

  var caseRarityItemsAmount = [0, 0, 0, 0, 0];

  for (let index = 0; index < caseOpenings.length; index++) {
    const caseOpen = caseOpenings[index];
    
    // add case names
    if (!caseNames.includes(caseOpen.container.itemName)) {
      caseNames.push(caseOpen.container.itemName)
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

  case_types_chart.data.datasets[0].data = caseNamesAmount;
  case_types_chart.data.labels = caseNames;
  case_types_chart.update();

  case_unlucks_chart.data.datasets[0].data = caseRarityItemsAmount;
  case_unlucks_chart.update();
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