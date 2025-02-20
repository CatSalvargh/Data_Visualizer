export default class CircleChartD3 {

    constructor(data, container, title, uInput, globalP) {
        this.data = data
        this.container = container
        this.title = title
        this.svg = d3.select(this.container).append('svg');
        this.input = uInput
        this.year = 2018
        this.global = globalP
    }

    draw() {
        // console.log(this.data, this.global)
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
                    .domain([d3.min(data, (d) => {return d.year}), d3.max(data, (d) => {return d.year})])
                    .range([this.padding, this.width - this.padding])
        
        this.yAxisScale = d3.scaleLinear()
                    .domain([0, d3.max(data, (d) => {return d.domain})])     
                    .range([this.height - this.padding, this.padding])
    }    

    generateAxis() {
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

    genTooltip() {
    const svg = this.svg
     const tooltip = svg.append('g')
                        .attr('id', 'tooltip')
                        .attr('opacity', 0)
                        .attr('id', 'tooltip')
                        .attr('x', (this.padding * 2.5))
                        .attr('y', (this.padding * 2))
        return tooltip;
    } 

    drawCircles() {
    const formatTime = d3.timeFormat("%Y")
    const parseN = (n) => { return  parseFloat((n / 1000000).toFixed(2))}
    const svg = this.svg
    const data = this.data
    const self = this
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


    svg.append('circle')
        .attr('class', 'circlesG')
        .attr('cx', this.container.offsetWidth * 0.3 )
        .attr('cy', this.container.offsetHeight * 0.3)
        .attr('r', this.global * 10)


    data.forEach(d => {    
    if (this.year == d.year) {
        const circle = circles.selectAll('circle')
                        .data(circlesAtt)
                        .enter()
                        .append('circle')           
                            .attr('cx', this.container.offsetWidth * 0.5 )
                            .attr('cy', this.container.offsetHeight * 0.5)
                            .style('fill', '#fff')
                            .style('opacity', '0.75');
                        
            const tooltip = this.genTooltip()

            circle.data(data)
                    .attr('r', (d) => {
                    return parseN(d.value) })
                    .on('mouseover', (e, d) => {
                        const x = e.offsetX
                        const y = e.offsetY
                                tooltip.append('text')
                                .text(`${this.title}'s Population - ${formatTime(d.year)} - ${parseN(d.value)} Billion`)
                                .attr('x', x)
                                .attr('y', y)
                                .style('font-size', '1em')
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
                                        .attr('x', this.container.offsetWidth * 0.7 )
                                        .attr('y', this.container.offsetHeight* 0.5 )
                
            circText.data(data)
                .text( `${parseN(d.value)} M`)
                .style('font-size', '20px')
                .style('fill', '#000')
            }
        }) 
    };// aqui cerraste el if

    setupInput() {
        if (this.input)  {
            const input = d3.select(this.container).append('input')
                                .attr('id', 'userInput')
                                .attr('class', 'userInput')
          }
    }

    cleanChart() {
        d3.select(this.svg).remove()
    }

    upyearChart() {
        const userInput = document.getElementById('dropdown').value
        // const label = document.getElementById('label')

        // d3.selectAll('rect').remove()
        // drawChart(userInput.toLowerCase())
        // label.classList.add('showLabel');
    
    }  
}


// drawCircles() {
//     const formatTime = d3.timeFormat("%Y")
//     const parseN = (n) => { return  parseFloat((n / 1000000).toFixed(2))}
//     const svg = this.svg
//     const data = this.data
//     const cirColor = d3.scaleSequential(d3.interpolateRdYlBu).domain([160, 0])
//     const circlesAtt = d3.range(data.length).map(()=> {
//         return {
//             cx: Math.floor((Math.random() * this.width)),
//             cy: Math.floor((Math.random() * this.height)),
//             r: 20
//         }
//     })

//     const circles = svg.append('g')
//                     .attr('class', 'circlesG')


//     data.forEach(d => {    
//     if (this.year == d.year) {
//         const circle = circles.selectAll('circle')
//                         .data(circlesAtt)
//                         .enter()
//                         .append('circle')           
//                             .attr('cx', (d, i) => {
//                                 return (d.cx + (i*i))})
//                             .attr('cy', (d, i) => {
//                                 return (d.cy + (i * 10))})
//                             .style('fill', (d, i) => {return cirColor((d.r + (i * 20)))})
//                             .style('opacity', '0.75');
                        
//             const tooltip = this.genTooltip()
            
//             circle.data(data)
//                     .attr('r', (d) => {
//                     return parseN(d.value) * 5})
//                     .on('mouseover', (e, d) => {
//                         const x = e.offsetX
//                         const y = e.offsetY
//                                 tooltip.append('text')
//                                 .text(`Global population - ${formatTime(d.year)} - ${parseN(d.value)} Billion`)
//                                 .attr('x', x)
//                                 .attr('y', y)
//                                 .style('font-size', '0.5em')
//                                 .attr('fill', 'black')

//                         tooltip.attr('opacity', 1)

//                     })
//                     .on('mouseout', (d) => {
//                         tooltip.text('')
//                         tooltip.attr('opacity', 0)
//                     })
            

//             const circText = circles.selectAll('text')
//                                     .data(circlesAtt)
//                                     .enter()
//                                     .append('text')           
//                                         .attr('x', (d, i) => {return (d.cx - (i / d.cx))})
//                                         .attr('y', (d, i) => {return (d.cy + (i * 10))})
                
//             circText.data(data)
//                 .text((d) => {return `${formatTime(d.year)}: ${parseN(d.value)} B`})
//                 .style('font-size', '10px')
//                 .style('fill', '#d6e0e1')
//     }
//         }) 
// }