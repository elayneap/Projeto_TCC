/*
*    código adaptado de dentro do index.html para o main.js
*/
	var path1 = 'data/';
	var path2 = '.csv';
	
	var dropdownChange = function() {
		svg.selectAll("*").remove();
		document.getElementById("tabela").innerHTML="";
		document.getElementById("titulo").innerHTML="";
		
		var newPlaylist = d3.select(this).property('value'),
		playlistSelecionada = newPlaylist;
		
		if (playlistSelecionada == "Classical Guitar 50: Spotify Picks"){
			playlistSelecionada = "Classical Guitar 50 Spotify Picks";
		}
		
		var caminhoArquivo = path1 + playlistSelecionada + path2;
		
		fileName = caminhoArquivo;
		
		makeVis(fileName);
		subtitle();
		titulo(playlistSelecionada);
	};
	
	var titulo = function(tituloPlaylist) {
		console.log(tituloPlaylist);
		
		var nomePlaylist = d3.select("#titulo")
				.append("text")
				.attr("style", "font-size: 25px")
				.text(tituloPlaylist);

	}
	

	//Pegar os nomes das playlists para o choicebox
	var lists = [];
	lists[0] = "...Escolha a categoria e a playlist...";
	lists[1] = "Africana - African Heat"
	lists[2] = "Country - Hot Country"
	lists[3] = "Country Rock - This Is Tom Petty"
	lists[4] = "Dance & Eletronica - Eletro"
	lists[5] = "Dance & Eletronica - Martin Garrix Live On Tomorrowland 2020"
	lists[6] = "Dance & Eletronica - mint"
	lists[7] = "Dance & Eletronica - TUTZ TUTZ"
	lists[8] = "Dancehall - Dancehall Official"
	lists[9] = "Dancehall - We Everywhere"
	lists[10] = "Diversos - All Out 00s"
	lists[11] = "Diversos - All Out 50s"
	lists[12] = "Diversos - All Out 60s"
	lists[13] = "Diversos - All Out 70s"
	lists[14] = "Diversos - All Out 80s"
	lists[15] = "Diversos - All Out 90s"
	lists[16] = "Diversos - It's ALT Good"
	lists[17] = "Diversos - just hits"
	lists[18] = "Diversos - Power Workout"
	lists[19] = "Diversos - Today's Top Hits"
	lists[20] = "Diversos - Workout Twerkout"
	lists[21] = "Hip Hop - Alternative Hip Hop"
	lists[22] = "Hip Hop - Behind The Lyrics Hip Hop"
	lists[23] = "Hip hop - Get Turnt"
	lists[24] = "Hip hop - Mind Right"
	lists[25] = "Hip Hop - Most Necessary"
	lists[26] = "Hip Hop - State of Mind"
	lists[27] = "Hip Hop (Gold school) - Gold School"
	lists[28] = "Hip Hop + R&B - BAE"
	lists[29] = "Instrumental - Classical Guitar 50 Spotify Picks"
	lists[30] = "Instrumental - Peaceful Piano"
	lists[31] = "Podcast - Black History Salute"
	lists[32] = "Pop - Hit Rewind"
	lists[33] = "Pop - New Music Friday"
	lists[34] = "Pop - Soft Pop Hits"
	lists[35] = "Pop - THE BEST OF RIHANNA by HUGO GLOSS"
	lists[36] = "Pop - This Is Beyoncé"
	lists[37] = "Pop & Rock - Rock Party"
	lists[38] = "Pop & Rock - The New Alt"
	lists[39] = "PopPunk - The Scene"
	lists[40] = "R&B - Are & Be"
	lists[41] = "Rap - Cali Fire"
	lists[42] = "Rap - RapCaviar"
	lists[43] = "Rap - Signed XOXO"
	lists[44] = "Rap - The Realest Down South"
	lists[45] = "Reggae - Reggae Classics"
	lists[46] = "Reggaeton - Viva Latino"
	lists[47] = "Rock - Rock Classics"
	lists[48] = "Rock - Rock Hard"
	lists[49] = "Rock - Rock Solid"
	lists[50] = "Rock - Rock This"
	lists[51] = "Rock - Rock This Best of 2017"
	lists[52] = "Rock - This Is Nirvana"
	lists[53] = "Rock - This Is Ramones"
	lists[54] = "Rock - This Is Ryan Adams"
	lists[55] = "Rock - This Is The Black Keys"
	lists[56] = "Rock Alternativo - New Noise"
	lists[57] = "Românticas - You & Me"
	lists[58] = "Samba & pagode - O Melhor do Samba e Pagode"

	var dropdown = d3.select("#vis-container")
		.insert("select", "svg")
		.on("change", dropdownChange);

	dropdown.selectAll("option")
		.data(lists)
	  .enter().append("option")
		.attr("value", function (d) { return d; })
		.text(function (d) {
			return d;
		});
	
	//definição da margem e do tamanho do SVG
	var margin = {top: 20, right: 0, bottom: 30, left: 292}, //left: 292 right:40
		width = 1300 - margin.left - margin.right, //1150 //1250
		height = 350 - margin.top - margin.bottom; //350
		
	//definição do SVG
	var svg = d3.select("body")
		.append("svg")
		.attr("width", 1450) //1300, 1250
		.attr("height", 495) //590
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	//criação da legenda
	var featureColor = d3.scaleOrdinal()
		.range (["#FF00FF","#8A2BE2","#0000FF","#32CD32","#FFFF00","#FFA500","#FF0000"]);
		

	//definição das features que serão utilizadas
	var features = ["speechiness","instrumentalness","liveness","acousticness","danceability","energy","valence"];
	
	var subtitle = function() {
		//definição da legenda
		var legend = svg.append("g")
			.attr("transform", "translate(" + (width - 1140) + "," + (height - 15) + ")"); //+130, -240

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
	}

	//função de leitura do arquivo e desenho da visualização na tela
	var makeVis = function(fileName) {
		
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
		
		//conversão dos valores lidos do arquivo
		data.forEach(function(d) {
			d.track = +d.track
			d.danceability = +d.danceability * 20
			d.energy = +d.energy * 20
			d.speechiness = +d.speechiness * 20
			d.acousticness = +d.acousticness * 20
			d.instrumentalness = +d.instrumentalness * 20
			d.liveness = +d.liveness * 20
			d.valence = +d.valence * 20
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
			
		//definição das funções do stackarea
		var stackLayout = d3.stack()
			.keys(features)

		var stackArea = d3.area()
			.x((d,i)=>xScale(i))
			.y0(d=>yScale(d[0]))
			.y1(d=>yScale(d[1]))
			.curve(d3.curveCardinal)
			//.curve(d3.curveBasis)

		stackLayout.offset(d3.stackOffsetSilhouette)
			//.order(d3.stackOrderInsideOut)
		
		yScale.domain([-50,50])
		
		function tabulate(data, columns) {
			
			var table = d3.select("#tabela")
				.append("table")
				.attr("style", "margin-left: 0px"), //1250, 1351, 1451px 
				thead = table.append("thead"),
				tbody = table.append("tbody");

			// append the header row
			thead.append("tr")
				.selectAll("th")
				.data(columns)
				.enter()
				.append("th")
					.text(function(column) { return column; });

			// create a row for each object in the data
			var rows = tbody.selectAll("tr")
				.data(data)
				.enter()
				.append("tr");

			// create a cell in each row for each column
			var cells = rows.selectAll("td")
				.data(function(row) {
					return columns.map(function(column) {
						return {column: column, value: row[column]};
					});
				})
				.enter()
				.append("td")
				.attr("style", "font-family: Serif") // sets the font style
					.html(function(d) { return d.value; });
			
			return table;
		}
		
		//Exibição do stackedarea no SVG
		svg.selectAll("path")
			.data(stackLayout(data))
			.enter()
			.append("path")
			.style("fill",d=>fillScale(d.key))
			.attr("d",d=>stackArea(d))
			
		// Tooltip
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
			.style("font-size",12);
	
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
		
		d3.select("body")
			  .on("mousemove", function(){  
				 mousex = d3.mouse(this);
				 mousex = mousex[0] + 5;
				 })
			  .on("mouseover", function(){  
				 mousex = d3.mouse(this);
				 mousex = mousex[0] + 5;
				 });
		
		var tracksTable = tabulate(data, ["track", "name"]);
	  })
	}
	//stacked area com tooltips https://bl.ocks.org/fabiomainardi/3976176cb36e718a608f