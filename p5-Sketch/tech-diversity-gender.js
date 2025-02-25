export default class TechDiversityGender {
  constructor(p, w, h) {
        this.name = 'Tech Diversity: Gender';
        this.id = 'tech-diversity-gender';
        this.loaded = false;

        const p5 = p
        this.width = w;
        this.height = h;

        this.layout = {
            leftMargin: 95,
            rightMargin: this.width-30,
            topMargin: 40,
            bottomMargin: this.height,
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

        this.femaleColour = 'rgb(194, 62, 221)';
        this.maleColour = 'rgb(108, 143, 239)';

        this.preload(p5)

  }

  preload(p5){
      const self = this;
      this.data = p5.loadTable(
        './data/tech-diversity/gender-2018.csv', 'csv', 'header',
        function(table) {
          self.loaded = true;
      });
  };

  setup(p5){
      p5.textSize(12);
  };

  destroy(){
  };

  draw(p5){
      if (!this.loaded) {
        console.log('Data not yet loaded');
        return;
      }

      this.drawCategoryLabels(p5);

      var lineHeight = (this.height - this.layout.topMargin) /
          this.data.getRowCount();

      for (var i = 0; i < this.data.getRowCount(); i++) {
        var lineY = (lineHeight * i) + this.layout.topMargin;
        var company = {
            name: this.data.getString(i, 0),
            female: this.data.getNum(i, 1),
            male: this.data.getNum(i, 2)
          };
  
        // Draw the company name in the left margin.
        p5.push();
        p5.fill(0);
        p5.noStroke();
        p5.textAlign('right', 'top');
        p5.textSize(12);
        p5.text(company.name,
            this.layout.leftMargin - this.layout.pad,
            lineY);
        p5.pop();
        
        p5.fill(this.femaleColour);
        p5.rect(this.layout.leftMargin,
            lineY,
            this.mapPercentToWidth(p5, company.female),
            lineHeight - this.layout.pad);

        p5.fill(this.maleColour);
        p5.rect(this.layout.rightMargin,
            lineY,
            this.mapPercentToWidth(p5, -company.male),
            lineHeight - this.layout.pad);
      }

      // Draw 50% line
      p5.stroke(150);
      p5.strokeWeight(1);
      p5.line(this.midX,
          this.layout.topMargin,
          this.midX,
          this.layout.bottomMargin);
  };

  drawCategoryLabels(p5){
      p5.fill(245);
      p5.noStroke();
      p5.textSize(18);
      p5.textAlign('left', 'top');
      p5.text('Female',
            this.layout.leftMargin,
            this.layout.pad+5);
      p5.textAlign('center', 'top');
      p5.text('50%',
            this.midX,
            this.layout.pad+5);
      p5.textAlign('right', 'top');
      p5.text('Male',
            this.layout.rightMargin,
            this.layout.pad+5);
  }

  mapPercentToWidth(p5, percent) {
      return p5.map(percent,
                0,
                100,
                0,
                this.layout.plotWidth()
      );
  };
}
