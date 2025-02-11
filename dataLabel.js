const url = './data/world-population/population-historic-global-continents-table.csv'
const values = []

const container = document.querySelector('#label')
const widthD3 = container.clientWidth;
const heightD3 = container.clientHeight;
const padding = widthD3 * 0.09;

let yScale
let xScale
let xAxisScale
let yAxisScale

const svg = d3.select('#label').append('svg').attr('id', 'map-label')
// const continentList = document.getElementById('wichContinent').options;
// const continents = ['Global', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

// continents.forEach(option => continentList.add(new Option(option)));

updateChart()
drawChart('global')

function drawChart(entity) {
    const values = []
    d3.csv(url)
        .then(function (data) {
            const parseTime = d3.timeParse("%Y")
            const formatTime = d3.timeFormat("%Y")
            let entityData
            const parseN = (n) => { return  parseFloat((n / 1000000000).toFixed(2))}

            data.forEach(d => {
                d.year = parseTime(d.year);
                d.africa = parseN(d.africa)
                d.americas = parseN(d.americas)
                d.asia = parseN(d.asia)
                d.europe = parseN(d.europe)
                d.oceania = parseN(d.oceania)
                d.global = parseN(d.global)

                if (entity == 'global') {
                        entityData = d.global
                } else if (entity == 'africa') {
                    entityData = d.africa
                } else if (entity == 'americas') {
                    entityData = d.americas
                } else if (entity == 'asia') {
                    entityData = d.asia
                } else if (entity == 'europe') {
                    entityData = d.europe
                } else if (entity == 'oceania') {
                    entityData = d.oceania
                } 
                values.push({year: formatTime(d.year), global: d.global, population: entityData}) 
        })

        drawCanvas()
        generateScales(values)
        generateAxis()
        drawBars(values)
   })
}
    
const drawCanvas = () => {
    svg.attr('width', widthD3)
    svg.attr('height', heightD3)
    svg.append('text')
        .text('Global Population')
        .attr('id', 'title')
        .attr('x', widthD3 * 0.13)
        .attr('y', padding + heightD3 * 0.018)
}

const  generateScales = (arr) => {
   xScale = d3.scaleLinear()
                .domain([0, arr.length -1])
                .range([padding, widthD3 - padding])

    yScale = d3.scaleLinear()
    .domain([0, d3.max(arr, (d) => {return d.global})]) //d.population is where the numeric value is store in the values aray
    .range([0, heightD3 - (2*padding)])

    let datesArray = arr.map((d) => {
        return new Date(d.year)
    })

    xAxisScale = d3.scaleTime()
                .domain([d3.min(datesArray), d3.max(datesArray)])
                .range([padding, widthD3 - padding])
    
    yAxisScale = d3.scaleLinear()
                .domain([0, d3.max(arr, (d) => {return d.global})])
                .range([heightD3 - padding, padding])
}

const generateAxis = () => {
    let xAxis = d3.axisBottom(xAxisScale)
                    .ticks(d3.timeYear.every(17))
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

const drawBars = (arr) => {
    let bars = svg.append('g')
                .attr('class', 'barsG')
    
    let barColor = d3.scaleSequential(d3.interpolateRdYlBu).domain([130, 0])

    let tooltip = d3.select('svg')
                    .append('g')
                    .attr('opacity', 1)
                    .attr('id', 'tooltip')
                    .attr('x', widthD3 * 0.13)
                    .attr('y', padding + heightD3 * 0.022)
                    
    tooltip.append('text')
            .data(arr)
            .attr('fill', 'white')
                            
    bars.selectAll('rect')
        .data(arr)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr("fill", (d, i) => {return barColor(i + (d.population*10))})
        .attr('width', ((widthD3 - 2 * padding)) / arr.length)
        .attr('data-date', (d) => {return d.year})
        .attr('data-population', (d) => {return d.population})
        .attr('height', (d) => {return yScale(d.population)})
        .attr('x', (d, index) => {return xScale(index)})
        .attr('y', (d) => {return heightD3 - padding - yScale(d.population)})
        .on('mouseover', (event, d) => {
            // tooltip.attr('transform', `translate(${event.x}, ${event.y})`)
            tooltip.select('text')
                    .text(`${d.year} - ${d.population} Billion`)
            
            tooltip.attr('opacity', 1)
        })
        .on('mouseout', (d) => {
            tooltip.attr('opacity', 0)
        })
}

// function updateChart() {
//         const userInput = document.getElementById('wichContinent').value
//         const label = document.getElementById('label')

//         d3.selectAll('rect').remove()
//         drawChart(userInput.toLowerCase())
//         label.classList.add('showLabel');
// }