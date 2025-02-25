export default class  WorldPopHistoric {
    
  constructor (p, w, h, axis, axisL, xTick, yTick) {

      this.name = 'World Population 1950-2023';
      this.id = 'Global_world_Population_historic';
      this.loaded = false;

      this.title = 'World Population 1950 to 2023'; 
      const self = this;
      const p5 = p
      this.p = p

      this.xAxisLabel = 'Year';
      this.yAxisLabel = 'Billions';

      var marginSize = 30;

      //use imported helper functions to draw each Axis and  its components
      this.Axis = axis;
      this.AxisLabels = axisL
      this.AxisXTickLabel = xTick
      this.AxisYTickLabel = yTick
      
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
    this.preload(p5)
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
      if (!this.loaded) {
        console.log('Data not yet loaded');
        return;
      }
      p5.textSize(12);
      this.startYear = this.data.getString(0, 'year');
      this.endYear = this.data.getNum(this.data.getRowCount() - 1, 'year');
      this.minPopulation = 0; 
      this.maxPopulation = p5.max(this.data.getColumn('population'));
  };

 destroy() {
  };

 draw(p5) {

  const self = this;
      if (!this.loaded) {
        console.log('Data not yet loaded');
        return;
      }

      this.drawTitle(p5);

      this.AxisYTickLabel(p5,
                          this.minPopulation,
                          this.maxPopulation,
                          this.layout,
                          this.mapPopulationToHeight.bind(this, p5),
                          0);
                          
      this.Axis(p5, this.layout);

      this.AxisLabels(p5, 
                    this.xAxisLabel,
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
            this.mapYearToWidth(1990), this.mapPopulationToHeight(5 + i *2),
            this.mapYearToWidth(1998), this.mapPopulationToHeight(7 + i *3)
          );
            
          // console.log(this.mapYearToWidth(1990), this.mapPopulationToHeight(5))

          var xLabelSkip = Math.ceil(numYears / this.layout.numXTickLabels);

          if (i % xLabelSkip == 0) {
            p5.strokeWeight(1)
            this.AxisXTickLabel(p5, previous.year, this.layout,
                              this.mapYearToWidth.bind(this, p5));
            p5.ellipse(this.mapYearToWidth(previous.year), this.mapPopulationToHeight(previous.Population), 7, 7);

            // this.dataToolTip(p5, this.mapYearToWidth(previous.year), this.mapPopulationToHeight(previous.Population), current)
          }
        }

        previous = current;
        
      }
  };

 drawTitle(p5) {
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
      return this.p.map(value,
                this.startYear,
                this.endYear,
                this.layout.leftMargin,   // Draw left-to-right from margin.
                this.layout.rightMargin);
    };

   mapPopulationToHeight(p5, value) {
      return this.p.map(value, 
        this.minPopulation,
        this.maxPopulation,
        this.layout.bottomMargin,
        this.layout.topMargin
      )
  };

//  dataToolTip(p5, x, y, data){
//     let mouseX;
//     let mouseY;
//     let mouseDist 

//     window.addEventListener('mousemove', (e) => {
//         mouseX = e.x 
//         mouseY = e.y
//       })

//       mouseDist = p5.dist(x, y, mouseX, mouseY);
//       if (mouseDist < 20) {
//         p5.push();
//         p5.fill(64, 76, 145, 100);
//         p5.stroke(0);
//         p5.rect(mouseX-150, mouseY, 180, 70, 10)
//         p5.fill(207, 110, 207);
//         p5.stroke(64, 76, 145);
//         p5.strokeWeight(4);
//         p5.textSize(15);
//         p5.textAlign('CENTER');
//         p5.text(`\n\nYear: ${data.year}, \n Population: ${data.Population.toFixed(2)} Billion`, mouseX - 60, mouseY +15)
//         p5.pop();
//       }
//   }

}
