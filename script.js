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
let countryInfo;

renderMain('global')
eventhandler()

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
    const labelcontainer = document.querySelector('#label')
    
    //Empty the label before re-rendering the next country's barchart
    labelcontainer.innerHTML = '';

    //Handle the SVG Map and country info display label
    getData(entity, labelcontainer, ChartD3);
    countryInfo = new CountryLabel('Country Info', entity.id) 

    //Draw Cluster
    new Cluster()
}

//Visualization at the Bottom-right-hand side of the screen
new AnimatedCircle()


