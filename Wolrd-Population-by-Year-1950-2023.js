function WorldPopHistoric() {

  this.name = 'World Population 1950-2023';
  this.id = 'Global_world_Population_historic';
  this.loaded = false;

  this.title = 'World Population 1950 to 2023'; 

  this.xAxisLabel = 'Year';
  this.yAxisLabel = 'Billions';

  var marginSize = 35;

  this.layout = {
      marginSize: marginSize,
      leftMargin: marginSize * 3,
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

      grid: true,
      numXTickLabels: 15,
      numYTickLabels: 8,
  };

  this.preload = function() {
    var self = this;
    this.data = loadTable(
      '/data/world-population/population-historic-global-continents.csv', 'csv', 'header',
      function(table) {
        self.loaded = true;
      });

  };

  this.setup = function() {
    textSize(12);
    this.startYear = this.data.getNum(0, 'year');
    this.endYear = this.data.getNum(this.data.getRowCount() - 1, 'year');
    console.log(this.endYear);

    this.minPopulation = 0; 
    this.maxPopulation = max(this.data.getColumn('population'));
  };

  this.destroy = function() {
  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    this.drawTitle();

    drawYAxisTickLabels(this.minPopulation,
                        this.maxPopulation,
                        this.layout,
                        this.mapPopulationToHeight.bind(this),
                        0);
                        
    drawAxis(this.layout);

    // Draw x and y axis labels. helper func
    drawAxisLabels(this.xAxisLabel,
                   this.yAxisLabel,
                   this.layout);

    var previous;
    var numYears = this.endYear - this.startYear;
    for (var i = 0; i < this.data.getRowCount(); i++) {

      var current = {
        year: this.data.getNum(i, 'year'),
        Population: this.data.getNum(i, 'population')
      };

      if (previous != null) {
        stroke('gold');
        strokeWeight(4)
        line(
          this.mapYearToWidth(previous.year), this.mapPopulationToHeight(previous.Population),
          this.mapYearToWidth(current.year), this.mapPopulationToHeight(current.Population)
        );

             
        // The number of x-axis labels to skip so that only numXTickLabels are drawn.
        var xLabelSkip = ceil(int(numYears / this.layout.numXTickLabels));

        // Draw the tick label marking the start of the previous year.
        if (i % xLabelSkip == 0) {
          strokeWeight(1)
          drawXAxisTickLabel(previous.year, this.layout,
                             this.mapYearToWidth.bind(this));
          ellipse(this.mapYearToWidth(previous.year), this.mapPopulationToHeight(previous.Population), 7, 7);

          this.dataToolTip(this.mapYearToWidth(previous.year), this.mapPopulationToHeight(previous.Population), current)
        }
      }

      previous = current;
    }
  };

  this.drawTitle = function() {
    fill(245);
    noStroke();
    textAlign('center', 'center');
    
    push();
    textSize(20);

    text(this.title,
         (this.layout.plotWidth() / 2) + this.layout.leftMargin,
         this.layout.topMargin - (this.layout.marginSize / 2));
    pop();
  };

  this.mapYearToWidth = function(value) {
    return map(value,
               this.startYear,
               this.endYear,
               this.layout.leftMargin,   // Draw left-to-right from margin.
               this.layout.rightMargin);
  };

  this.mapPopulationToHeight = function(value) {
    return map(value, 
      this.minPopulation,
      this.maxPopulation,
      this.layout.bottomMargin,
      this.layout.topMargin
    )
  };

  this.dataToolTip = function(x, y, data){
    let mouseDist = dist(x, y, mouseX, mouseY);
    if (mouseDist < 20) {
      push();
      fill(64, 76, 145, 100);
      stroke(0);
      rect(mouseX-180, mouseY+30, 250, 100, 10)
      fill(207, 110, 207);
      stroke(64, 76, 145);
      strokeWeight(4);
      textSize(22);
      textAlign('CENTER');
      text(`\n\nYear: ${data.year}, \n Population: ${data.Population.toFixed(2)} Billion`, mouseX - 60, mouseY+ 60)
      pop();
    }
  }

}
