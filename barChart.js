let data;

function preload () {
    var self = this;
    data = loadTable(
      './data/world-population/population-historic-global-continents-table.csv', 'csv', 'header',
      function(table) {
        self.loaded = true;
      });
  };

  function setup () {
    const table = data.getColumn('year');
    const year = []
    const africa = []
    const americas = []
    // const year = data.findRow('1950', 'year')
    // // const africa = year.getNum('africa')

    for (let i = 0; i < data.getRowCount() ; i++){
        const yearTemp = data.findRow(table[i], 'year')
        year.push(yearTemp.getNum('year'))
        africa.push(yearTemp.getNum('asiaPerc'))
        americas.push(yearTemp.getNum('americasPerc'))
    }

    console.log(africa[0]*100)

    let afr = select('.africa')
    afr.style("height", (africa[0]*100)+'%')
   
  }

// $(document).ready(function() {
//     // $('.percentage').counterUp({
//     //     time:800
//     // });

//     $('.africa').css("height", `${africa[0]}%`);
//     $('.africa').text(`${africa[0]}%`);
// });
