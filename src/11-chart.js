import * as d3 from 'd3'
;(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic
  var margin = { top: 20, right: 20, bottom: 20, left: 30 }

  var width = 400 - margin.left - margin.right
  var height = 400 - margin.top - margin.bottom

  var svg = d3
    .select('#chart11')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Build your scales here

  var xPositionScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, width])

  var yPositionScale = d3
    .scalePoint()
    .domain(['cat', 'cow', 'dog'])
    .range([height, 0])
    .padding(0.25)

  d3.csv(require('./eating-data.csv'))
    .then(ready)
    .catch(function(err) {
      console.log('Failed with', err)
    })

  function ready(datapoints) {
    // Add and style your marks here

    svg
      .selectAll('circle')
      .data(datapoints)
      .enter()
      .append('circle')
      .attr('r', 6)
      .attr('cx', function(d) {
        return xPositionScale(d.hamburgers)
      })
      .attr('cy', function(d) {
        return yPositionScale(d.animal)
      })

      .attr('fill', '#F790BC')
      .attr('opacity', 0.8)

    var yAxis = d3.axisLeft(yPositionScale)
    svg
      .append('g')
      .attr('class', 'axis y-axis')
      .call(yAxis)

    var xAxis = d3.axisBottom(xPositionScale)
    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
  }
})()
