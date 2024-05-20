<script setup lang='ts'>
import * as d3 from 'd3'

onMounted(() => {
  // Sample data
  const data = [
    { x: 0, y: 20 },
    { x: 1, y: 30 },
    { x: 2, y: 40 },
    { x: 3, y: 35 },
    { x: 4, y: 50 },
    { x: 5, y: 45 },
  ]

  // Set up the SVG
  const svg = d3.select('svg')
  const width = +svg.attr('width')
  const height = +svg.attr('height')

  // Define the scales and axes
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.x)])
    .range([0, width])

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.y)])
    .range([height, 10])

  const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))

  // Draw the line
  svg.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('d', line)
})
</script>

<template>
  <BaseContainer>
    <svg width="1000" height="500" />
  </BaseContainer>
</template>

<style>
.line {
  fill: none;
  stroke: black;
  stroke-width: 4px;
}
</style>
