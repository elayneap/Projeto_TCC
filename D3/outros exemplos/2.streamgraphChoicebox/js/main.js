/*
*    código adaptado de dentro do index.html para o main.js
*/
	var fileName = "data/data_example.csv";
	
	//definição das features que serão utilizadas
	var features = ["speechiness","instrumentalness","liveness","acousticness","danceability","energy","valence"];
	
	var featuresFields = ["speechiness","instrumentalness","liveness","acousticness","danceability","energy","valence"];
	
	var arquivo;
			
	//função de leitura do arquivo
	d3.csv(fileName, function viz(data) {
		var trackarray = [];
		var arquivo = [];
		var arrayMusica = [];
		var arrayDanceability = [];
		var arrayEnergy = [];
		var arraySpeechiness = [];
		var arrayAcousticness = [];
		var arrayInstrumentalness = [];
		var arrayLiveness = [];
		var arrayValence = [];
	
		var playlistMap = {};
		
		//conversão dos valores lidos do arquivo
		data.forEach(function(d) {
			d.track = +d.track
			d.danceability = +d.danceability //* 20
			d.energy = +d.energy //* 20
			d.speechiness = +d.speechiness //* 20
			d.acousticness = +d.acousticness //* 20
			d.instrumentalness = +d.instrumentalness //* 20
			d.liveness = +d.liveness //* 20
			d.valence = +d.valence //* 20
			
			var playlist = d.playlist;
            playlistMap[playlist] = [];
			
			featuresFields.forEach(function(field){
				playlistMap[playlist].push((+d[field])/*/20*/);
            });
		});

		arquivo = data;
		
		for (var i = 0; i < arquivo.length ; i++) {
			arrayMusica[i] = arquivo[i].name;
			arrayDanceability[i] = (arquivo[i].danceability)/20;
			arrayEnergy[i] = (arquivo[i].energy)/20;
			arraySpeechiness[i] = (arquivo[i].speechiness)/20;
			arrayAcousticness[i] = (arquivo[i].acousticness)/20;
			arrayInstrumentalness[i] = (arquivo[i].instrumentalness)/20;
			arrayLiveness[i] = (arquivo[i].liveness)/20;
			arrayValence[i] = (arquivo[i].valence)/20;
		}
		
		tamanho =  arquivo.length;
		
		makeVis(playlistMap);
		
		console.log(data);
		console.log(playlistMap);
	});
	
	var makeVis = function(playlistMap) {
		
		//console.log(data);
		
		//console.log(playlistMap);
		
		//definição da margem
		var margin = {top: 20, right: 40, bottom: 30, left: 30},
		width = 1200 - margin.left - margin.right, //800
		height = 400 - margin.top - margin.bottom; //400
		
		//definição do SVG
		var svg = d3.select("body").append("svg")
			.attr("width", 1350) //960
			.attr("height", 600)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
		//criação da legenda
		var featureColor = d3.scaleOrdinal()
			.range (["#FF00FF","#8A2BE2","#0000FF","#32CD32","#FFFF00","#FFA500","#FF0000"]);

		//definição da legenda
		var legend = svg.append("g")
			.attr("transform", "translate(" + (width + 130) + "," + (height - 240) + ")");

		features.forEach(function(feature, i){
			var legendRow = legend.append("g")
				.attr("transform", "translate(0, " + (i * 20) + ")");

			legendRow.append("rect")
				.attr("width", 10)
				.attr("height", 10)
				.attr("fill", featureColor(feature));

			legendRow.append("text")
				.attr("x", -10)
				.attr("y", 10)
				.attr("text-anchor", "end")
				.attr("fill", "white")
				.style("text-transform", "capitalize")
				.text(feature);
		});
		
		//definição das escalas
		var xScale = d3.scaleLinear()
			.domain([0,tamanho]) //26
			.range([0, width]);

		var yScale = d3.scaleLinear()
			.domain([0,10])
			.range([height,0]);

		var heightScale = d3.scaleLinear()
			.domain([0,10])
			.range([0,height]);
			
		var fillScale = d3.scaleOrdinal()
			.range (["#FF00FF","#8A2BE2","#0000FF","#32CD32","#FFFF00","#FFA500","#FF0000"]);
			
		//var updateStream;

		function updateStream(data) {
			//console.log(data);
			
			//definição das funções do stackarea
			var stackLayout = d3.stack()
				.keys(features)
				
			yScale.domain([-50,50])
			//yScale.domain( d3.extent(data) );

			var stackArea = d3.area()
				.x((d,i)=>xScale(i))
				.y0(d=>yScale(d[0]))
				.y1(d=>yScale(d[1]))
				.curve(d3.curveCardinal)

			stackLayout.offset(d3.stackOffsetSilhouette)
			
		
			//Exibição do stackedarea no SVG
			svg.selectAll("path")
				.data(stackLayout(data))
				.enter()
				.append("path")
				.style("fill",d=>fillScale(d.key))
				.attr("d",d=>stackArea(d))
				
				
			/*// Tooltip
			var focus = svg.append("g")
				.attr("class", "remove")
				.style("display", "none");

			focus.append("circle")
				.attr("fill", "white")
				.attr("r", 3);

			focus.append("text")
				.attr("x", 9)
				.attr("dy", ".35em")
				.attr("fill", "white")
				.style("font-size",12);
				
			var focus2 = svg.append("g")
				.attr("class", "focus")
				.style("display", "none");

			focus2.append("circle")
				.attr("fill", "white")
				.attr("r",3);

			focus2.append("text")
				.attr("x", 9)
				.attr("dy", ".35em")
				.attr("fill", "white")
				.style("font-size",12);
				
			var focus3 = svg.append("g")
				.attr("class", "focus")
				.style("display", "none");

			focus3.append("circle")
				.attr("fill", "white")
				.attr("r", 3);

			focus3.append("text")
				.attr("x", 9)
				.attr("dy", ".35em")
				.attr("fill", "white")
				.style("font-size",12);

			var focus4 = svg.append("g")
				.attr("class", "focus")
				.style("display", "none");

			focus4.append("circle")
				.attr("fill", "white")
				.attr("r", 3);

			focus4.append("text")
				.attr("x", 9)
				.attr("dy", ".5em")
				.attr("fill", "white")
				.style("font-size",12);
			
			var focus5 = svg.append("g")
				.attr("class", "focus")
				.style("display", "none");

			focus5.append("circle")
				.attr("fill", "white")
				.attr("r", 3);

			focus5.append("text")
				.attr("x", 9)
				.attr("dy", ".5em")
				.attr("fill", "white")
				.style("font-size",12);
				
			var focus6 = svg.append("g")
				.attr("class", "focus")
				.style("display", "none");

			focus6.append("circle")
				.attr("fill", "white")
				.attr("r", 3);

			focus6.append("text")
				.attr("x", 9)
				.attr("dy", ".5em")
				.attr("fill", "white")
				.style("font-size",12);
				
			var focus7 = svg.append("g")
				.attr("class", "focus")
				.style("display", "none");

			focus7.append("circle")
				.attr("fill", "white")
				.attr("r", 3);

			focus7.append("text")
				.attr("x", 9)
				.attr("dy", ".5em")
				.attr("fill", "white")
				.style("font-size",15);
				
			var focus8 = svg.append("g")
				.attr("class", "focus")
				.style("display", "none");

			focus8.append("circle")
				.attr("fill", "white")
				.attr("r", 3);

			focus8.append("text")
				.attr("x", 9)
				.attr("dy", ".5em")
				.attr("fill", "white")
				.style("font-size",12);*/
			/*
			//função para colocar o foco na feature ao passar no mouse
			svg.selectAll("path")
				.attr("opacity", 1)
				.on("mouseover", function(d, i) {
					svg.selectAll("path").transition()
						.duration(250)
						.attr("opacity", function(d, j) {
							return j != i ? 0.6 : 1;
						})
					focus.style("display", null);
					focus2.style("display", null);
					focus3.style("display", null);
					focus4.style("display", null);
					focus5.style("display", null);
					focus6.style("display", null);
					focus7.style("display", null);
					focus8.style("display", null);
				})
				.on("mouseout", function() {
					focus.style("display", "none");
					focus2.style("display", "none");
					focus3.style("display", "none");
					focus4.style("display", "none");
					focus5.style("display", "none");
					focus6.style("display", "none");
					focus7.style("display", "none");
					focus8.style("display", "none");
				})
				.on("mousemove", mousemove);

			function mousemove() {
				var x0 = xScale.invert(d3.mouse(this)[0]);
					x0 = parseInt(x0);
					pro = (arrayMusica[x0]);
					pro1 = (arrayDanceability[x0]);
					pro2 = (arrayEnergy[x0]);
					pro3 = (arraySpeechiness[x0]);
					pro4 = (arrayAcousticness[x0]);
					pro5 = (arrayInstrumentalness[x0]);
					pro6 = (arrayLiveness[x0]);
					pro7 = (arrayValence[x0]);
					
					focus.attr("transform", "translate(" + xScale(x0) + "," + (393 - margin.top - margin.bottom)+ ")");
					focus2.attr("transform", "translate(" + xScale(x0) + "," + (413 - margin.top - margin.bottom)+ ")");
					focus3.attr("transform", "translate(" + xScale(x0) + "," + (433 - margin.top - margin.bottom)+ ")");
					focus4.attr("transform", "translate(" + xScale(x0) + "," + (453 - margin.top - margin.bottom)+ ")");
					focus5.attr("transform", "translate(" + xScale(x0) + "," + (473 - margin.top - margin.bottom)+ ")");
					focus6.attr("transform", "translate(" + xScale(x0) + "," + (493 - margin.top - margin.bottom)+ ")");
					focus7.attr("transform", "translate(" + xScale(x0) + "," + (370 - margin.top - margin.bottom)+ ")");
					focus8.attr("transform", "translate(" + xScale(x0) + "," + (513 - margin.top - margin.bottom)+ ")");
					focus.select("text").text("Danceability:" + pro1.toFixed(3));
					focus2.select("text").text("Energy:" + pro2.toFixed(3));
					focus3.select("text").text("Speechiness:" + pro3.toFixed(3));
					focus4.select("text").text("Acousticness:" + pro4.toFixed(3));
					focus5.select("text").text("Instrumentalness:" + pro5.toFixed(3));
					focus6.select("text").text("Liveness:" + pro6.toFixed(3));
					focus7.select("text").text("Música:" + pro);
					focus8.select("text").text("Valence:" + pro7.toFixed(3));
			}
			
			var vertical = d3.select(".chart")
					.append("div")	
					.attr("class", "remove")
					.style("position", "absolute")
					.style("z-index", "19")
					.style("width", "1px")
					.style("height", "380px")
					.style("top", "10px")
					.style("bottom", "30px")
					.style("left", "0px")
					.style("background", "#fff");
			
			d3.select("body")
				  .on("mousemove", function(){  
					 mousex = d3.mouse(this);
					 mousex = mousex[0] + 5;
					 vertical.style("left", mousex + "px" )})
				  .on("mouseover", function(){  
					 mousex = d3.mouse(this);
					 mousex = mousex[0] + 5;
					 vertical.style("left", mousex + "px")});*/
		}
				 
		//Manipulador para mudança de valores no choicebox
		var dropdownChange = function() {
			var newPlaylist = d3.select(this).property('value'),
				newData = playlistMap[newPlaylist];

			updateStream(newData);
		};

		//Pegar os nomes das playlists para o choicebox
		var lists = Object.keys(playlistMap).sort();

		var dropdown = d3.select("#vis-container")
			.insert("select", "svg")
			.on("change", dropdownChange);

		dropdown.selectAll("option")
			.data(lists)
		  .enter().append("option")
			.attr("value", function (d) { return d; })
			.text(function (d) {
				return d[0].toUpperCase() + d.slice(1,d.length); //primeira letra maiuscula
			});

		var initialData = playlistMap[lists[0]];
		//console.log(initialData);
		updateStream(initialData);
		
	}