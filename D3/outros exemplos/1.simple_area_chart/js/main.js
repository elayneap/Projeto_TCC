/*
  Alteração da visualização 7.04 para mostrar apenas uma audio feature de musicas
*/

    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .rangeRound([0, width]);
		
	var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var area = d3.area()
        .x(function(d) { return x(d.track); })
        .y0(y(0))
        .y1(function(d) { return y(d.danceability); });

    d3.csv("data/teste.csv", function(error, data) {
		
		data.forEach(function(d) {
            d.track = +d.track;
			d.danceability = +d.danceability;
        });

        x.domain(d3.extent(data, function(d) { return d.track; }));
        y.domain([0,1]); //y.domain([0, d3.max(data, function(d) { return d.danceability; })]);

        g.append("path")
            .attr("fill", "steelblue")
            .attr("d", area(data));

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
    });
