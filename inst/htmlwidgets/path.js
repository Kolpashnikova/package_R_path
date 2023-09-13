HTMLWidgets.widget({

  name: 'path',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        // TODO: code to render the widget, e.g.
        var newSvg = document.getElementById(el.id);
        newSvg.innerHTML += '<div id="pathChartContainer" class="mx-auto max-w-3xl" style="height: 80vh; margin-top: 50px;"><div id="current_time" class="timeLabel">04:00 AM</div><div id="content"><svg id = "pathChart"><g transform="translate(0, 0)"></g></svg></div></div>';


            // (c) Kamila Kolpashnikova 2020
                    var data = x.data;

                    var weights = x.weights;

                    var steps = data[0].length - 1;

                    var granularity = 1440/data[0].length;

                    var width = d3.select("#pathChartContainer").style('width'),
                        height = d3.select("#pathChartContainer").style('height');

                    var Activities = x.act;

                    function swap(json){
                      var ret = {};
                      for(var key in json){
                        ret[json[key]] = key;
                      }
                      return ret;
                    }

                    var flippedActivities = swap(Activities);

                    //custom functions
                		function findSmallestDifferencePair(number) {
                		    var smallestDiffPair = { first: 1, second: number }; // Initialize with the smallest possible pair
                		    var smallestDifference = Math.abs(1 - number); // Initialize with the largest possible difference

                		    for (var i = 1; i <= Math.floor(Math.sqrt(number)); i++) {
                		        if (number % i === 0) {
                		            var pair = { first: i, second: number / i };
                		            var difference = Math.abs(pair.first - pair.second);

                		            // Check if the current pair has a smaller difference
                		            if (difference < smallestDifference) {
                		                smallestDifference = difference;
                		                smallestDiffPair = pair;
                		            }
                		        }
                		    }


                		    if (smallestDiffPair.first === 1 && smallestDiffPair.second === number) {
                		        return null;
                		    } else {
                		        return smallestDiffPair;
                    		}
                		}

                		function findClosestLargerNumberWithPair(number) {
                		    while (true) {
                		        var result = findSmallestDifferencePair(number);
                		        if (result !== null) {
                		            return number;
                		        }
                		        number++; // Increment the number and try again
                		    }
                		}

                		function rearrangeArray(array) {
                		    var midpoint = Math.floor(array.length / 2); // Find the midpoint

                		    // Split the array into two parts
                		    var firstHalf = array.slice(0, midpoint);
                		    var secondHalf = array.slice(midpoint);

                		    // Add the first half to the end of the second half
                		    var combinedArray = secondHalf.concat(firstHalf);

                		    return combinedArray;
                		}

                		function removeMidpoint(array, compareArrayN) {
                			var n = array.length - compareArrayN;
                		    var midpoint = Math.floor(array.length / 2); // Find the midpoint

                		    // Split the array into two parts
                		    var firstHalf = array.slice(0, midpoint);
                		    var secondHalf = array.slice(midpoint+1);

                		    // Add the first half to the end of the second half
                		    var combinedArray = firstHalf.concat(secondHalf);

                		    return combinedArray;
                		}

                		//custom variables
                    var layout = x.layout;
            		    var focusActivity = x.focusActivity;
            		    var colors = x.colors;

              			// Define the number of activities
              			var numActivities = Object.keys(flippedActivities).length;

            		    if (layout === "circular") {
                  			// Define the radius for the circular layout
                  			var circleRadius = (Math.min(parseInt(width, 10), parseInt(height, 10)) / 2) - 20;

                  			// Calculate angular positions for activities based on categories
                  			var angleStep = (2 * Math.PI) / numActivities;

                  			var xCenter = [];
                  			var yCenter = [];

                  			for (var i = 0; i < numActivities; i++) {
                  			    var angle = i * angleStep;
                  			    var xPosition = circleRadius * Math.cos(angle) + parseInt(width, 10) / 2; // Adjust for centering
                  			    var yPosition = circleRadius * Math.sin(angle) + parseInt(height, 10) / 2; // Adjust for centering
                  			    xCenter.push(xPosition);
                  			    yCenter.push(yPosition);
                  			}
                  	} else if (layout === "circularCenter") {
                  			// Define the radius for the circular layout
                  			var circleRadius = (Math.min(parseInt(width, 10), parseInt(height, 10)) / 2) - 20;

                  			// Calculate angular positions for activities based on categories
                  			var angleStep = (2 * Math.PI) / (numActivities - 1);

                  			var xCenter = [];
                  			var yCenter = [];

                  			for (var i = 0; i < numActivities; i++) {
                  			    var angle = i * angleStep;
                  			    var xPosition = circleRadius * Math.cos(angle) + parseInt(width, 10) / 2; // Adjust for centering
                  			    var yPosition = circleRadius * Math.sin(angle) + parseInt(height, 10) / 2; // Adjust for centering
                  			    xCenter.push(xPosition);
                  			    yCenter.push(yPosition);
                  			}

                  			xCenter.splice(Activities[focusActivity]-1, 0, parseInt(width, 10) / 2);
                  			yCenter.splice(Activities[focusActivity]-1, 0, parseInt(height, 10) / 2);

                  	} else if (Object.keys(flippedActivities).length === 11) {
                        var xGrid = d3.scale.linear()
                            .domain([1, 7])
                            .range([0, width]);

                        var yGrid = d3.scale.linear()
                            .domain([1, 9])
                            .range([0, height]);
                        // number of centers should reflect the number of activities
                        var xCenter = [parseInt(xGrid(4)), parseInt(xGrid(4)), parseInt(xGrid(4)),
                            parseInt(xGrid(2)), parseInt(xGrid(2)), parseInt(xGrid(2)),
                            parseInt(xGrid(6)), parseInt(xGrid(2)), parseInt(xGrid(6)),
                            parseInt(xGrid(6)), parseInt(xGrid(6)), parseInt(xGrid(4))];
                        var yCenter = [parseInt(yGrid(2)), parseInt(yGrid(5)), parseInt(yGrid(7)), parseInt(yGrid(4)),
                            parseInt(yGrid(8)), parseInt(yGrid(2)), parseInt(yGrid(2)), parseInt(yGrid(6)),
                            parseInt(yGrid(8)), parseInt(yGrid(4)), parseInt(yGrid(6)), parseInt(yGrid(3))];
            		    } else {

                  			var closestLargerNumber = findClosestLargerNumberWithPair(numActivities);
                  			var ColumnsRows = findSmallestDifferencePair(closestLargerNumber);

                  			var numColumns = ColumnsRows.first;
                  			var gridSizeX = numColumns*2 + 1; // Define the number of columns in the grid
                  			var numRows = ColumnsRows.second;
                  			var gridSizeY = numRows*2 + 1; // Define the number of rows in the grid

                  	        var xGrid = d3.scale.linear()
                  	            .domain([1, gridSizeX])
                  	            .range([0, width]);

                  	        var yGrid = d3.scale.linear()
                  	            .domain([1, gridSizeY])
                  	            .range([0, height]);

                  			var xC = [];
                  			var yC = [];

                  			for (var i = 0; i < numColumns; i++) {
                  				for (var j = 0; j < numRows; j++) {
                  			        var xValue = (i+1)*2;
                  			        var yValue = (j+1)*2;
                  			        xC.push(parseInt(xGrid(xValue)));
                  			        yC.push(parseInt(yGrid(yValue)));
                  				}
                  			}

                  			var xCenter = rearrangeArray(removeMidpoint(xC, numActivities));
                  			var yCenter = rearrangeArray(removeMidpoint(yC, numActivities));

                  	}

                    if (colors !== undefined && colors !== null){
              			    var colorScale = d3.scale.ordinal()
                  			    .domain([1, numActivities + 1]) // Numbers as the domain
                  			    .range(colors);
                    } else {
                      	var colorScale = d3.scale.category20();
                    }

                    var radius = width < 400 ? 1 : 4;

                    if (weights == null){
                      var nodes = data.map(function (d, i) {
                          return {
                              category: d[0],
                              number: i,
                              r: width < 400 ? 1.5 : 3
                          }
                      });
                    } else {

                      //var numNodes = 800;
                      var nodes = data.map(function (d, i) {
                          return {
                              category: d[0],
                              number: i,
                              r: width < 400 ? weights[i] : 3 * weights[i]
                          }
                      });

                    }

                    //console.log(nodes);

                    var forceX = d3v4.forceX((d) => xCenter[d.category-1]).strength(1);
                    var forceY = d3v4.forceY((d) => yCenter[d.category-1]).strength(1);


                    var simulation = d3v4.forceSimulation(nodes)
                        //.alphaDecay(0)
                        .velocityDecay(0.75)
                        .force('charge', d3v4.forceManyBody().strength(3))
                        .force('x', forceX)
                        .force('y', forceY)
                        .force('collision', d3v4.forceCollide((d) => d.r).strength(1))
                        .on('tick', ticked);


                    var svg = d3v4.select('#pathChart')
                        .attr("width", width)
                        .attr("height", height);

                    svg.selectAll("*").remove();

                    //simulation.alpha(0.5).restart();

                    // draw nodes
                    var circle = svg.selectAll("circle")
                        .data(nodes)
                        .enter().append("circle")
                        .style("fill", function (d) {
                            //return "#" + fullColorHex(colorsNeeded(flippedActivities[d.category])[0]);
                            return colorScale(flippedActivities[d.category]);
                        });

                    // add activity lables
                    svg.selectAll("text")
                        .data(d3v4.keys(Activities))
                        .enter().append("text")
                        .attr("class", "labelMain")
                        .attr("text-anchor", "middle")
                        .attr("x", d => xCenter[Activities[d]-1])
                        .attr("y", d => yCenter[Activities[d]-1])
                        .style("fill", 'dimgray')
                        // .attr("dy", "0em")
                        .text(d => d)

                    function ticked(e) {
                        circle
                            .transition() // these trans lines make it snaky
                            //.ease(d3v4.easeElastic)
                            .ease(d3v4.easeLinear)
                            .duration(0.5)
                            .delay(function (d, i) {
                                return i + 0.000005;
                            })
                            .style("fill", function (d) {
                                //return '#' + fullColorHex(colorsNeeded(flippedActivities[d.category])[0])
                                return colorScale(flippedActivities[d.category])
                            })
                            .attr('transform', (d) => {
                                return 'translate(' + (d.x) + ',' + (d.y) + ')';
                            })
                            //.attr("cx", function(d) { return xCenter[d.category]; })
                            //.attr("cy", function(d) { return yCenter[d.category]; })
                            .attr("r", function (d) {
                                return d.r;
                            });
                    }

                    moves = 0;

                    var formatTime = d3.time.format("%H:%M %p"),
                        formatMinutes = function (d) {
                            return formatTime(new Date(2020, 0, 0, 4, d));
                        };


                    setInterval(function timer() {
                        //d.category = Math.floor(Math.random() * 12);
                        //instead of 6 use 1440-1
                        if (moves != steps) {
                            moves += 1;
                            nodes.forEach(function (d) {
                                d.category = data[d.number][moves];
                            });
                        } else {
                            moves = 0;
                            nodes.forEach(function (d) {
                                d.category = data[d.number][moves];
                            });
                        }

                        //duration gives time for it to happen (add up to movement above)
                        //circle.transition(150).style("fill", function(d) { return fullColorHex(colorsNeeded(flippedActivities[d.category])[0]); });

                        // timeout not necessary
                        //setTimeout(function(){
                        simulation.nodes(nodes);
                        simulation.alpha(0.5).restart();
                        //}, 500);

                        d3v4.select("#current_time").text(formatMinutes(moves * granularity));

                    }, 800);
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
