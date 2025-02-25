import  Gallery from './gallery.js'
import { sum, stringsToNumbers as stN, drawAxis, AxisLabels, xTickLabel, yTickLabel  } from '../support-files/helper-functions.js'
import PieChart from './pie-chart.js'
import PayGapByJob2017 from './pay-gap-by-job-2017.js'
import WorldPopHistoric from './Wolrd-Population-by-Year-1950-2023.js'
import TechDiversityGender from './tech-diversity-gender.js'
import TechDiversityRace from './tech-diversity-race.js'

let gallery;
const canvasContainner = document.querySelector('.canvas-container');
const w = canvasContainner.clientWidth;
const h = canvasContainner.clientHeight;
let defaulty;
const pieConstructor = new PieChart(p5, sum, stN)

//Create a new instance of p5 sketch to allow for ES6 Modules integration
new p5(function(p5){

    p5.preload = (vis) =>  {  
        const data = p5.loadTable(
            './data/pay-gap/occupation-hourly-pay-by-gender-2017.csv', 'csv', 'header',
            function(table) {
              self.loaded = true;
            });
    }

    p5.setup = () =>  {   
        //The Canvas is created from a Gallery method
        gallery = new Gallery(p5, w, h);
        gallery.setUpCanvas(p5);

        //Default visualization if no vis is selected
        defaulty = new TechDiversityRace(p5, stN, w, h, pieConstructor);
        // defaulty = new TechDiversityGender(p5, w, h);

        //Add visualizations to the Gallery
        gallery.addVisual(defaulty);
        gallery.addVisual(new WorldPopHistoric(p5, w, h, drawAxis, AxisLabels, xTickLabel, yTickLabel));
        gallery.addVisual(new TechDiversityGender(p5, w, h));
        gallery.addVisual(new PayGapByJob2017(p5, stN, w, h));
        // gallery.addVisual(new TechDiversityRace(p5, stN, w, h, pieConstructor));

    };

    p5.draw = () =>  { 

        //call default visualization if no other visualization is selected.
        if (gallery.selectedVisual == null) {
            defaulty.setup(p5);
            defaulty.draw(p5);
        }

        else {
            gallery.setUpCanvas();
            gallery.selectedVisual.setup(p5);
            gallery.selectedVisual.draw(p5);
        }
    }

})

