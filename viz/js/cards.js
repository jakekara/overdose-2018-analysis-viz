DATA_URL = "data/combined.csv";

var draw_controls = function(){

    var controls = d3.select("#controls");

    controls.html("");

    var input = controls.append("input")
	.attr("placeholder","Enter town name")
	.attr("type","text");

    var do_filter = function(v){

	var input_string = v || input.node().value;

	var input_string = input_string.toUpperCase();

	var input_values = [input_string]// .split(" ");


	var cards = d3.selectAll(".card");

	cards.attr("data-show", function(d){
	    for (var i in input_values){
		var val = input_values[i];
		if (d["TOWN"].indexOf(val) >= 0){ return "true"; }
	    }
	    return "false";
	});

	
    }

    var button = controls.append("input").attr("type","button").attr("value","search");

    input.on("keyup", do_filter);

}

var go_with_data = function(data){


    var container = d3.select("#container");

    container.html("");

    var cards = container.selectAll(".card")
	.data(data)
	.enter()
	.append("div")
	.classed("card", true)
	.attr("data-show", function(d){
	    if(d["TOWN"] == "NORWICH") { return "true"; }
	    return "false";
	})

    var heds = cards.append("h5").text(function(d){ return d["TOWN"]; });

    var abs = cards.append("img")
	.attr('src', function(d){ return "img/abs/" + d["TOWN"] + ".png"; });

    draw_controls();
}


d3.csv(DATA_URL, go_with_data);
