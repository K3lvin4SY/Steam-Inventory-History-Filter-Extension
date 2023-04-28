

function loadChartsNDiagrams() {
  // Create a bar chart
  console.log(document.getElementById('myChart'));
  var xValues = ["Recoil", "Spectrum", "Gamma 2", "Chroma 3", "CS:GO Case"];
  var yValues = [55, 49, 44, 24, 25];
  var barColors = ["red", "green","blue","orange","brown"];

  new Chart(document.getElementById('case_types_chart'), {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Case openings types",
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



/*
var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValues = [55, 49, 44, 24, 15];
var barColors = ["red", "green","blue","orange","brown"];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "World Wine Production 2018"
    }
  }
});
*/