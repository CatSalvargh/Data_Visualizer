function ClimateChange() {

  this.name = 'Climate Change';
  this.id = 'climate-change';
  this.loaded = false;
  this.container = select('#canvas')
  
  this.xAxisLabel = 'year';
  this.yAxisLabel = '℃';

  const marginSize = 35;

  this.layout = {
      marginSize: marginSize,

      leftMargin: marginSize * 2,
      rightMargin: width - marginSize,
      topMargin: marginSize,
      bottomMargin: height - marginSize * 2,
      pad: 5,

      plotWidth: function() {
        return this.rightMargin - this.leftMargin;
      },

      plotHeight: function() {
        return this.bottomMargin - this.topMargin;
      },

      grid: false,

      numXTickLabels: 8,
      numYTickLabels: 8,
  };

  this.preload = function() {
      const self = this;
      this.data = loadTable(
        './data/surface-temperature/surface-temperature.csv', 'csv', 'header',
        function(table) {
          self.loaded = true;
        });
  };

  this.setup = function() {
      textSize(12);
      textAlign('center', 'center');

      this.minYear = this.data.getNum(0, 'year');
      this.maxYear = this.data.getNum(this.data.getRowCount() - 1, 'year');
      this.minTemperature = min(this.data.getColumn('temperature'));
      this.maxTemperature = max(this.data.getColumn('temperature'));
      this.meanTemperature = mean(this.data.getColumn('temperature'));
      this.frameCount = 0;

      this.startSlider = createSlider(this.minYear,
                                      this.maxYear - 1,
                                      this.minYear,
                                      1);

      this.startSlider.parent('app')
      this.startSlider.class('startSlider')

      this.endSlider = createSlider(this.minYear + 1,
                                    this.maxYear,
                                    this.maxYear,
                                    1);
      this.endSlider.parent('app');
      this.endSlider.class('endSlider')


      
  };

  this.destroy = function() {
      this.startSlider.remove();
      this.endSlider.remove();
  };

  this.draw = function() {
      if (!this.loaded) {
        console.log('Data not yet loaded');
        return;
      }    
      // Prevent slider ranges overlapping.
      if (this.startSlider.value() >= this.endSlider.value()) {
        this.startSlider.value(this.endSlider.value() - 1);
      }
      this.startYear = this.startSlider.value();
      this.endYear = this.endSlider.value();

      // Draw all y-axis tick labels.
      drawYAxisTickLabels(this.minTemperature,
                          this.maxTemperature,
                          this.layout,
                          this.mapTemperatureToHeight.bind(this),
                          1);

      // Draw x and y axis.
      drawAxis(this.layout);

      // Draw x and y axis labels.
      drawAxisLabels(this.xAxisLabel,
                    this.yAxisLabel,
                    this.layout);

      stroke(200);
      strokeWeight(1);
      line(this.layout.leftMargin,
          this.mapTemperatureToHeight(this.meanTemperature),
          this.layout.rightMargin,
          this.mapTemperatureToHeight(this.meanTemperature));

      // Plot all temperatures between startYear and endYear
      let previous;
      const numYears = this.endYear - this.startYear;
      const segmentWidth = this.layout.plotWidth() / numYears;

      // Count the number of years plotted each frame for animation effect.
      let yearCount = 0;

      // Loop over all rows but only plot those in range.
      for (let i = 0; i < this.data.getRowCount(); i++) {

        // Create an object to store data for the current year.
        const current = {
          // Convert strings to numbers.
          'year': this.data.getNum(i, 'year'),
          'temperature': this.data.getNum(i, 'temperature')
        };

        if (previous != null
            && current.year > this.startYear
            && current.year <= this.endYear) {

          // Draw background gradient to represent colour temperature of current year.
          noStroke();
          fill(this.mapTemperatureToColour(current.temperature));
          rect(this.mapYearToWidth(current.year), 
          this.layout.topMargin, 
          segmentWidth, 
          this.layout.plotHeight());

          // Draw line segment connecting previous year to current year temperature.
          stroke(0);
          line(this.mapYearToWidth(previous.year),
              this.mapTemperatureToHeight(previous.temperature),
              this.mapYearToWidth(current.year),
              this.mapTemperatureToHeight(current.temperature));

          // The number of x-axis labels to skip
          const xLabelSkip = ceil(numYears / this.layout.numXTickLabels);

          // Draw the tick label marking the start of the previous year.
          if (yearCount % xLabelSkip == 0) {
            drawXAxisTickLabel(previous.year, this.layout,
                              this.mapYearToWidth.bind(this));
          }

          // When six or fewer years are displayed, draw the final year x tick label.
          if ((numYears <= 6
              && yearCount == numYears - 1)) {
            drawXAxisTickLabel(current.year, this.layout,
                              this.mapYearToWidth.bind(this));
          }

          yearCount++;
        }

        // Stop drawing this frame when the number of years drawn is
        // equal to the frame count. This creates the animated effect
        // over successive frames.
        if (yearCount >= this.frameCount) {
          break;
        }

        // Assign current year to previous year forn ext iteration
        previous = current;
      }

      // Count the number of frames, to stop the main p5 draw loop when all years have been drawn.
      this.frameCount++;
      if (this.frameCount >= numYears) {
        noLoop();
      }
    };

  this.mapYearToWidth = function(value) {
    return map(value,
              this.startYear,
              this.endYear,
              this.layout.leftMargin,  
              this.layout.rightMargin);
};

this.mapTemperatureToHeight = function(value) {
  return map(value,
              this.minTemperature,
              this.maxTemperature,
              this.layout.bottomMargin, 
              this.layout.topMargin);   };

this.mapTemperatureToColour = function(value) {
  const red =  map(value,
                  this.minTemperature,
                  this.maxTemperature,
                  0,
                  255);
  const blue = 255 - red;
  return color(red, 0, blue, 100);
};
}
