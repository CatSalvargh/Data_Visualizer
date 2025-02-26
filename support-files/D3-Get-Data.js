//This function Fetches data from external IPA and format it in the expected format by the D3 Bar Chart constructor Class
export function getData(selectedCcountry, labelcontainer, ChartD3) {
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
              c.domain = 1.8
          })
  
          //Draw the two  bar charts displayed once the user hovers over the SVG Map
          new ChartD3(globalData.populationCounts, labelcontainer, `${globalData.country}'s Population`, 0.45)
          new ChartD3(countryData.populationCounts, labelcontainer, `${countryData.country}'s Population`, 0.35)
    })
  }