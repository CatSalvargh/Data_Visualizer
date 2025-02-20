function PayGapTimeSeries() {

  this.name = 'Pay gap: 1997-2017';
  this.id = 'pay-gap-timeseries';
  this.loaded = false;

  this.title = 'Gender Pay Gap: Average difference between male and female pay'

  this.xAxisLabel = 'year';
  this.yAxisLabel = '% difference';

  var marginSize = 40;

  this.layout = {
      marginSize: marginSize,
      leftMargin: marginSize * 2,
      rightMargin: width - marginSize,
      topMargin: marginSize *1.1,
      bottomMargin: height - marginSize * 2,
      pad: 5,

      plotWidth: function() {
        return this.rightMargin - this.leftMargin;
      },

      plotHeight: function() {
        return this.bottomMargin - this.topMargin;
      },

      grid: true,
      numXTickLabels: 10,
      numYTickLabels: 8,
  };

  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/pay-gap/all-employees-hourly-pay-by-gender-1997-2017.csv', 'csv', 'header',
      function(table) {
        self.loaded = true;
      }); 

  };

  this.setup = function() {
    textSize(16);

    this.startYear = this.data.getNum(0, 'year');
    this.endYear = this.data.getNum(this.data.getRowCount() - 1, 'year');

    this.minPayGap = 0; 
    this.maxPayGap = max(this.data.getColumn('pay_gap'));
  };

  this.destroy = function() {
  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    this.drawTitle();

    // Draw all y-axis labels. helper func
    drawYAxisTickLabels(this.minPayGap,
                        this.maxPayGap,
                        this.layout,
                        this.mapPayGapToHeight.bind(this),
                        0);

    // Draw x and y axis. helper func
    drawAxis(this.layout);

    // Draw x and y axis labels. helper func
    drawAxisLabels(this.xAxisLabel,
                   this.yAxisLabel,
                   this.layout);

    // Plot all pay gaps between startYear and endYear using the width
    // of the canvas minus margins.
    var previous;
    var numYears = this.endYear - this.startYear;

    // Loop over all rows and draw a line from previous value to the current.
    for (var i = 0; i < this.data.getRowCount(); i++) {

      // Create an object to store data for the current year.
      var current = {
        year: this.data.getNum(i, 0),
        payGap: this.data.getNum(i, 3)
      };

      if (previous != null) {
        stroke(255, 30, 0);
        strokeWeight(3);
        line(
          this.mapYearToWidth(previous.year), this.mapPayGapToHeight(previous.payGap),
          this.mapYearToWidth(current.year), this.mapPayGapToHeight(current.payGap)
        );

        // The number of x-axis labels to skip so that only numXTickLabels are drawn.
        var xLabelSkip = ceil(numYears / this.layout.numXTickLabels);

        if (i % xLabelSkip == 0) {
          drawXAxisTickLabel(previous.year, this.layout,
                             this.mapYearToWidth.bind(this));
        }
      }
      previous = current;
    }
  };

  this.drawTitle = function() {
    fill(220);
    noStroke();
    textAlign('center', 'center');

    text(this.title,
         (this.layout.plotWidth() / 2) + this.layout.leftMargin,
         this.layout.topMargin - (this.layout.marginSize * 0.8));
  };

  this.mapYearToWidth = function(value) {
    return map(value,
               this.startYear,
               this.endYear,
               this.layout.leftMargin,   // Draw left-to-right from margin.
               this.layout.rightMargin);
  };

  this.mapPayGapToHeight = function(value) {
    return map(value, 
              this.minPayGap,
              this.maxPayGap,
              this.layout.bottomMargin,
              this.layout.topMargin
            )
  };
}
