export default class Gallery {

      constructor (p, w, h) {
        this.selectedVisual = null;
        // var self = this;
        this.visuals = [];
        this.p5 = p;
        this.w = w;
        this.h = h;
      }

  setUpCanvas(){
    const p5 = this.p5 
        const c = p5.createCanvas(this.w, this.h);
        c.id('canvas')
        c.parent('app');
        c.style('position', 'relative');
        c.style('inset', 0);
        c.style('width', 100+'%');
        c.style('height', 100+'%');
        c.style('padding', 10+'px');
        c.style('background', 'rgb(63, 72, 120)');

        p5.loop();
  }

  addVisual(vis) {
    const self = this
    const p5 = this.p5 
      if (!vis.hasOwnProperty('id') && !vis.hasOwnProperty('name')) {
        alert('Make sure your visualisation has an id and name!');
      }

      if (this.findVisIndex(vis.id) != null) {
        alert(`Vis '${vis.name}' has a duplicate id: '${vis.id}'`);
      }

      this.visuals.push(vis);
      
      var menuItem = p5.createElement('li', vis.name);
      menuItem.addClass('menu-item');
      menuItem.id(vis.id);
        
      menuItem.mouseOver(function(e) {
          var el = p5.select('#' + e.srcElement.id);
          el.addClass("hover");
      })
        
      menuItem.mouseOut(function(e) {
          var el = p5.select('#' + e.srcElement.id);
          el.removeClass("hover");
      })
        
      menuItem.mouseClicked(function(e) {
          var menuItems = p5.selectAll('.menu-item');
          
          for(var i = 0; i < menuItems.length; i++) {
              menuItems[i].removeClass('selected');
          }
          
          var el = p5.select('#' + e.srcElement.id);
          el.addClass('selected');
          

          self.selectVisual(e.srcElement.id);
      })
        
      var visMenu = p5.select('#visuals-menu');
      visMenu.child(menuItem);

      if (vis.hasOwnProperty('preload')) {
        vis.preload();
      }
  };


  findVisIndex(visId) {
      for (var i = 0; i < this.visuals.length; i++) {
        if (this.visuals[i].id == visId) {
          return i;
        }
      }
      return null;
  };

  selectVisual(visId) {
    const p5 = this.p5 
      var visIndex = this.findVisIndex(visId);

      if (visIndex != null) {
        // if (this.selectedVisual.hasOwnProperty('destroy')) {
                this.setUpCanvas()
                console.log(this.selectedVisual.destroy())
                // this.selectedVisual.destroy(p5);
        // }
        this.selectedVisual = this.visuals[visIndex];

        if (this.selectedVisual.hasOwnProperty('setup')) {
          this.selectedVisual.setup(p5);
        }

        p5.loop();
      }
    };
}
