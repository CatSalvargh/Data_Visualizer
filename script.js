
import Cluster from './D3-Charts/PopulationCluster.js'
import { barData, retrieveData } from './D3-Charts/continentComparisson.js'
import ChartD3 from './D3-Charts/D3-Chart-Constructor.js'
import CircleChartD3 from './D3-Charts/D3-Circle-Constructor.js'
import { pathName, pathId, eventhandler, selectVisualization, slowTimer } from './svg-Map.js'
import  CountryLabel from './D3-Charts/D3-Country-Label-Constructor.js' 

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
}

const intervalID = setInterval(() => {intervalfunc() }, delay);

function intervalfunc() {
    if(!pathName){
        country = {country: 'World', pathId: 'WD'}
    } else {
        country = {country: pathName, id: pathId}
    }

    render(country)
    }

// if (!mapActive) {
//     clearInterval(getFrame)
// }


function render(entity) {
            let selectedCcountry = entity
            const SecondaryCont = document.querySelector('#continentComparisson')
            const labelcontainer = document.querySelector('#label')
            const dropdown = ['Global', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
         
            labelcontainer.innerHTML = '';

            d3.json('https://countriesnow.space/api/v0.1/countries/population')
            .then((d) => {
                const APIData = d.data
                let countryData;
                let globalData;
                const parseN = (n) => { return  parseFloat((n / 1000000000).toFixed(2))}

                 APIData.forEach((item, i) => {
                    if (item.country == 'World') {
                        globalData = item
                        globalData.domain = 8
                    }
               
                    if(item.country == selectedCcountry.country) {
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

            console.log(entity.id)
            const countryInfo = new CountryLabel('Country Info', entity.id)
            countryInfo.draw()

}

new Cluster()




async function getCountryData() {
    try {
    const response = await d3.json("./data/data.json")
    console.log(response)







    } catch(error) {
            console.error('Something Bad happened:', error.message)
        }

        
      //data surce: https://github.com/DovAzencot/ApiCountries/blob/main/data.json
  }


