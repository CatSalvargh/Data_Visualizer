Data visualization App combining D3 and P5

Structure

* index.html
* svg-Map.js - (located in supporting files). This is the main visualization of the page, an interactive map that displays population and country data.
                  It also handles events such as hovering over or clicking the map's paths

==== D3 =======

* script.js -> type module
  * D3-Chart-Constructor.js  --> This is a class for a D3 bar chart displaying historic population counts which is drawn on the main visualization once the SVG Map is visible and the user hovers over the countries.

   * D3-Country-Label-Construcor.ks --> This class generates the country information label on the right-hand side of the map

   * PopulationCluster --> This class generates the second main visualization zoomable cluster based on D3's "zoomable-circle-packing" example

   * D3-Circle=Animated-Constructor --> This class generates the bottom-right-hand side animation which does a continent size comparisson


==== P5 =======

* sketch.js -> type module
   * gallery.js --> The main functions of this class are creating the navigation menu buttons according to the number of visualizations available, storing the visualization details and handling the selection and drawing of each visualization upon click of those buttons
    
   * Tech Diversity Race --> Pie chart type of visualization. It is the default visualization if no other one is selected

   * All other files in the p5-sketch folder, each handles a different type of visualization created with the p5 library

==== support-files =====

This folder contains supporting functions used through the p5 visualizations, as well as a D3-Get-Data function, whcih fetches data form an external API to be passed onto the svg-Map visualization. 

=== Credits
SVG Map source: https://mapsvg.com/maps/world
Country API Data (JSON file for the D3-Animated-Constructor):  https://www.freepublicapis.com/countries-and-cities
Resource for understanding D3 and ES6 Modules integration: https://gist.github.com/ejb/79698ac221dbcff637b1930a387a9416
