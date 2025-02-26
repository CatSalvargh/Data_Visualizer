export default class CountryLabel {

    constructor(title, entityID) {
        this.container = document.getElementById('mainVisualization')
        this.title = title
        this.id = entityID;  
        
        this.draw();
    }

    draw() {
        //Select container, append SVG and determin the container's size properties
        this.svg = d3.select(this.container).append('svg')
        this.width = this.container.offsetWidth * 0.25
        this.height = this.container.offsetHeight * 0.5;
        this.padding = this.width * 0.075;
        const svg = this.svg

        //Fetch data
        d3.json("./data/data.json")
            .then((data) => {
                const cleanData = data.map(function(d) {
                    return {
                        Code: d.alpha2Code,
                        Name: d.name, Capital: d.capital, 
                        Region: d.region,
                        "Area (Km 2)": d3.format(',')(d.area),
                        Population: d3.format(',')(d.population),
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

        //The onject Keys and values will be used for countyr data into the label text elements
        this.keys = Object.keys(this.data)
        this.values = Object.values(this.data)

        //define SVG size properties respective of its parent container
        svg.attr('width',  this.width);
        svg.attr('height', this.height)
            .attr('id', 'countryInfo')
            .style('font-size', '1rem')

        svg.append('text')
            .text(this.title)
            .attr('x', this.width/4)
            .attr('y', this.padding *2)
            .style('fill', 'white')

        //The following are 2 group elements to contain country data headers and datapoints
        const countryheaders = svg.append('g')
                                    .attr('class', 'dataToClean')
        const countrydetails = svg.append('g')
                                    .attr('class', 'dataToClean')
        
        //append text to the headers (e.g., Name, capital...)
        countryheaders.selectAll('text')
                        .data(this.keys)
                        .enter()
                        .append('text')
                        .text(d => d + ' : ')
                           .attr('x', this.padding)
                            .attr('y', (d, i) => {return (this.padding * 4) + (i * 20)})
                            .style('fill', 'lightgray')
                            .style('font-size', '0.8rem')

        //append text to the datapoints
        countrydetails.selectAll('text')
                        .data(this.values)
                        .enter()
                        .append('text')
                        .text(d => d)
                            .attr('x', this.padding + this.width * 0.35)
                            .attr('y', (d, i) => {return (this.padding * 4) + (i * 20)})
                            .style('fill', 'lightgray')
                            .style('font-size', '0.75rem')
                            .style('font-weight', '300')    

        //append svg image to display country flag
        const flag = svg.append("svg:image")
                            .attr('class', 'dataToClean')
                
        flag.attr('xlink:href', this.flag)
            .attr('x', this.padding)
            .attr('y', this.padding + 200)
            .attr('width', '4vw')
            .attr('height', '4vh')
        })

        this.clean() //call a clean function to avoid next country data overlapping current country data
    }

    clean() {
        d3.selectAll('.dataToClean').remove();
    }
}
    
//JSON Data surce: https://github.com/DovAzencot/ApiCountries/blob/main/data.json