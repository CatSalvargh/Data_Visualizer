class ChartD3 {

    constructor(data, container, title) {
        this.data = data
        this.container = container
        this.title = title
        this.svg = d3.select(this.container).append('svg');
    }

    draw() {
        this.width = this.container.offsetWidth * 0.85
        this.height = this.container.offsetHeight * 0.95;
        this.padding = this.width * 0.075;

        const svg = this.svg
        
        svg.attr('width',  this.width);
        svg.attr('height', this.height);

        svg.append('text')
            .text(this.title)
            .attr('id', 'title')
            .attr('x', this.padding * 2)
            .attr('y', this.padding)

        this.plot = svg.append('g')
                        .attr('transform',`translate(0, ${this.padding})`);
        this.generateScales();
    }

    generateScales() {        
        const data = this.data   
        this.xScale = d3.scaleLinear()
                    .domain([0, data.length -1])
                    .range([this.padding, this.width - this.padding])
    
        this.yScale = d3.scaleLinear()
                        .domain([0, d3.max(data, (d) => {return d.domain})])
                        .range([0, this.height - (2* this.padding)])
           
        this.xAxisScale = d3.scaleTime()
                    .domain([d3.min(data, (d) => {return d.date}), d3.max(data, (d) => {return d.date})])
                    .range([this.padding, this.width - this.padding])
        
        this.yAxisScale = d3.scaleLinear()
                    .domain([0, d3.max(data, (d) => {return d.domain})])     
                    .range([this.height - this.padding, this.padding])
    }    

    generateAxis = function() {
        const xAxis = d3.axisBottom(this.xAxisScale)                
                
        xAxis.ticks(d3.timeYear.every(5))
            .tickFormat(d3.timeFormat('%Y'))
        
        const yAxis = d3.axisLeft(this.yAxisScale)

        this.plot.append('g')
                .attr('id', 'x-axis')
                .attr('transform', `translate(0, ${this.height - (this.padding)})`)
                .call(xAxis)
                .style('font-size', '0.5rem')

        this.plot.append('g')                        
                .attr('id', 'y-axis')
                .call(yAxis)
                .attr('transform', `translate(${this.padding}, 0)`)
                .style('font-size', '0.5rem')
    }

   drawBars() {
        const parseTime = d3.timeParse("%Y")
        const formatTime = d3.timeFormat("%Y")

        const svg = this.svg
        const data = this.data
        const bars = svg.append('g')
                    .attr('class', 'barsG')
        
        const barColor = d3.scaleSequential(d3.interpolateRdYlBu).domain([130, 0])

        const tooltip = svg.append('g')
                        .attr('id', 'tooltip')
                        .attr('opacity', 0)
                        .attr('id', 'tooltip')
                        .attr('x', (this.padding * 2.5))
                        .attr('y', (this.padding * 2))
        
        tooltip.append('text')
            .text('Population number ges here')
            .attr('id', 'title')
            .attr('x', this.padding * 2.8)
            .attr('y', this.padding * 2.3)
            .style('font-size', '0.9em')
            .attr('fill', 'white')

        bars.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr("fill", (d, i) => {return barColor(i + (d.value*10))})
            .attr('width', ((this.width - (2 * this.padding))) / this.data.length)
            .attr('height', (d) => {return this.yScale(d.value)})
            .attr('x', (d, index) => {return this.xScale(index)})
            .attr('y', (d) => {return this.height - this.yScale(d.value)})
            .attr('data-date', (d) => {return d.year})
            .attr('data-population', (d) => {return d.value})
            .on('mouseover', (e, d) => {
                tooltip.select('text')
                        .text(`${formatTime(parseTime(d.date))} - ${d.value} Billion`)
                
                tooltip.attr('opacity', 1)
            })
            .on('mouseout', (d) => {
                tooltip.attr('opacity', 0)
            })
    }
    

drawCircles() {
    const svg = this.svg
    const data = this.data
    const cirColor = d3.scaleSequential(d3.interpolateRdYlBu).domain([120, 0])
    const circlesAtt = d3.range(data.length).map(()=> {
        return {
            cx: Math.floor((Math.random() * this.width)),
            cy: Math.floor((Math.random() * this.height)),
            r: 20
        }
    })

    const circles = svg.append('g')
                    .attr('class', 'circlesG')
        
    circles.selectAll('circle')
                .data(circlesAtt)
                .enter()
                .append('circle')           
                    .attr('cx', (d, i) => {
                        return (d.cx + (i*i))})
                    .attr('cy', (d, i) => {
                        return (d.cy + (i * 10))})
                    .attr('r', (d, i) => {
                        return (d.r + (i * 5))})
                    .style('fill', (d, i) => {return cirColor((d.r + (i * 15)))});
    }
}
    // function updateChart() {
    //         const userInput = document.getElementById('wichContinent').value
    //         const label = document.getElementById('label')

    //         d3.selectAll('rect').remove()
    //         drawChart(userInput.toLowerCase())
    //         label.classList.add('showLabel');

    // }  