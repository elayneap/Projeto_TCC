/*
*    código adaptado de dentro do index.html para o main.js
*/

var secondVis = function(){
	
	document.getElementById('vis-container2').style.display = 'block';
	document.getElementById('tabela2').style.display = 'block';
	document.getElementById('titulo2').style.display = 'block';
	document.getElementById('segundoSVG').style.display = 'block';
	
	//document.getElementById("botao").style.display = 'none';
	//document.getElementById('botao').disabled = true;
	
	var path3 = 'data/';
	var path4 = '.csv';
	
	var dropdownChange2 = function() {
		svg2.selectAll("*").remove();
		document.getElementById("tabela2").innerHTML="";
		document.getElementById("titulo2").innerHTML="";
		document.getElementById("linha").innerHTML="";
		
		var newPlaylist2 = d3.select(this).property('value'),
		playlistSelecionada2 = newPlaylist2;
		
		if (playlistSelecionada2 == "Classical Guitar 50: Spotify Picks"){
			playlistSelecionada2 = "Classical Guitar 50 Spotify Picks";
		}
		
		var caminhoArquivo2 = path3 + playlistSelecionada2 + path4;
		
		fileName2 = caminhoArquivo2;
		
		makeVis2(fileName2);
		subtitle2();
		titulo2(playlistSelecionada2);
	}
	
	var titulo2 = function(tituloPlaylist2) {
		
		var nomePlaylist2 = d3.select("#titulo2")
				.append("text")
				.attr("style", "font-size: 25px")
				.text(tituloPlaylist2);

	}
	

	//Pegar os nomes das playlists para o choicebox
	var lists2 = [];
	lists2[0] = "...Escolha a categoria e a playlist...";
	lists2[1] = "Africana - African Heat"
	lists2[2] = "Country - Hot Country"
	lists2[3] = "Country Rock - This Is Tom Petty"
	lists2[4] = "Dance & Eletronica - Eletro"
	lists2[5] = "Dance & Eletronica - Martin Garrix Live On Tomorrowland 2020"
	lists2[6] = "Dance & Eletronica - mint"
	lists2[7] = "Dance & Eletronica - TUTZ TUTZ"
	lists2[8] = "Dancehall - Dancehall Official"
	lists2[9] = "Dancehall - We Everywhere"
	lists2[10] = "Diversos - All Out 00s"
	lists2[11] = "Diversos - All Out 50s"
	lists2[12] = "Diversos - All Out 60s"
	lists2[13] = "Diversos - All Out 70s"
	lists2[14] = "Diversos - All Out 80s"
	lists2[15] = "Diversos - All Out 90s"
	lists2[16] = "Diversos - It's ALT Good"
	lists2[17] = "Diversos - just hits"
	lists2[18] = "Diversos - Power Workout"
	lists2[19] = "Diversos - Today's Top Hits"
	lists2[20] = "Diversos - Workout Twerkout"
	lists2[21] = "Hip Hop - Alternative Hip Hop"
	lists2[22] = "Hip Hop - Behind The Lyrics Hip Hop"
	lists2[23] = "Hip hop - Get Turnt"
	lists2[24] = "Hip hop - Mind Right"
	lists2[25] = "Hip Hop - Most Necessary"
	lists2[26] = "Hip Hop - State of Mind"
	lists2[27] = "Hip Hop (Gold school) - Gold School"
	lists2[28] = "Hip Hop + R&B - BAE"
	lists2[29] = "Instrumental - Classical Guitar 50 Spotify Picks"
	lists2[30] = "Instrumental - Peaceful Piano"
	lists2[31] = "Podcast - Black History Salute"
	lists2[32] = "Pop - Hit Rewind"
	lists2[33] = "Pop - New Music Friday"
	lists2[34] = "Pop - Soft Pop Hits"
	lists2[35] = "Pop - THE BEST OF RIHANNA by HUGO GLOSS"
	lists2[36] = "Pop - This Is Beyoncé"
	lists2[37] = "Pop & Rock - Rock Party"
	lists2[38] = "Pop & Rock - The New Alt"
	lists2[39] = "PopPunk - The Scene"
	lists2[40] = "R&B - Are & Be"
	lists2[41] = "Rap - Cali Fire"
	lists2[42] = "Rap - RapCaviar"
	lists2[43] = "Rap - Signed XOXO"
	lists2[44] = "Rap - The Realest Down South"
	lists2[45] = "Reggae - Reggae Classics"
	lists2[46] = "Reggaeton - Viva Latino"
	lists2[47] = "Rock - Rock Classics"
	lists2[48] = "Rock - Rock Hard"
	lists2[49] = "Rock - Rock Solid"
	lists2[50] = "Rock - Rock This"
	lists2[51] = "Rock - Rock This Best of 2017"
	lists2[52] = "Rock - This Is Nirvana"
	lists2[53] = "Rock - This Is Ramones"
	lists2[54] = "Rock - This Is Ryan Adams"
	lists2[55] = "Rock - This Is The Black Keys"
	lists2[56] = "Rock Alternativo - New Noise"
	lists2[57] = "Românticas - You & Me"
	lists2[58] = "Samba & pagode - O Melhor do Samba e Pagode"

	var dropdown2 = d3.select("#vis-container2")
		.insert("select", "#segundoSVG")
		.on("change", dropdownChange2);

	dropdown2.selectAll("option")
		.data(lists2)
	  .enter().append("option")
		.attr("value", function (d) { return d; })
		.text(function (d) {
			return d;
		});
	
	//definição da margem e do tamanho do SVG
	var margin2 = {top: 20, right: 0, bottom: 30, left: 292},
		width2 = 1300 - margin2.left - margin2.right,
		height2 = 350 - margin2.top - margin2.bottom;
		
	//definição do SVG
	var svg2 = d3.select("#segundoSVG")
		.append("svg")
		.attr("width", 1300)
		.attr("height", 455)
		.append("g")
			.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
	  
	//criação da legenda
	var featureColor2 = d3.scaleOrdinal()
		.range (["#FF00FF","#8A2BE2","#0000FF","#32CD32","#FFFF00","#FFA500","#FF0000"]);
		

	//definição das features que serão utilizadas
	var features2 = ["speechiness","instrumentalness","liveness","acousticness","danceability","energy","valence"];
	
	var subtitle2 = function() {
		//definição da legenda
		var legend2 = svg2.append("g")
			.attr("transform", "translate(" + (width2 - 785) + "," + (height2 - 270) + ")"); //(width2 - 1140) (height2 - 15)

		features2.forEach(function(feature2, i){
		if (i == 1){
			var legendRow2 = legend2.append("g")
			.attr("transform", "translate(" + (i * 150) + ",0)");
		} else {
			if (i == 2 || i == 3) {
				var legendRow2 = legend2.append("g")
				.attr("transform", "translate(" + (i * 122) + ",0)");
			}
			else {
				if (i == 4) {
				var legendRow2 = legend2.append("g")
				.attr("transform", "translate(" + (i * 120) + ",0)");
				} else {
					if (i == 6){
						var legendRow2 = legend2.append("g")
						.attr("transform", "translate(" + (i * 108) + ",0)");
					}else{
						var legendRow2 = legend2.append("g")
						.attr("transform", "translate(" + (i * 112) + ",0)");
					}
				}
			}
		}

		legendRow2.append("rect")
			.attr("width", 10)
			.attr("height", 10)
			.attr("fill", featureColor2(feature2));

		legendRow2.append("text")
			.attr("x", -10)
			.attr("y", 10)
			.attr("text-anchor", "end")
			.attr("fill", "white")
			.style("text-transform", "capitalize")
			.text(feature2);
		});
	}

	//função de leitura do arquivo e desenho da visualização na tela
	var makeVis2 = function(fileName2) {
		
		d3.csv(fileName2, function viz(data) {
		
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
			.domain([0,tamanho])
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

		stackLayout.offset(d3.stackOffsetSilhouette)
		
		yScale.domain([-50,50])
		
		function tabulate(data, columns) {
			
			var table = d3.select("#tabela2")
				.append("table")
				.attr("style", "margin-left: 0px"),
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
		svg2.selectAll("path")
			.data(stackLayout(data))
			.enter()
			.append("path")
			.style("fill",d=>fillScale(d.key))
			.attr("d",d=>stackArea(d))
			
		// Tooltip
		var focus = svg2.append("g")
			.attr("class", "remove")
			.style("display", "none");

		/*focus.append("circle")
			.attr("fill", "#FFFF00") //white
			.attr("r", 3);*/

		focus.append("text")
			.attr("x", 9)
			.attr("dy", ".35em")
			.attr("fill", "#FFFF00") //white
			.style("font-size",12);
			
		var focus2 = svg2.append("g")
			.attr("class", "focus")
			.style("display", "none");

		/*focus2.append("circle")
			.attr("fill", "#FFA500")
			.attr("r",3);*/

		focus2.append("text")
			.attr("x", 9)
			.attr("dy", ".35em")
			.attr("fill", "#FFA500")
			.style("font-size",12);
			
		var focus3 = svg2.append("g")
			.attr("class", "focus")
			.style("display", "none");

		/*focus3.append("circle")
			.attr("fill", "#FF00FF")
			.attr("r", 3);*/

		focus3.append("text")
			.attr("x", 9)
			.attr("dy", ".35em")
			.attr("fill", "#FF00FF")
			.style("font-size",12);

		var focus4 = svg2.append("g")
			.attr("class", "focus")
			.style("display", "none");

		/*focus4.append("circle")
			.attr("fill", "#32CD32")
			.attr("r", 3);*/

		focus4.append("text")
			.attr("x", 9)
			.attr("dy", ".5em")
			.attr("fill", "#32CD32")
			.style("font-size",12);
		
		var focus5 = svg2.append("g")
			.attr("class", "focus")
			.style("display", "none");

		/*focus5.append("circle")
			.attr("fill", "#8A2BE2")
			.attr("r", 3);*/

		focus5.append("text")
			.attr("x", 9)
			.attr("dy", ".5em")
			.attr("fill", "#8A2BE2")
			.style("font-size",12);
			
		var focus6 = svg2.append("g")
			.attr("class", "focus")
			.style("display", "none");

		/*focus6.append("circle")
			.attr("fill", "#0000FF")
			.attr("r", 3);*/

		focus6.append("text")
			.attr("x", 9)
			.attr("dy", ".5em")
			.attr("fill", "#0000FF")
			.style("font-size",12);
			
		var focus7 = svg2.append("g")
			.attr("class", "focus")
			.style("display", "none");

		/*focus7.append("circle")
			.attr("fill", "white")
			.attr("r", 3);*/

		focus7.append("text")
			.attr("x", 9)
			.attr("dy", ".5em")
			.attr("fill", "white")
			.style("font-size",15);
			
		var focus8 = svg2.append("g")
			.attr("class", "focus")
			.style("display", "none");

		/*focus8.append("circle")
			.attr("fill", "#FF0000")
			.attr("r", 3);*/

		focus8.append("text")
			.attr("x", 9)
			.attr("dy", ".5em")
			.attr("fill", "#FF0000")
			.style("font-size",12);
	
		//função para colocar o foco na feature ao passar no mouse
		svg2.selectAll("path")
			.attr("opacity", 1)
			.on("mouseover", function(d, i) {
				svg2.selectAll("path").transition()
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
				svg2.selectAll("path").transition()
					.duration(250)
					.attr("opacity", 1)
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
				
				focus.attr("transform", "translate(" + 350 + "," + (399 - margin.top - margin.bottom)+ ")"); //Danceability
				focus2.attr("transform", "translate(" + 350 + "," + (380 - margin.top - margin.bottom)+ ")"); //Energy
				focus3.attr("transform", "translate(" + 350 + "," + (475 - margin.top - margin.bottom)+ ")"); //Speechiness
				focus4.attr("transform", "translate(" + 350 + "," + (418 - margin.top - margin.bottom)+ ")"); //Acousticness
				focus5.attr("transform", "translate(" + 350 + "," + (456 - margin.top - margin.bottom)+ ")"); //Instrumentalness
				focus6.attr("transform", "translate(" + 350 + "," + (437 - margin.top - margin.bottom)+ ")"); //Liveness
				focus7.attr("transform", "translate(" + 350 + "," + (340 - margin.top - margin.bottom)+ ")"); //Musica
				focus8.attr("transform", "translate(" + 350 + "," + (361 - margin.top - margin.bottom)+ ")"); //Valence
				
				focus.select("text").text("Danceability: " + pro1.toFixed(3));
				focus2.select("text").text("Energy: " + pro2.toFixed(3));
				focus3.select("text").text("Speechiness: " + pro3.toFixed(3));
				focus4.select("text").text("Acousticness: " + pro4.toFixed(3));
				focus5.select("text").text("Instrumentalness: " + pro5.toFixed(3));
				focus6.select("text").text("Liveness: " + pro6.toFixed(3));
				focus7.select("text").text("Música: " + pro);
				focus8.select("text").text("Valence: " + pro7.toFixed(3));
		}
		
		var vertical2 = d3.select(".chart")
			.append("div")	
			.attr("class", "remove")
			.style("position", "absolute")
			.style("z-index", "21")
			.style("width", "1px")
			.style("height", "230px")
			.style("top", "600px")
			.style("left", "0px")
			.style("background", "#FFFFFF");
			
		d3.select("body")
		  .on("mousemove", function(){  
			 mousex = d3.mouse(this);
			 mousex = mousex[0] + 5;
			 vertical2.style("left", mousex + "px" )})
		  .on("mouseover", function(){  
			 mousex = d3.mouse(this);
			 mousex = mousex[0] + 5;
			 vertical2.style("left", mousex + "px")});
		
		
		d3.select("segundoSVG")
			  .on("mousemove", function(){  
				 mousex = d3.mouse(this);
				 mousex = mousex[0] + 5;
				 })
			  .on("mouseover", function(){  
				 mousex = d3.mouse(this);
				 mousex = mousex[0] + 5;
				 });
		
		var tracksTable = tabulate(data, ["track", "name", "album_date"]);
	  })
	}
}