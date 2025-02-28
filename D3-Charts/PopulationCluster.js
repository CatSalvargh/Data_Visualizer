
export default class Cluster {

    constructor() {
        this.container = document.querySelector('#cluster')
        this.height = this.container.clientHeight * 1.85
        this.width = this.height;
        this.margin = 1

        this.drawCanvas();
              
    }

    drawCanvas() {
        const contain = d3.select(this.container)
        const color = d3.scaleLinear().domain([0, 50])
                        .range(["hsl(76, 75.50%, 80.80%)", "hsl(232, 31.1%, 33%)"])
                        .interpolate(d3.interpolateHcl);
        let barColor = d3.scaleSequential(d3.interpolateRdYlBu).domain([200, 0])

        const self = this;
      
        d3.json('./data/world-population/ContinentClusters.json')
            .then(function(data) { 
                    const pack =  d3.pack()
                            .size([self.width - self.margin * 2, self.height - self.margin * 2])
                                .padding(3)

                    const root = pack((d3.hierarchy(data)
                        .sum(d => d.value)
                        .sort((a, b) => b.value - a.value)
                    ));

                    const svg = contain.append("svg")
                            .attr("viewBox", `-${self.width / 2} -${self.height / 2} ${self.width} ${self.height}`)
                            .attr("id", "clusterSVG")
                            .attr("width", self.width)
                            .attr("height", self.height)
                            .attr("style", `max-width: 100%; height: auto; display: block; margin: 0 -14px; background: ${color(50)}; cursor: pointer;`)
                            .attr("text-anchor", "middle");

                // Append the nodes.
                const node = svg.append("g")
                .selectAll("circle")
                .data(root.descendants().slice(1))
                .join("circle")
                    .attr("fill", d => d.children ? color(35) : barColor(d.value/1000000))
                    .attr("pointer-es", d => !d.children ? "none" : null)
                    .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
                    .on("mouseout", function() { d3.select(this).attr("stroke", null); })
                    .on("click", (e, d) => focus !== d && (zoom(e, d), e.stopPropagation()));
            
                const nFormat = new Intl.NumberFormat(undefined);
      
                // Append the text labels.
                const label = svg.append("g")
                    .style("font", "9px sans-serif")
                    .attr("pointer-es", "none")
                    .attr("text-anchor", "middle")
                    .selectAll("text")
                    .data(root.descendants())
                    .join("text")
                        .style("fill-opacity", d => d.parent === root ? 1 : 0)
                        .style("display", d => d.parent === root ? "inline" : "none")
                        .style("font-size", "1rem")
                        .text(d => d.parent === root ? d.data.name : d.data.value ? ` ${d.data.name}:   ${nFormat.format(d.data.value)}` : d.data.name )
                        
                // Create the zoom behavior and initiate it to the initial focus node.
                svg.on("click", (e) => zoom(e, root));
                let focus = root;
                let view;
                zoomTo([focus.x, focus.y, focus.r * 2]);
            
                function zoomTo(v) {
                const k = self.width / v[2];
            
                view = v;
            
                label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
                node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
                node.attr("r", d => d.r * k);
                }
            
                function zoom(e, d) {
            
                focus = d;
            
                const transition = svg.transition()
                    .duration(e.altKey ? 7500 : 750)
                    .tween("zoom", d => {
                        const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
                        return t => zoomTo(i(t));
                    });
            
                label
                    .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
                    .transition(transition)
                    .style("fill-opacity", d => d.parent === focus ? 1 : 1)
                    .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
                    .on("end", function(d) { if (d.parent !== focus) this.style.display = "none" });
            
                }
                return svg.node();
        })
    }
}
