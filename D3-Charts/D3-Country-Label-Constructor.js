export default class CountryLabel {

    constructor(title, entityID) {
        this.container = document.getElementById('mainVisualization')
        this.title = title
        this.id = entityID;       
    }

    draw() {
        this.svg = d3.select(this.container).append('svg')
        this.width = this.container.offsetWidth * 0.25
        this.height = this.container.offsetHeight * 0.5;
        this.padding = this.width * 0.075;

        const svg = this.svg
        d3.json("./data/data.json").then((data) => {
            const cleanData = data.map(function(d) {
                return {
                    Code: d.alpha2Code,
                    Name: d.name, Capital: d.capital, 
                    Region: d.region,
                    Population: d3.format(',')(d.population),
                    "Area (Km 2)": d3.format(',')(d.area),
                    flag: d.flag
                }
           
            })
            cleanData.forEach(d => {

                if(d.Code == this.id) {
                this.flag = d.flag
                this.data = d
                delete this.data['flag']
            }
        })

        this.keys = Object.keys(this.data)
        this.values = Object.values(this.data)

        svg.attr('width',  this.width);
        svg.attr('height', this.height)
            .attr('id', 'countryInfo')
            .style('font-size', '1rem')

            svg.append('text')
            .text(this.title)
            .attr('x', this.width/4)
            .attr('y', this.padding *2)
            .style('fill', 'white')

     

            const countryheaders = svg.append('g')
                                        .attr('class', 'dataToClean')
            const countrydetails = svg.append('g')
                                        .attr('class', 'dataToClean')
            
            countryheaders.selectAll('text')
                        .data(this.keys)
                        .enter()
                        .append('text')
                        .text(d => d + ' : ')
                           .attr('x', this.padding)
                            .attr('y', (d, i) => {return (this.padding * 4) + (i * 20)})
                            .style('fill', 'lightgray')
                            .style('font-size', '0.8rem')


            countrydetails.selectAll('text')
                        .data(this.values)
                        .enter()
                        .append('text')
                        .text(d => d)
                           .attr('x', this.padding + 150)
                            .attr('y', (d, i) => {return (this.padding * 4) + (i * 20)})
                            .style('fill', 'lightgray')
                            .style('font-size', '0.75rem')
                            .style('font-weight', '300')    
  
            const flag = svg.append("svg:image")
                            .attr('class', 'dataToClean')
                
            flag.attr('xlink:href', this.flag)
                .attr('x', this.padding)
                .attr('y', this.padding + 200)
                .attr('width', '4vw')
                .attr('height', '4vh')
        })

        this.clean()
    }

    clean() {
        d3.selectAll('.dataToClean').remove();
    }
}
    
//data surce: https://github.com/DovAzencot/ApiCountries/blob/main/data.json

/* JSON headers (array of country objects)

alpha2Code == id
area:
name:
capital:
currencies: (array) -> code: and name:
demonym
flag
languages: (array)
population
region: (geographical)
subregion:
population:
timezones:
regionalBlocs: (array) -> name: acronym:
callingcodes:
borders:
independent: (boolean)
*/
