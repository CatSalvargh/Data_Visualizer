const container = document.querySelector('.map-container')
const contWidth = container.clientWidth;
const contHeight = container.clientHeight;

const marginD3 = {top: 30, right: 30,  bottom: 50, left: 30}
const widthD3 =  contWidth * 0.35 - marginD3.left - marginD3.right;
const heightD3 =  contHeight * 0.33 - marginD3.top - marginD3.bottom;

//If needed copy/paste commented code below from here

const data1 = [
    {continent: "africa", value: 22},
    {continent: "americas", value: 33}, 
    {continent: "asia", value: 13},
    {continent: "europe", value: 7},
    {continent: "oceania", value: 12},
    {continent: "Global", value: 24},
]
// const data1 = [
//     {continent: "africa", value: 227776419},
//     {continent: "americas", value: 335791493}, 
//     {continent: "asia", value: 1368075411},
//     {continent: "europe", value: 548867469},
//     {continent: "oceania", value: 12582041},
//     {continent: "Global", value: 2493092833},
// ]

console.log(data1);

const svg = d3.select('#label')
    .append('svg')
    .attr('width', widthD3 + marginD3.left + marginD3.right)
    .attr('height', heightD3 + marginD3.top + marginD3.bottom)
    .append('g')
    .attr('transform', `translate(${marginD3.left},${marginD3.top})`) 

const x = d3.scaleBand()
    .range([0, widthD3])
    .domain(data1.map(function(d) {return d.continent}))
    .padding(0.15);

const y = d3.scaleLinear()
    .range([heightD3, 0])
    .domain([0, d3.max(data1, d => (d.value))])

svg.append('g')
    .attr('transform', `translate(0, ${heightD3})`)
    .style('font-size', '14px')
    .call(d3.axisBottom(x));
    //     .ticks(d3.timeYear.every(7))
    //     .tickFormat(d3.timeFormat('%b %Y')))
    //     .selectAll('.tick line')
    //     .style('stroke-opacity', 1)
    // svg.selectAll('.tick text')
    //     .attr('fill', '#777');

svg.append('g')
    .style('font-size', '14px')
    .call(d3.axisLeft(y));

svg.selectAll('test')
.data(data1)
.enter()
.append('rect')
    .attr('x', function(d) { return x(d.continent)})
    .attr('y', function(d) { return y(d.value)})
    .attr('width', x.bandwidth()*.6)
    .attr('height', function(d) {return heightD3 - y(d.value)})
    .attr('fill', 'rgb(207, 110, 207)')
// to here


// const data1 = [
//     {continent: "africa", value: 22},
//     {continent: "americas", value: 33}, 
//     {continent: "asia", value: 13},
//     {continent: "europe", value: 7},
//     {continent: "oceania", value: 12},
//     {continent: "Global", value: 24},
// ]

// const xD3 = d3.scaleTime()
//     .range([0, widthD3]);

// const yD3 = d3.scaleLinear()
//     .range([heightD3, 0]);

//     const svg = d3.select('#label')
//     .append('svg')
//         .attr('width', widthD3 + marginD3.left + marginD3.right)
//         .attr('height', heightD3 + marginD3.top + marginD3.bottom)
//     .append('g')
//         .attr('transform', `translate(${marginD3.left},${marginD3.top})`) 

// d3.csv('./data/world-population/population-historic-global-continents-table.csv').then(function (data) {

//     const parseYear = d3.timeFormat("%Y");
//     data.forEach(d => {
//         d.year = parseYear(d.year);
//         d.population = +d.population;
//     });
//     console.log(data);

// xD3.domain(d3.extent(data, d => d.year));
// yD3.domain([0, d3.max(data, d => (d.population/1000000000))]); 

// svg.append('g')
//     .attr('transform', `translate(0, ${heightD3})`)
//     .style('font-size', '14px')
//     .call(d3.axisBottom(xD3)
//         .ticks(d3.timeYear.every(7))
//         .tickFormat(d3.timeFormat('%b %Y')))
//         .selectAll('.tick line')
//         .style('stroke-opacity', 1)
//     svg.selectAll('.tick text')
//         .attr('fill', '#777');

// svg.append('g')
//     .style('font-size', '14px')
//     .call(d3.axisLeft(yD3))
// })