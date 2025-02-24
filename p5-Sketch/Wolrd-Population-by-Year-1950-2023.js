export default class  WorldPopHistoric {
    
  constructor (p5, w, h) {

      this.name = 'World Population 1950-2023';
      this.id = 'Global_world_Population_historic';
      this.loaded = false;

      this.title = 'World Population 1950 to 2023'; 

      this.p = p5

      this.xAxisLabel = 'Year';
      this.yAxisLabel = 'Billions';

      var marginSize = 30;

      this.layout = {
        marginSize: marginSize,
        leftMargin: marginSize * 3,
        rightMargin: w - marginSize,
        topMargin: marginSize * 1.2,
        bottomMargin: h - marginSize * 2,
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

  }

 preload(p5) {
  const self = this;
    this.data = p5.loadTable(
      '/data/world-population/population-historic-global-continents.csv', 'csv', 'header',
      function(table) {
        self.loaded = true;
      });

  };

 setup(p5) {
      p5.textSize(12);
      this.startYear = this.data.getString(0, 'year');
      this.endYear = this.data.getNum(this.data.getRowCount() - 1, 'year');
      this.minPopulation = 0; 
      this.maxPopulation = p5.max(this.data.getColumn('population'));
  };

 destroy() {
  };

 draw(p5) {
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
          p5.stroke('gold');
          p5.strokeWeight(4)
          p5.line(
            this.mapYearToWidth(previous.year), this.mapPopulationToHeight(previous.Population),
            this.mapYearToWidth(current.year), this.mapPopulationToHeight(current.Population)
          );
            
          var xLabelSkip = ceil(int(numYears / this.layout.numXTickLabels));

          if (i % xLabelSkip == 0) {
            p5.strokeWeight(1)
            drawXAxisTickLabel(previous.year, this.layout,
                              this.mapYearToWidth.bind(this));
            p5.ellipse(this.mapYearToWidth(previous.year), this.mapPopulationToHeight(previous.Population), 7, 7);

            this.dataToolTip(this.mapYearToWidth(previous.year), this.mapPopulationToHeight(previous.Population), current)
          }
        }

        previous = current;
      }
  };

 drawTitle() {
  p5.fill(245);
  p5.noStroke();
  p5.textAlign('center', 'center');
      
  p5.push();
  p5.textSize(16);

  p5.text(this.title,
          (this.layout.plotWidth() / 2) + (this.layout.leftMargin * 0.75),
          this.layout.topMargin - (this.layout.marginSize * 0.75));
          p5.pop();
    };

   mapYearToWidth(value) {
      return p5.map(value,
                this.startYear,
                this.endYear,
                this.layout.leftMargin,   // Draw left-to-right from margin.
                this.layout.rightMargin);
    };

   mapPopulationToHeight(value) {
      return p5.map(value, 
        this.minPopulation,
        this.maxPopulation,
        this.layout.bottomMargin,
        this.layout.topMargin
      )
  };

 dataToolTip(x, y, data){
      let mouseDist = dist(x, y, mouseX, mouseY);
      if (mouseDist < 20) {
        p5.push();
        p5.fill(64, 76, 145, 100);
        p5.stroke(0);
        p5.rect(mouseX-150, mouseY, 180, 70, 10)
        p5.fill(207, 110, 207);
        p5.stroke(64, 76, 145);
        p5.strokeWeight(4);
        p5.textSize(15);
        p5.textAlign('CENTER');
        p5.text(`\n\nYear: ${data.year}, \n Population: ${data.Population.toFixed(2)} Billion`, mouseX - 60, mouseY +15)
        p5.pop();
      }
  }

}
