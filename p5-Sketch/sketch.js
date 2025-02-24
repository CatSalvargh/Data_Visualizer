import  Gallery from './gallery.js'
import { sum, stringsToNumbers as stN, csvDataload } from '../support-files/helper-functions.js'
import PayGapByJob2017 from './pay-gap-by-job-2017.js'

let gallery;
// const canvasContainner = document.querySelector('.canvas-container');
// const w = canvasContainner.clientWidth;
// const h = canvasContainner.clientHeight;
// let c;
let defaulty;

new p5(function(p5){

    p5.preload = (vis) =>  {  
        const data = p5.loadTable(
            './data/pay-gap/occupation-hourly-pay-by-gender-2017.csv', 'csv', 'header',
            function(table) {
              self.loaded = true;
            });
    }

    p5.setup = () =>  {   
        const canvCont = document.querySelector('.canvas-container');
        const w = canvCont.clientWidth;
        const h = canvCont.clientHeight;
        let c;
        
        gallery = new Gallery(p5, w, h);
        gallery.setUpCanvas(p5);

        defaulty = new PayGapByJob2017(p5, stN, w, h);
        gallery.addVisual(defaulty);

        defaulty.preload(p5);

    };

    p5.draw = () =>  { 

        if (gallery.selectedVisual == null) {
            defaulty.preload(p5);
            defaulty.draw(p5);
        }

        if (gallery.selectedVisual != null) {
            gallery.setUpCanvas();
            // gallery.selectedVisual.preload(p5);
            gallery.selectedVisual.draw(p5);
            // gallery.selectedVisual.preload(p5);
        }
    }

})

