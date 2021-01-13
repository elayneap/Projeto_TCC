/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

//DECLARAÇÃO DA MARGEM
var margin = { left:100, right:10, top:10, bottom:150 };

var width = 600 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

//DEFINIÇÃO DO SVG E DO GRUPO DOS OBJETOS DO SVG	
var g = d3.select("#chart-area")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

//ROTULOS PARA O GRÁFICO
g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Month");

g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue");
	
/* CONSTRUÇÃO DA VISUALIZAÇÃO ****************************************/

//LEITURA DOS DADOS DO ARQUIVO
d3.json("data/revenues.json").then(function(data){
	
	//CONVERSAO DO NUMERO DE VENDAS PARA INTEIRO
	data.forEach(function(d){
		d.revenue = +d.revenue;
	});
	
	//DEFINIÇÃO DAS ESCALAS PARA O EIXO X E Y
	var x = d3.scaleBand()
		.domain(data.map(function(d){ return d.month }))
		.range([0, width])
		.paddingInner(0.2)
        .paddingOuter(0.5);
	
	var y = d3.scaleLinear()
		.domain([0, d3.max(data, function(d){ return d.revenue })])
		.range([height, 0]); //inverter para realizar teste
	
	//CONSTRUÇÃO DOS EIXOS X E Y DO GRÁFICO
	var xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height +")")
        .call(xAxisCall);
		
	var yAxisCall = d3.axisLeft(y)
        .tickFormat(function(d){ return "$" + d; });
    g.append("g")
        .attr("class", "y axis")
        .call(yAxisCall);
	
	//DESENHO DE TODOS OS RETÂNGULOS DA TELA
	var rects = g.selectAll("rect")
		.data(data)
		
	rects.enter()
		.append("rect")
			.attr("x", function(d){ return x(d.month);})
			.attr("y", function(d){ return y(d.revenue) })
			.attr("width", x.bandwidth)
			.attr("height", function(d){ return height - y(d.revenue); })
			.attr("fill","grey")
	
})