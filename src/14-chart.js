import * as d3 from 'd3'
;(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic
  var margin = { top: 30, right: 30, bottom: 60, left: 80 }

  var width = 700 - margin.left - margin.right
  var height = 500 - margin.top - margin.bottom

  // You'll probably need to edit this one
  var svg = d3
    .select('#chart14')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Build your scales here
  var heightScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, height])

  var xPositionScale = d3.scaleBand().range([0, width])

  var colorScale = d3
    .scaleOrdinal()
    .domain(['cat', 'dog', 'cow'])
    .range(['#fec44f', '#99d8c9', '#2ca25f'])

  d3.csv(require('./eating-data.csv'))
    .then(ready)
    .catch(function(err) {
      console.log('Failed with', err)
    })

  function ready(datapoints) {
    var names = datapoints.map(function(d) {
      return d.name
    })

    xPositionScale.domain(names)
    // Add and style your marks here

    svg
      .selectAll('rect')
      .data(datapoints)
      .enter()
      .append('rect')
      .attr('width', xPositionScale.bandwidth())
      .attr('height', d => {
        return heightScale(d.hamburgers)
      })
      .attr('fill', d => {
        return colorScale(d.animal)
      })
      .attr('y', d => {
        return height - heightScale(d.hamburgers)
      })
      .attr('x', d => {
        return xPositionScale(d.name)
      })

    var yAxis = d3.axisLeft(heightScale)
    svg
      .append('g')
      .attr('class', 'axis y-axis')
      .call(yAxis)

    var xAxis = d3.axisBottom(xPositionScale).ticks(10)
    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
  }
})()
