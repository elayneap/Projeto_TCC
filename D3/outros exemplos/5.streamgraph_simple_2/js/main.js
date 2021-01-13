/*
*    código adaptado de dentro do index.html para o main.js
*/

	console.clear();
	
	var margin = {top: 20, right: 100, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right, 
        height = 400 - margin.top - margin.bottom;

	var svg = d3.select("body").append("svg")
		.attr("width", 960)
		.attr("height", 500)
		
	//criação da legenda
	var movieColor = d3.scaleOrdinal(d3.schemeCategory10);

	var movies = ["titanic", "avatar", "akira", "frozen", "deliverance","avengers"];

	var legend = svg.append("g")
		.attr("transform", "translate(" + (width + 130) + "," + (height - 125) + ")");

	movies.forEach(function(feature, i){
	var legendRow = legend.append("g")
		.attr("transform", "translate(0, " + (i * 20) + ")");

	legendRow.append("rect")
		.attr("width", 10)
		.attr("height", 10)
		//.attr('fill-opacity', 0.5)
		.attr("fill", movieColor(feature));

	legendRow.append("text")
		.attr("x", -10)
		.attr("y", 10)
		.attr("text-anchor", "end")
		.style("text-transform", "capitalize")
		.text(feature);
	});

	d3.csv("data/movies.csv",dataViz)

	function dataViz(data) {
		var xScale = d3.scaleLinear()
			.domain([0,10])
			.range([0,500])

		var yScale = d3.scaleLinear()
			.domain([0,60])
			.range([480,0])

		var heightScale = d3.scaleLinear()
			.domain([0,60])
			.range([0,480])

		//var movies = ["titanic", "avatar", "akira", "frozen", "deliverance","avengers"];

		/* escala de cor descontinuada
		var fillScale = d3.scaleOrdinal()
			.domain(movies)
			.range(["#fcd88a", "#cf7c1c", "#93c464", "#75734F", "#5eafc6","#41a368"]); */
			
		var fillScale = d3.scaleOrdinal(d3.schemeCategory10);

		var stackLayout = d3.stack()
			.keys(movies)

		var stackArea = d3.area()
			.x((d,i)=>xScale(i))
			.y0(d=>yScale(d[0]))
			.y1(d=>yScale(d[1]))

		stackLayout.offset(d3.stackOffsetSilhouette)
			.order(d3.stackOrderInsideOut)
		
		stackArea.curve(d3.curveBasis)
		
		yScale.domain([-50,50])

		svg.selectAll("path")
			.data(stackLayout(data))
			.enter()
			.append("path")
			.style("fill",d=>fillScale(d.key))
			.attr("d",d=>stackArea(d))
	}