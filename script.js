import Cluster from './D3-Charts/PopulationCluster.js'
import ChartD3 from './D3-Charts/D3-Chart-Constructor.js'
import { pathName, pathId, eventhandler } from './support-files/svg-Map.js'
import { getData } from './support-files/d3-Get-Data.js'
import  CountryLabel from './D3-Charts/D3-Country-Label-Constructor.js' 
import AnimatedCircle from './D3-Charts/D3-Circle-Animated-Constructor.js'

let country;
let interval
let mapActive = false;
const map = document.querySelector('.svg-container')


renderMain('global')
eventhandler() //From svg-Map. It handles mouse events over the map's paths

window.buttonClick = () => {
    // The following dynamic import activates an interval to listen for mouse hovering over the map and get the SVG path ID and name for it to be displayed on the country info label. It clears the interval if the map is not visible.
    import('./support-files/svg-Map.js').then(
        ({selectVisualization }) => {
            selectVisualization()
            if (!map.classList.contains('not-visible') && !mapActive) {
                interval = setInterval(() => {intervalfunc() }, 1670)
                mapActive = true;
            }else {
                clearInterval(interval)
                mapActive = !mapActive;
            }
            renderMain()
    })
}


function intervalfunc() {
    if(!pathName){
        country = {country: 'World', pathId: 'WD'}
    } else {
        country = {country: pathName, id: pathId}
    }
    renderMain(country)
}

function renderMain(entity) {
    const info = document.querySelectorAll('#countryInfo')
    //Empty the SVG Map bart chart label before re-rendering the next country's barchart
    const labelcontainer = document.querySelector('#label')
    labelcontainer.innerHTML = '';

    //Get Data and draw the charts for the SVG Map
    getData(entity, labelcontainer, ChartD3);

    //Draw the country Info label only if the map is visible
    if (mapActive) {
        countryInfo = new CountryLabel('Country Info', entity.id) 
    } else if (!mapActive && info) {
        info.forEach((item) => item.remove())
    }
    
}

//Visualization at the Bottom-right-hand side of the screen
new Cluster()
new AnimatedCircle()


