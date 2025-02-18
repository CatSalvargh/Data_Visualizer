function TechDiversityRace() {

  this.name = 'Tech Diversity: Race';
  this.id = 'tech-diversity-race';
  this.loaded = false;

  this.preload = function() {
      var self = this;
      this.data = loadTable(
        './data/tech-diversity/race-2018.csv', 'csv', 'header',
        function(table) {
          self.loaded = true;
        });
  };

  this.setup = function() {
      if (!this.loaded) {
        console.log('Data not yet loaded');
        return;
      }

      this.select = createSelect();
      this.select.parent('canvasWrapper')
      this.select.class('selectorPie');
      this.select.style('background', 'rgba(110, 118, 173, 0.8)');
      this.select.style('border', '2px solid rgb(171, 167, 206)');
      this.select.style('font-size', 18+'px');

      for (var i = 1; i < this.data.columns.length; i++){
          this.select.option(this.data.columns[i]);
      }
  };

  this.destroy = function() {
    this.select.remove();
  };

  this.pie = new PieChart(width / 2, height * 0.55, width * 0.4);

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }
  
    var companyName = this.select.selected();

    var col = this.data.getColumn(companyName);
    // Convert all data strings to numbers.
    col = stringsToNumbers(col);

    var labels = this.data.getColumn(0);
    var colours = ['rgb(108, 143, 239)','rgb(208, 232, 120)', 'rgb(152, 136, 215)', 'rgb(239, 132, 108)', 'rgb(232, 120, 230)','rgb(152, 214, 221)'];

    var title = 'Employee diversity at ' + companyName;

    this.pie.draw(col, labels, colours, title);

  };
}
