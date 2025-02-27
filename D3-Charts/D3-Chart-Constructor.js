export default class ChartD3 {

    constructor(data, container, title, size, dropdownArr) {
        this.data = data
        this.container = container
        this.title = title
        this.svg = d3.select(this.container).append('svg');
        this.dropdown = dropdownArr
        this.sizeFactor = size

        this.draw();
    }

    draw() {
        this.width = this.container.offsetWidth * this.sizeFactor
        this.height = this.container.offsetHeight
        this.padding = this.height * 0.1;

        const svg = this.svg
        
        svg.attr('width',  this.width);
        svg.attr('height', this.height);

        svg.append('text')
            .text(this.title)
            .attr('id', 'title')
            .attr('x', this.padding * 4)
            .attr('y', this.padding * 1.25)

        this.plot = svg.append('g')
                    
        this.generateScales();
        this.generateAxis();
        this.drawBars();
    }

    generateScales() {    
        const formatTime = d3.timeFormat("%Y")
        const data = this.data   
        this.xScale = d3.scaleLinear()
                    .domain([0, data.length -1])
                    .range([this.padding, this.width - this.padding])
    
        this.yScale = d3.scaleLinear()
                        .domain([0, d3.max(data, (d) => {return d.domain})])
                        .range([0, this.height - this.padding])
           
        this.xAxisScale = d3.scaleTime()
                    .domain([d3.min(data, (d) => {return d.year}), d3.max(data, (d) => {return d.year})])
                    .range([this.padding, this.width - this.padding])

        this.yAxisScale = d3.scaleLinear()
                    .domain([0, d3.max(data, (d) => {return d.domain})])     
                    .range([this.height - (2 * this.padding), 0])
    }    

    generateAxis() {
        const xAxis = d3.axisBottom(this.xAxisScale)                
                        .ticks(10)
                        // .ticks(d3.timeYear.every(5))
                        // .tickFormat(d3.timeFormat('%Y'))
        
        const yAxis = d3.axisLeft(this.yAxisScale)

        this.plot.append('g')
                .attr('id', 'x-axis')
                .attr('transform', `translate(${this.padding * 1.25}, ${this.height - this.padding * 1.75})`)
                .call(xAxis)
                .style('font-size', '0.5rem')

        this.plot.append('g')                        
                .attr('id', 'y-axis')
                .call(yAxis)
                .attr('transform', `translate(${this.padding * 2}, ${this.padding * 0.25})`)
                .style('font-size', '0.5rem')
                .append('text')
                    .text('Billions')
                    .attr('transform', 'rotate(-90)')
                    .attr('x', - this.height / 4)
                    .attr('y', - this.padding * 0.85)
                    .style('fill', 'lightGray')
                    .style('font-size', '0.85rem')
    }

    genTooltip() {
        const svg = this.svg
        const tooltip = svg.append('g')
                           .attr('id', 'tooltip')
                           .attr('id', 'tooltip')
                           .attr('x', (this.padding * 4))
                           .attr('y', (this.padding * 2))
           return tooltip;
    }

   drawBars() {
        const formatTime = d3.timeFormat("%Y")

        const svg = this.svg
        const data = this.data
        const bars = svg.append('g')
                    .attr('class', 'barsG')
        
        const barColor = d3.scaleSequential(d3.interpolateRdYlBu).domain([130, 0])

        const tooltip = this.genTooltip()
        
        tooltip.append('text')
            .text('Hover over the bars to see population')
            .attr('id', 'title')
            .attr('x', this.padding * 2.8)
            .attr('y', this.padding * 2.3)
            .style('font-size', '0.55em')
            .attr('fill', 'lightgray')

        bars.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr("fill", (d, i) => {return barColor(i + (d.value*10))})
            .attr('width', ((this.width - (2 * this.padding))) / this.data.length)
            .attr('height', (d) => {return this.yScale(d.value)})
            .attr('x', (d, index) => {return this.padding + this.xScale(index)})
            .attr('y', (d) => {return (this.height - this.padding * 1.8) - this.yScale(d.value)})
            .on('mouseover', (e, d) => {
                tooltip.select('text')
                        .text(`${(d.year)} - ${d.value} Billion`)
                        .style('font-size', '0.85em')
                        .attr('fill', 'white')
                
                tooltip.attr('opacity', 1)
            })
            .on('mouseout', (d) => {
                tooltip.attr('opacity', 0)
            })
    }
    

drawCircles() {
    const formatTime = d3.timeFormat("%Y")
    const svg = this.svg
    const data = this.data
    const cirColor = d3.scaleSequential(d3.interpolateRdYlBu).domain([160, 0])
    const circlesAtt = d3.range(data.length).map(()=> {
        return {
            cx: Math.floor((Math.random() * this.width)),
            cy: Math.floor((Math.random() * this.height)),
            r: 20
        }
    })

    const circles = svg.append('g')
                    .attr('class', 'circlesG')
    const circle = circles.selectAll('circle')
                    .data(circlesAtt)
                    .enter()
                    .append('circle')           
                        .attr('cx', (d, i) => {
                            return (d.cx + (i*i))})
                        .attr('cy', (d, i) => {
                            return (d.cy + (i * 10))})
                        .style('fill', (d, i) => {return cirColor((d.r + (i * 20)))})
                        .style('opacity', '0.75');
                        
    const tooltip = this.genTooltip()
    
    circle.data(data)
            .attr('r', (d) => {
            return d.value*8})
            .on('mouseover', (e, d) => {
                const x = e.offsetX
                const y = e.offsetY
                        tooltip.append('text')
                        .text(`Global population - ${formatTime(d.year)} - ${d.value} Billion`)
                        .attr('x', x)
                        .attr('y', y)
                        .style('font-size', '0.5em')
                        .attr('fill', 'black')

                tooltip.attr('opacity', 1)

            })
            .on('mouseout', (d) => {
                tooltip.text('')
                tooltip.attr('opacity', 0)
            })
    

    const circText = circles.selectAll('text')
                            .data(circlesAtt)
                            .enter()
                            .append('text')           
                                .attr('x', (d, i) => {return (d.cx - (i / d.cx))})
                                .attr('y', (d, i) => {return (d.cy + (i * 10))})
        
    circText.data(data)
        .text((d) => {return `${formatTime(d.year)}: ${d.value} B`})
        .style('font-size', '10px')
        .style('fill', '#d6e0e1')
    }

    setupDropdown() {
        if (this.dropdown)  {
            const dropdown = d3.select(this.container).append('select')
                                .attr('id', 'dropdown')
                                .attr('class', 'userInput')

            dropdown.selectAll("option")
                     .data(this.dropdown)
                     .enter()
                     .append("option")
                     .attr("value", (d) => {return d})
                     .text((d) => {return d})
                     .attr('width', '20px')
       }
    }

    cleanChart() {
        d3.select(this.svg).remove()
    }

    // updateChart() { ESTO PARA EL COMPARADOR INTERACTIVO
    //     const userInput = document.getElementById('dropdown').value
    //     // const label = document.getElementById('label')

    //     // d3.selectAll('rect').remove()
    //     // drawChart(userInput.toLowerCase())
    //     // label.classList.add('showLabel');
    
    // }  

}
