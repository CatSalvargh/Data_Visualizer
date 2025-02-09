let gallery;
const canvasContainner = document.querySelector('.canvas-container');
const w = canvasContainner.clientWidth;
const h = canvasContainner.clientHeight;
let c;

function setup() {   
    gallery = new Gallery(w, h, c);

    gallery.setUpCanvas();

    gallery.addVisual(new WorldPopHistoric());
    gallery.addVisual(new TechDiversityRace());
    gallery.addVisual(new TechDiversityGender());
    gallery.addVisual(new PayGapByJob2017());
    gallery.addVisual(new PayGapTimeSeries());
    gallery.addVisual(new ClimateChange());
}

function draw() {
    if (gallery.selectedVisual != null) {
        gallery.selectedVisual.draw();
    }
}
