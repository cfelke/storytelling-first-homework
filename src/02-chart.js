import * as d3 from 'd3'
;(function() {
  // Here is your data
  var countries = [
    {
      name: 'Blahstia',
      continent: 'North America',
      gdp: 40
    },
    {
      name: 'Bleers',
      continent: 'Europe',
      gdp: 12
    },
    {
      name: 'Blolo',
      continent: 'Antarctica',
      gdp: 35
    },
    {
      name: 'Blurben',
      continent: 'North America',
      gdp: 90
    }
  ]

  // Get the svg with the id of 'chart2'
  var svg = d3
    .select('#chart2')
    .attr('width', 400)
    .attr('height', 200)

  var widthScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, 400])

  var colorScale = d3
    .scaleOrdinal()
    .range(['#99d8c9', '#fec44f', '#2ca25f', '#addd8e'])

  // Get the rectangles inside of it
  svg
    .selectAll('rect')
    .data(countries)
    .attr('height', 50)
    .attr('width', d => {
      return widthScale(d.gdp)
    })
    .attr('fill', d => {
      return colorScale(d.continent)
    })
})()
