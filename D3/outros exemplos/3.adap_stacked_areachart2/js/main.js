/*
*    código adaptado de dentro do index.html para o main.js
*/

	function get_colors(n) {
	var colors = ["#a6cee3","#1f78b4","#b2df8a","#33a02c",
	"#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6",
	"#6a3d9a"];

	return colors[ n % colors.length];} 
	  
	var margin = {top: 61, right: 140, bottom: 101, left: 50},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var x = d3.scaleLinear()
		.range([0, width]);

	var y = d3.scaleLinear()
		.range([height, 0]);

	var color = d3.scaleOrdinal(d3.schemeCategory10);

	var xAxis = d3.axisBottom()
		.scale(x)
		//.ticks(24, "s");

	var yAxis = d3.axisLeft()
		.scale(y)
		//.ticks(5, "s");
		
	var stack = d3.stack()
		//.values(function(d) { return d.values; });

	var area = d3.area()
		.x(function(d) { return x(d.track); })
		.y0(function(d) { return y(d.y0); })
		.y1(function(d) { return y(d.y0 + d.y); }); 
  
	var svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  
	d3.csv("data/data_example.csv", function(error, data) {
   
    color.domain(d3.keys(data[0]).filter(function(key) {return key !== "track"; }));
 
    data.forEach(function(d){  
		d.track = +d.track;
		d.danceability = +d.danceability;
		d.energy = +d.energy;
		d.speechiness = +d.speechiness;
		d.acousticness = +d.acousticness;
		d.instrumentalness = +d.instrumentalness;
		d.liveness = +d.liveness
    });
	
	console.log(data);
      
	var browsers = stack(color.domain().map(function(name) {
		return {
			name: name,
			values: data.map(function(d) {
        return {track: d.track, y: d[name] * 1};
		})
		};
	}));		

//Find the value of the track with highest total value
	var maxtrackVal = d3.max(data, function(d){
	var vals = d3.keys(d).map(
		function(key){ 
			return key !== "track" ? d[key] : 0 });
    return d3.sum(vals);
	});

//Set domains for axes
	x.domain(d3.extent(data, function(d) { return d.track; }));
	y.domain([0, 800])

	var browser = svg.selectAll(".browser")
		.data(browsers)
    	.enter().append("g")
		.attr("class", "browser");

	browser.append("path")
		.attr("class", "area")
		.attr("d", function(d) { return area(); })		//.attr("d", function(d) { return area(d.values); })
		.style("fill", function(d,i) { 
			return get_colors(i); });

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis).append("text")
		.attr("x", 350)
		.attr("y", 36)
		.attr("fill", "#000")
		.text("Músicas da playlist")
		.style("font-weight", "bold");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("x", -250)
		.attr("y", -40)
		.attr("dy", "0.3408em")
		.attr("fill", "#000")
		.text("Valores das audio features")
		.style("font-weight", "bold");
      
	var legend = svg.selectAll(".legend")
		.data(color.domain()).enter()
		.append("g")
		.attr("class","legend")
		.attr("transform", "translate(" + (width +20) + "," + 0+ ")");

	legend.append("rect")
		.attr("x", 0) 
		.attr("y", function(d, i) { return 20 * i; })
		.attr("width", 10)
		.attr("height", 10)
		.style("fill", function(d, i) {
			return get_colors(i);}); 
   
    legend.append("text")
		 .attr("x", 20) 
		 .attr("dy", "0.75em")
		 .attr("y", function(d, i) { return 20 * i; })
		 .text(function(d) {return d});
      
	legend.append("text")
		 .attr("x",0) 
		//.attr("dy", "0.75em")
		 .attr("y",-10)
		 .text("Audio features");	

});