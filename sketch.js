var gallery;

function setup() {
  canvasContainner = select('#app');
  var c = createCanvas(820, 470);
  c.parent('app');
  canvasContainner = select('.extra-vis-container');
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
