const marginD3 = {top: 30, right: 30,  bottom: 50, left: 50}
const widthD3 = 500 - marginD3.left - marginD3.right;
const heightD3 = 300 - marginD3.top - marginD3.bottom;

const xD3 = d3.scaleTime()
    .range([0, widthD3]);

const yD3 = d3.scaleLinear()
    .range([heightD3, 0]);

    const svg = d3.select('#label')
    .append('svg')
        .attr('width', widthD3 + marginD3.left + marginD3.right)
        .attr('height', heightD3 + marginD3.top + marginD3.bottom)
    .append('g')
        .attr('transform', `translate(${marginD3.left},${marginD3.top})`) 

d3.csv('./data/world-population/population-historic-global-continents-table.csv').then(function (data) {

    const parseYear = d3.timeFormat("%Y");
    data.forEach(d => {
        d.year = parseYear(d.year);
        d.population = +d.population;
    });
    console.log(data);

xD3.domain(d3.extent(data, d => d.year));
yD3.domain([0, d3.max(data, d => (d.population/1000000000))]); 

svg.append('g')
    .attr('transform', `translate(0, ${heightD3})`)
    .style('font-size', '14px')
    .call(d3.axisBottom(xD3)
        .ticks(d3.timeYear.every(7))
        .tickFormat(d3.timeFormat('%b %Y')))
        .selectAll('.tick line')
        .style('stroke-opacity', 1)
    svg.selectAll('.tick text')
        .attr('fill', '#777');

svg.append('g')
    .style('font-size', '14px')
    .call(d3.axisLeft(yD3))
})