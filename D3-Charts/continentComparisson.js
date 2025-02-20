// comparissonBars()
// comparissonBars2('global')

function comparissonBars1() {
    const arr = [
        {date: new Date('1950'), value: 1, domain: 20},
        {date: new Date('1960'), value: 2},
        {date: new Date('1970'),  value: 3.1},
        {date: new Date('1980'), value: 4.5 },
        {date: new Date('1990'), value: 5},
        {date: new Date('2000'), value: 8},
        {date: new Date('2010'), value: 15}
    ]
    const container = document.querySelector('#continentComparisson')
    const title = 'Global Population';
    const chart = new ChartD3(arr, container, title)

    chart.draw();
    chart.generateAxis();
    chart.drawBars();
    chart.drawCircles();
}

let values = []

export function retrieveData(entity, data) { 
    
        const parseTime = d3.timeParse("%Y")
        const formatTime = d3.timeFormat("%Y")
        const parseN = (n) => { return  parseFloat((n / 1000000000).toFixed(2))}

        let entityData;

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

            values.push({date: new Date(formatTime(d.year)), value: entityData, domain: d.global}) 
        })
        return values;
    }

export function barData(entity) {
//     const url = './data/world-population/population-historic-global-continents-table.csv'
//     const container = document.querySelector('#label')
//     const title = 'Global Population data';
//     let values = []

//     d3.csv(url)
//     .then(function (data) {
//         const parseTime = d3.timeParse("%Y")
//         const formatTime = d3.timeFormat("%Y")
//         const parseN = (n) => { return  parseFloat((n / 1000000000).toFixed(2))}

//         let entityData;
   
//         data.forEach(d => {
//             d.year = parseTime(d.year);
//             d.africa = parseN(d.africa)
//             d.americas = parseN(d.americas)
//             d.asia = parseN(d.asia)
//             d.europe = parseN(d.europe)
//             d.oceania = parseN(d.oceania)
//             d.global = parseN(d.global)

//             if (entity == 'global') {
//                     entityData = d.global
//             } else if (entity == 'africa') {
//                 entityData = d.africa
//             } else if (entity == 'americas') {
//                 entityData = d.americas
//             } else if (entity == 'asia') {
//                 entityData = d.asia
//             } else if (entity == 'europe') {
//                 entityData = d.europe
//             } else if (entity == 'oceania') {
//                 entityData = d.oceania
//             } 

//             const obj = {date: new Date(formatTime(d.year)), value: entityData, domain: d.global}
//             values.push(obj)
//             return values;
//             // values.push({date: new Date(formatTime(d.year)), value: entityData, domain: d.global}) 
//         })

//     })

//     console.log(values)
//     return values
}

