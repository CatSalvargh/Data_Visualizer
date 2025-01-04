// let data;

// function preload () {
//     var self = this;
//     data = loadTable(
//       './data/world-population/population-historic-global-continents-table.csv', 'csv', 'header',
//       function(table) {
//         self.loaded = true;
//       });
//   };

//   function setup () {
//     const table = data.getColumn('year');
//     const year = []
//     const africa = []
//     const americas = []
//     const asia = []
//     const europe = []
//     const oceania = []
//     const global = []
//     const contData = ['africa', 'americas', 'asia', 'europa', 'oceania', 'global']
//     // const year = data.findRow('1950', 'year')
//     // // const africa = year.getNum('africa')

//     for (let i = 0; i < data.getRowCount() ; i++){
//         const yearTemp = data.findRow(table[i], 'year')
//         year.push(yearTemp.getNum('year'))
//         africa.push(yearTemp.getNum('africaPerc'))
//         americas.push(yearTemp.getNum('americasPerc'))
//         asia.push(yearTemp.getNum('asiaPerc'))
//         europe.push(yearTemp.getNum('europePerc'))
//         oceania.push(yearTemp.getNum('oceaniaPerc'))
//         global.push(yearTemp.getNum('globalPerc'))
//     }

//     console.log (global[0]*100)
//     const afr = select('.africa')
//     afr.style("height", (africa[0]*100)+'%')

//     const amer = select('.americas')
//     amer.style("height", (americas[0]*100)+'%')

//     const asi = select('.asia')
//     asi.style("height", (asia[0]*100)+'%')

//     const eur = select('.europe')
//     eur.style("height", (europe[0]*100)+'%')

//     const oce = select('.oceania')
//     oce.style("height", (oceania[0]*100)+'%')

//     const gbl = select('.global')
//     gbl.style("height", (global[0]*100)+'%')
   
//   }

// // $(document).ready(function() {
// //     // $('.percentage').counterUp({
// //     //     time:800
// //     // });

// //     $('.africa').css("height", `${africa[0]}%`);
// //     $('.africa').text(`${africa[0]}%`);
// // });
