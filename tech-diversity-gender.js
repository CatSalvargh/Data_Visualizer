function TechDiversityGender() {
  this.name = 'Tech Diversity: Gender';
  this.id = 'tech-diversity-gender';
  this.loaded = false;

  this.layout = {
      leftMargin: 95,
      rightMargin: width-30,
      topMargin: 40,
      bottomMargin: height,
      pad: 5,
      plotWidth: function() {
        return this.rightMargin - this.leftMargin;
      },
      
      grid: true,
      numXTickLabels: 10,
      numYTickLabels: 8,
  };

  // Middle of the plot: for 50% line.
  this.midX = (this.layout.plotWidth() / 2) + this.layout.leftMargin;

  this.femaleColour = color(194, 62, 221);
  this.maleColour = color(108, 143, 239);

  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/tech-diversity/gender-2018.csv', 'csv', 'header',
      function(table) {
        self.loaded = true;
      });
  };

  this.setup = function() {
    textSize(16);
  };

  this.destroy = function() {
  };

  this.draw = function() {
      if (!this.loaded) {
        console.log('Data not yet loaded');
        return;
      }

      this.drawCategoryLabels();

      var lineHeight = (height - this.layout.topMargin) /
          this.data.getRowCount();

      for (var i = 0; i < this.data.getRowCount(); i++) {
        // Calculate company y position
        var lineY = (lineHeight * i) + this.layout.topMargin;
        // Create an object that stores data from the current row.
        var company = {
            name: this.data.getString(i, 0),
            female: this.data.getNum(i, 1),
            male: this.data.getNum(i, 2)
          };
  
        // Draw the company name in the left margin.
        fill(0);
        noStroke();
        textAlign('right', 'top');
        textSize(12);
        text(company.name,
            this.layout.leftMargin - this.layout.pad,
            lineY);

        stroke(0)
        fill(this.femaleColour);
        rect(this.layout.leftMargin,
            lineY,
            this.mapPercentToWidth(company.female),
            lineHeight - this.layout.pad);

        fill(this.maleColour);
        rect(this.layout.rightMargin,
            lineY,
            this.mapPercentToWidth(-company.male),
            lineHeight - this.layout.pad);
      }

      // Draw 50% line
      stroke(150);
      strokeWeight(1);
      line(this.midX,
          this.layout.topMargin,
          this.midX,
          this.layout.bottomMargin);
    };

  this.drawCategoryLabels = function() {
    fill(245);
    noStroke();
    textSize(18);
    textAlign('left', 'top');
    text('Female',
        this.layout.leftMargin,
        this.layout.pad+5);
    textAlign('center', 'top');
    text('50%',
        this.midX,
        this.layout.pad+5);
    textAlign('right', 'top');
    text('Male',
        this.layout.rightMargin,
        this.layout.pad+5);
  };

  this.mapPercentToWidth = function(percent) {
    return map(percent,
              0,
              100,
              0,
              this.layout.plotWidth());
  };
}
