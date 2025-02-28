import  Gallery from './gallery.js'
import { stringsToNumbers as stN, drawAxis, AxisLabels, xTickLabel, yTickLabel  } from '../support-files/helper-functions.js'
import PieChart from './pie-chart.js'
import PayGapByJob2017 from './pay-gap-by-job-2017.js'
import WorldPopHistoric from './Wolrd-Population-by-Year-1950-2023.js'
import TechDiversityGender from './tech-diversity-gender.js'
import TechDiversityRace from './tech-diversity-race.js'
import PayGaptimeSeries from  './pay-gap-1997-2017.js'

let gallery;
const canvasContainner = document.querySelector('.canvas-container');
const w = canvasContainner.clientWidth;
const h = canvasContainner.clientHeight;
let defaultVis;

//Create a new instance of p5 sketch to allow for ES6 Modules integration
new p5(function(p5){

    p5.setup = () =>  {  
       
        gallery = new Gallery(p5, w, h);
        gallery.setUpCanvas(p5);  //The Canvas is created and updated from the gallery

        const pieConstructor = new PieChart(stN) // Instance of Pie chart for the TechDiversityRace

        //Default visualization if no vis is selected
        defaultVis = new PayGapByJob2017(p5, stN, w, h);
        // defaultVis = new TechDiversityRace(p5, stN, w, h, pieConstructor);

        //Add visualizations to the Gallery (some of them receive helper-functions as parameters)
        gallery.addVisual(defaultVis);
        gallery.addVisual(new WorldPopHistoric(p5, w, h, drawAxis, AxisLabels, xTickLabel, yTickLabel));
        gallery.addVisual(new TechDiversityGender(p5, w, h));
        // gallery.addVisual(new PayGapByJob2017(p5, stN, w, h));
        gallery.addVisual(new PayGaptimeSeries(p5, w, h, drawAxis, AxisLabels, xTickLabel, yTickLabel));
        gallery.addVisual(new TechDiversityRace(p5, stN, w, h, pieConstructor));
       
    };

    p5.draw = () =>  { 
        //call default visualization if no other visualization is selected.
        if (gallery.selectedVisual == null) {
            gallery.selectedVisual = defaultVis
        }

        else {
            gallery.setUpCanvas();
            gallery.selectedVisual.setup(p5);
            gallery.selectedVisual.draw(p5);
        }
    }

})

