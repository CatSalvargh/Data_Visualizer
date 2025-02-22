let gallery;
const canvasContainner = document.querySelector('.canvas-container');
const w = canvasContainner.clientWidth;
const h = canvasContainner.clientHeight;
let c;
let defaulty;

function setup() {   
    gallery = new Gallery(w, h, c);

    gallery.setUpCanvas();

    defaulty = new TechDiversityRace();
    
    gallery.addVisual(new WorldPopHistoric());
    // gallery.addVisual(new TechDiversityRace());
    gallery.addVisual(new TechDiversityGender());
    gallery.addVisual(defaulty);
    gallery.addVisual(new PayGapByJob2017());
    gallery.addVisual(new PayGapTimeSeries());
    gallery.addVisual(new ClimateChange());
}

function draw() {
    
    if (gallery.selectedVisual == null) {
        defaulty.setup();
        defaulty.draw();
    }

    if (gallery.selectedVisual != null) {
        gallery.setUpCanvas();
        gallery.selectedVisual.draw();
    }
}


