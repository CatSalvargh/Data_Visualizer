export default class TechDiversityRace {

  constructor(p, sTN, w, h, pieC) {

      this.name = 'Tech Diversity: Race';
      this.id = 'tech-diversity-race';
      this.loaded = false;
      const p5 = p;
      this.width = w;
      this.height = h;
      this.convertoNumber = sTN
      this.pie = pieC
      this.colours = ['rgb(108, 143, 239)','rgb(208, 232, 120)', 'rgb(152, 136, 215)', 'rgb(239, 132, 108)', 'rgb(232, 120, 230)','rgb(152, 214, 221)'];
      
      this.preload(p5)
      this.destroy =  () => {
        if(this.selector){
          // const c = document.getElementById('selectorPie')
          p5.erase();
            p5.rect(100, 100, 40)
            this.selector
          p5.noErase();
          // // c.style('background:black')
          // this.selector.style('background-color:transparent')
          // this.selector.style('color:transparent')
          // this.selector.style('border:none')
          // this.selector.remove()
          // p5.remove()
          // return
        }
       };
  }

  preload(p5) {
      const self = this;
      this.data = p5.loadTable(
        './data/tech-diversity/race-2018.csv', 'csv', 'header',
        function() {
          self.loaded = true;
      });
  };

  setup(p5) {
      if (!this.loaded) {
        console.log('Data not yet loaded');
        return;
      }

      // const tooltipDiv = p5.createDiv('p5*js')
      // tooltipDiv.parent('#app')
      // tooltipDiv.class('tooltipDiv')
      // tooltipDiv.style('background', 'red')
      // tooltipDiv.style('width', '200px')
      // tooltipDiv.style('height', '50px')
      // tooltipDiv.style('position', 'absolute')
      // tooltipDiv.style('top', '0')
      // tooltipDiv.style('left', '2em')
     
      //create select and assign options via for loop
      this.selector = p5.createSelect();
      this.selector.parent('canvasWrapper')
      this.selector.class('selectorPie');
      this.selector.id('selectorPie');
      this.selector.style('background', 'rgba(110, 118, 173, 0.8)');
      this.selector.style('border', '2px solid rgb(171, 167, 206)');
      this.selector.style('font-size', '0.9rem');
      this.selector.position(this.width, this.height * 0.55)
     
      for (let i = 1; i < this.data.columns.length; i++){
        this.selector.option(this.data.columns[i]);
      }

      this.selector.selected('Amazon') //default select option
      this.updateSelector.call(this, p5, 'Amazon')   

      p5.noLoop() //stop this.setup from looping, so it continues to this.draw()
  };

  destroy(p5) {
    if(this.selector){
  //  const selector = p5.select('.selectorPie')
    console.log(selector)
    this.selector.remove()
    // this.selector.style('opacity', 0)
    }
   };

  draw(p5) {
      let companyName;
      
        if (!this.loaded) {
          console.log('Data not yet loaded');
          return;
        }
      
      //update companyName based on selected option
      this.selector.changed(() => {
            companyName = this.selector.selected();
            this.updateSelector.call(this, p5, companyName)
      })
  };

  
  //this function re-renders the pie chart based on current selected option
  updateSelector(p5, company) {
        this.companyName = company
        this.col = this.data.getColumn(this.companyName);
        this.col = this.convertoNumber(this.col); 
        this.title = `Employee diversity at ${this.companyName}`;
        this.labels = this.data.getColumn(0);
    
        this.pie.renderPie(
            p5,
            this.col, 
            this.width / 2, 
            this.height * 0.55, 
            this.width * 0.4, 
            this.labels, 
            this.colours, 
            this.title
        )
  } 
}