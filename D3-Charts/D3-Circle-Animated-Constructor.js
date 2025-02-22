export default class AnimatedCircle {

    constructor() {
        this.continentList = ['Global', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
        this.container = document.querySelector('#continentComparisson')
        this.width = this.container.clientWidth
        this.height = this.container.clientHeight
        this.padding = this.width * 0.075;
        
        this.svg = d3.select(this.container).append('svg')
            
        this.draw()
    }

        draw() {
            const svg = this.svg
            svg.attr('width',  this.width)
            .attr('height', this.height)
            .attr('class', 'svg-cont-comparisson')
            .style('background', 'rgb(63, 72, 120)')

            d3.csv('./data/world-population/Continent-area-population.csv')
                    .then(res => {            
                    const data = res.map(function (d){
                        return {
                                id: d.id,
                                x: ((Math.random() * 10) + 1),
                                y: +d.NumberCountries + (2 * d.id),
                                continent: d.Continent,
                                area: +d['Area(Km sq.)'],
                                density: +d.Density,
                                2020: +d['Population(2020)'],
                                2025: +d['Population(Feb 2025)'],
                                2050: +d['PopulationProspects(2050)'],
                                percentageGlobal: +d.WorldPopulationShare,
                                numberCountries: +d.NumberCountries,
                            }
                        })
                
                        console.log(data)
                    const color = d3.scaleSequential(d3.interpolateCool).domain([-3, 5])
                    const random = d3.randomUniform(0.5, 1)

                    const circles = svg.selectAll('g')
                                .attr('class', 'circles')
                                    .data(data)
                    
                    const trans = d3.transition().duration(5000)

                    svg.selectAll('text')
                    .data(data)
                    .join('text')
                    .attr('x',  this.width - this.padding*3)
                    .attr('y', (d, i) => (this.height / 2 + this.padding + (i* 15)))
                    .text((d) => d.continent)
                    .attr('font-size', '0.8rem')
                    .style('fill', (d, i) => {return color(i)})


                    const circle = circles.join(
                        (enter) => enter.append('circle')
                            .attr('cx',  (d, i) => (random() * (this.width / 2) )+ (i^i * 50))
                            .attr('cy', (d, i) => (this.padding / 2 + (random() * (this.height /2 ) ) + (i^i * 20)))
                            .attr('r', 0)
                            .call((selection) => {
                                selection.transition(trans).attr('r', (d) => d.percentageGlobal * 150)
                        }),
                        (update) => update,
                        (exit) => exit.remove()
                        )
                        .style('fill', (d, i) => {return color(i)})
                 
                        svg.append('text')
                        .text(`Per Continent proportion of Earth's population`)
                        .attr('x',  this.width / 4)
                        .attr('y', this.padding / 2)
                        .style('fill', 'white')
                        .style('font-size', '1rem')

                        circle.on('mouseenter', (e, d) => {
                            console.log(e.x, e.y)
                            const x = e.x
                            const y = e.y
                            
                            svg.append('text')
                                    .attr('class', 'circle-datapoint')
                                    .attr('x',  e.x - (this.width * 1.75) )
                                    .attr('y', e.y - (this.height * 1.45) )
                                    .text(`${(d.continent)}: ${Math.round(d.percentageGlobal * 100)}%`)
                                    .attr('font-size', '1rem')
                                    .style('fill', 'white')
                                    .style('font-weight', '300')
                        })
                        .on('mouseout', () => {
                            d3.selectAll('.circle-datapoint').remove()
                        })
                    })          
    }

    clean() {
        d3.selectAll('.dataToClean').remove();
    }
}