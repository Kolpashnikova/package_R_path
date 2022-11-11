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

                    var Activities = x.act;

                    //var flippedActivities = {
                    //    1: 'Sleep', 2: 'Personal Care',
                    //    3: 'Housework', 4: 'Child Care', 5: 'Adult Care', 6: 'Work',
                    //    7: 'Shopping', 8: 'TV Watching', 9: 'Eating', 10: 'Leisure', 11: 'Travel'
                    //};


                    function swap(json){
                      var ret = {};
                      for(var key in json){
                        ret[json[key]] = key;
                      }
                      return ret;
                    }

                    var flippedActivities = swap(Activities);

                    var colorScale = d3.scale.category20();

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

                    var forceX = d3v4.forceX((d) => xCenter[d.category]).strength(1);
                    var forceY = d3v4.forceY((d) => yCenter[d.category]).strength(1);


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
                        .attr("x", d => xCenter[Activities[d]])
                        .attr("y", d => yCenter[Activities[d]])
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
