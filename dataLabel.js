const url = './data/world-population/population-historic-global-continents-table.csv'
const values = []

const container = document.querySelector('#label')
const widthD3 = container.clientWidth;
const heightD3 = container.clientHeight;
const padding = widthD3 * 0.07;

let yScale
let xScale
let xAxisScale
let yAxisScale

const svg = d3.select('#map-label')

svg.append('text')
    .text('Global Population')
    .attr('id', 'title')
    .attr('x', widthD3 * 0.15)
    .attr('y', padding + heightD3 * 0.015)

d3.csv(url).then(function (data) {

    const parseTime = d3.timeParse("%Y")
    const formatTime = d3.timeFormat("%Y")
    data.forEach(d => {
    d.year = parseTime(d.year);
    d.population = +(d.population /1000000000).toFixed(2);
    values.push({year: formatTime(d.year), population: d.population})
    });

    drawCanvas()
    generateScales()
    generateAxis()
    drawBars()

})

const drawCanvas = () => {
    svg.attr('width', widthD3)
    svg.attr('height', heightD3)
}

const  generateScales = () => {
    yScale = d3.scaleLinear()
                .domain([0, d3.max(values, (d) => {return d.population})])
                .range([0, heightD3 - (2*padding)])

    xScale = d3.scaleLinear()
                .domain([0, values.length -1])
                .range([padding, widthD3 - padding])

    let datesArray = values.map((d) => {
        return new Date(d.year)
    })

    xAxisScale = d3.scaleTime()
                .domain([d3.min(datesArray), d3.max(datesArray)])
                .range([padding, widthD3 - padding])
    
    yAxisScale = d3.scaleLinear()
                .domain([0, d3.max(values, (d) => {return d.population})])
                .range([heightD3 - padding, padding])
}

const generateAxis = () => {
    let xAxis = d3.axisBottom(xAxisScale)
                    .ticks(d3.timeYear.every(7))
                    .tickFormat(d3.timeFormat('%Y'))
   
    let yAxis = d3.axisLeft(yAxisScale)

    svg.append('g')
        .attr('id', 'x-axis')
        .attr('transform', `translate(0, ${heightD3 - padding})`)
        .call(xAxis)

    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', `translate(${padding}, 0)`)
}

const drawBars = () => {
    let bars =  svg.append('g')
    let tooltip = svg.append('g')
    
    tooltip.attr('opacity', 0)
            .attr('id', 'tooltip')

    tooltip.append('text')
            .text("This is text")
            .attr('font-size', 13)     
            .attr('fill', 'rgb(187, 179, 11)');
    
    bars.selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('width', ((widthD3 - 2 * padding)) / values.length)
        .attr('data-date', (d) => {return d.year})
        .attr('data-gdp', (d) => {return d.population})
        .attr('height', (d) => {return yScale(d.population)})
        .attr('x', (d, index) => {return xScale(index)})
        .attr('y', (d) => {return heightD3 - padding - yScale(d.population)})
        .attr('fill', '#69a3b2')
        .on('mouseover', (event, d) => {
            tooltip.select('text')
                    .text(`${d.year} - ${d.population} Billion`)
                    .attr('x',  widthD3 * 0.20)
                    .attr('y',  padding + heightD3 * 0.1)                   
                    
            tooltip.attr('opacity', 1)
        })
        .on('mouseout', (d) => {
            tooltip.attr('opacity', 0)
        })
}
