/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

var svg = d3.select("#chart-area").append("svg")
	.attr("width",500)
	.attr("height",400);
	
var line = svg.append("line")
	.attr("x1",10)
	.attr("y1",10)
	.attr("x2",10)
	.attr("y2",90)
	.attr("stroke","pink")
	.attr("stroke-width","3");
	
var rect = svg.append("rect")
	.attr("x",50)
	.attr("y",10)
	.attr("width",80)
	.attr("height",80)
	.attr("fill","orange");
	
var ellipse = svg.append("ellipse")
	.attr("cx",180)
	.attr("cy",50)
	.attr("rx",30)
	.attr("ry",40)
	.attr("fill","yellow");

var circle = svg.append("circle")
	.attr("cx", 200)
	.attr("cy", 200)
	.attr("r", 70)
	.attr("fill", "red");