// import { selectVisualization } from './support/supportFunctions.js'
// import { selectMain, clusterMain as cluster } from './support/globalVariables.js'
import Cluster from './D3-Charts/PopulationCluster.js'
import { barData, retrieveData } from './D3-Charts/continentComparisson.js'
import ChartD3 from './D3-Charts/D3-Chart-Constructor.js'
import CircleChartD3 from './D3-Charts/D3-Circle-Constructor.js'
// import { barChart, values } from './D3-Charts/d3BarChartData.js'
import { pathName, eventhandler, selectVisualization, slowTimer } from './svg-Map.js'

// let getFrame;
let country;
let delay = 1670;
render('global')

eventhandler()

window.buttonClick = () => {
    import('./svg-Map.js').then(
        ({pathName, selectVisualization, slowTimer}) => {
            selectVisualization()
            if (!slowTimer) {
                delay = 835
            }
        })
        console.log(delay)
}

const intervalID = setInterval(() => {intervalfunc() }, delay);

function intervalfunc() {
    if(!pathName){
        country = 'World'
    } else {
        country = pathName
    }

    render(country)
    }

// if (!mapActive) {
//     clearInterval(getFrame)
// }


function render(entity) {
            
            const SecondaryCont = document.querySelector('#continentComparisson')
            const labelcontainer = document.querySelector('#label')
            const dropdown = ['Global', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
         
            labelcontainer.innerHTML = '';

            d3.json('https://countriesnow.space/api/v0.1/countries/population')
            .then((d) => {
                let selectedCcountry = entity
                const APIData = d.data
                let countryData;
                let globalData;
                const parseN = (n) => { return  parseFloat((n / 1000000000).toFixed(2))}

                 APIData.forEach((item, i) => {
                    if (item.country == 'World') {
                        globalData = item
                        globalData.domain = 8
                    }
               
                    if(item.country == selectedCcountry) {
                        countryData = item; 
                    }
                })  
                
                globalData.populationCounts.forEach((g) => {
                    g.date = g.year
                    g.value = parseN(g.value)
                    g.domain = 8
                })

                countryData.populationCounts.forEach((c, i) => {
                    c.date = c.year
                    c.value = parseN(c.value)
                    c.domain = 1.5
                })

                const gobalChart = new ChartD3(globalData.populationCounts, labelcontainer, `${globalData.country}'s Population`, 0.50)
                gobalChart.draw();
                gobalChart .generateAxis();
                gobalChart .drawBars();
                const chart = new ChartD3(countryData.populationCounts, labelcontainer, `${countryData.country}'s Population`, 0.35)
                chart.draw();
                chart.generateAxis();
                chart.drawBars();
            })
}

new Cluster()






