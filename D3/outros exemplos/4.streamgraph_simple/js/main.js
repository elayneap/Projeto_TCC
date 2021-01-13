/*
*    código adaptado de dentro do index.html para o main.js
*/

	console.clear();
    // Feel free to change or delete any of the code you see in this editor!
    var svg = d3.select("body").append("svg")
      .attr("width", 960)
      .attr("height", 500)
    
    d3.csv("data/movies.csv",dataViz)
    
    function dataViz(data) {
      const xScale = d3.scaleLinear()
      	.domain([0,10])
      	.range([0,500])
      
      const yScale = d3.scaleLinear()
      	.domain([0,60])
      	.range([480,0])
      
      const heightScale = d3.scaleLinear()
      	.domain([0,60])
      	.range([0,480])
      
      const movies = ["titanic", "avatar", "akira", "frozen", "deliverance","avengers"];
      
      const fillScale = d3.scaleOrdinal()
      	.domain(movies)
      	.range(["#fcd88a", "#cf7c1c", "#93c464", "#75734F", "#5eafc6","#41a368"]);
      
      const stackLayout = d3.stack()
      	.keys(movies)
      
      const stackArea = d3.area()
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
