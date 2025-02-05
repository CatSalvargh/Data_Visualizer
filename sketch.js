var gallery;
const canvasContainner = document.querySelector('.canvas-container');
let w;
let h;

function setup() {
    w = canvasContainner.clientWidth;
    h = canvasContainner.clientHeight;

  var c = createCanvas(w, h);
  c.id('canvas')
  c.parent('app');
  c.style('position', 'relative');
  c.style('inset', 0);
  c.style('width', 100+'%');
  c.style('height', 100+'%');
  c.style('padding', 10+'px');
  c.style('background', 'rgb(128, 137, 188');
  
  const menuContainner = select('.extra-vis-container');
  nav = select('#visuals-menu')
  nav.parent('#main-nav')


  gallery = new Gallery();

  gallery.addVisual(new WorldPopHistoric());
  gallery.addVisual(new TechDiversityRace());
  gallery.addVisual(new TechDiversityGender());
  gallery.addVisual(new PayGapByJob2017());
  gallery.addVisual(new PayGapTimeSeries());
  gallery.addVisual(new ClimateChange());
}

function draw() {
  background(128, 137, 188);
  if (gallery.selectedVisual != null) {
    gallery.selectedVisual.draw();
  }
}
