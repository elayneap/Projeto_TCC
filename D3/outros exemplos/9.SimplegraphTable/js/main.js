	// set the dimensions and margins of the graph
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	// set the ranges
	var x = d3.scaleTime().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	// append the svg obgect to the body of the page
	// appends a 'group' element to 'svg'
	// moves the 'group' element to the top left margin
	var svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform",
			  "translate(" + margin.left + "," + margin.top + ")");

	// Get the data
	d3.csv("data/data.csv", function(error, data) {

	  // format the data
	  data.forEach(function(d) {
		  d.date1 = +d.date;
		  d.close = +d.close;
	  });

	  // Scale the range of the data
	  x.domain(d3.extent(data, function(d) { return d.date1; }));
	  y.domain([0, d3.max(data, function(d) { return d.close; })]);

	// The table generation function
	function tabulate(data, columns) {
		console.log(data);
		
		var table = d3.select("body").append("table")
				.attr("style", "margin-left: 400px"),
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
			.attr("style", "font-family: Courier") // sets the font style
				.html(function(d) { return d.value; });
		
		return table;
	}

	// render the table
	 var peopleTable = tabulate(data, ["date", "close"]);

	});