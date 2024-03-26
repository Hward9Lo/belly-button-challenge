// Building bubble charts
function buildCharts(sample) {
    const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";
  
    d3.json(url).then((data) => {
      // Obtain data samples
      const samples = data.samples;
      const resultArray = samples.filter((sampleDictionary) => sampleDictionary.id === sample);
      const result = resultArray[0];
      const { otu_ids: otuIDs, otu_labels: otuLabels, sample_values: sampleValues } = result;
  
      // Bubble chart layout
      const bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30 }
      };
  
      // Data for bubble chart
      const bubbleData = [
        {
          x: otuIDs,
          y: sampleValues,
          text: otuLabels,
          mode: "markers",
          marker: {
            size: sampleValues,
            color: otuIDs,
            colorscale: "Earth"
          }
        }
      ];
  
      // Bubble chart
      const bubbleChart = document.getElementById("bubble");
      Plotly.newPlot(bubbleChart, bubbleData, bubbleLayout);
      const yticks = otuIDs.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
  
      // Bar chart data
      const barData = [
        {
          y: yticks,
          x: sampleValues.slice(0, 10).reverse(),
          text: otuLabels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h"
        }
      ];
  
      // Bar chart layout
      const barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
      };
  
      // Bar chart data plot
      const barChart = document.getElementById("bar");
      Plotly.newPlot(barChart, barData, barLayout);
    });
  }
  
  // Build metadata
  function buildMetadata(sample) {
    const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";
  
    d3.json(url).then((data) => {
      // Getting metdata and clearing it
      const metadata = data.metadata;
      const resultArray = metadata.filter(sampleDictionary => sampleDictionary.id == sample);
      const result = resultArray[0];
      const PANEL = d3.select("#sample-metadata");
      PANEL.html("");
  
      // Adding metadata to my panel
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    });
  }
  
  // Initialize the dashboard
  function init() {
    const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";
  
    // Dropdown menu
    const selector = d3.select("#selDataset");
  
    d3.json(url).then((data) => {
      // Getting the names of samples and populating
      const sampleNames = data.names;
      sampleNames.forEach(sampleName => {
        selector.append("option").text(sampleName).property("value", sampleName);
      });
      const firstSample = sampleNames[0];
  
      // Building the charts and metadata
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Dropdown menu and update charts
  function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();