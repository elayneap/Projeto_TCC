/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

d3.json("data/buildings.json").then(function(data){
	
	data.forEach(function(d){
		d.height = +d.height;
	})
	
console.log(data);

var svg = d3.select("#chart-area").append("svg")
	.attr("width",500)
	.attr("height",500);
	
var rects = svg.selectAll("rect")
	.data(data);
	
	rects.enter()
		.append("rect")
			.attr("x",function(d,i){
				return (i * 60)
			})
			.attr("y",25)
			.attr("width",40)
			.attr("height",function(d){
				return d.height
			})
			.attr("fill",function(d){
				return "grey"
			})
			
}).catch(function(error){
	console.log(error);
})