
//Queuing data so it all loads before 'makeGraph' is invoked 
queue()
    .defer(d3.json, "/footy/projectdata")
    .await(makeGraphs);




function makeGraphs(error, footballData) {

    var footyData = footballData;
    //Get dates in a state they will be recognised as dates
    var parseDate = d3.time.format("%d/%m/%Y").parse;
    footyData.forEach(function(d) {
        d.date = parseDate(d.date);
        d.Year = d.date.getFullYear();
    });


    //creating a cross filter instance
    var ndx = crossfilter(footyData);

    //Enables the results of crossfilter filters to be output to the console log
    function print_filter(filter) {
        var f = eval(filter);
        if (typeof(f.length) != "undefined") {} else {}
        if (typeof(f.top) != "undefined") { f = f.top(Infinity); } else {}
        if (typeof(f.dimension) != "undefined") { f = f.dimension(function(d) { return ""; }).top(Infinity); } else {}
        console.log(filter + "(" + f.length + ") = " + JSON.stringify(f).replace("[", "[\n\t").replace(/}\,/g, "},\n\t").replace("]", "\n]"));
    }

    // Dimensions:
    var dateDim = ndx.dimension(function(d) { return d.date; });
    var seasonDim = ndx.dimension(function(d) { return d.season; });
    var transferWindowDim = ndx.dimension(function(d) { return d.transfer_window; });
    var leagueSoldToDim = ndx.dimension(function(d) { return d.league_moving_to; });
    var leagueSoldFromDim = ndx.dimension(function(d) { return d.league_moving_from; });
    var feeDim = ndx.dimension(function(d) { return +d.fee; });


    /*******************************************************************
	  	Bar Chart 'Transfer Spending'
  		Shows each transfer over time as a fee at the time of transfer
	********************************************************************/
    //Group fee's paid by date    
    var feeDateDimFilter = dateDim.group().reduceSum(function(d) { return d.fee / 1000000; });
    //Getting max and min values for time based chart
    var minDate = dateDim.bottom(1)[0].date;
    var maxDate = dateDim.top(1)[0].date;
    //Associate graph with HTML anchor and define chart 
    var chartTotalFees = dc.barChart("#bar-chart-overall-transfer-spend");
    chartTotalFees
        .width(barChartWidth)
        .height(barChartHeight)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(dateDim)
        .group(feeDateDimFilter)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticY(true)
        .brushOn(false)
        .ordinalColors(['#002b80']) //Line colour
        .yAxisLabel("Millions (£)")
        .xAxisLabel("Year")
        .yAxis().ticks(5);


    /*******************************************************************
	  	Row Chart 'Value of Seasonal Transfers'
  		Simply the seasonal Totals of Transfer Fees
	********************************************************************/
    var seasonalFees = seasonDim.group().reduceSum(function(d) { return d.fee / 1000000000; });
    var chartSeasonalFees = dc.rowChart("#rowchart-seasonal-total-fees");
    chartSeasonalFees
        .width(seasonalFeesWidth)
        .height(seasonalFeesHeight)
        .margins({ top: 10, left: 15, right: 15, bottom: 40 })
        .ordinalColors(['#b3ccff', '#80aaff', '#4d88ff', '#1a66ff', '#004de6', '#003cb3', '#002b80'])
        .dimension(seasonDim)
        .group(seasonalFees)
        .xAxis().ticks(4);


    /*******************************************************************
	  	Pie Chart 'Window'
  		The proportion of transfers made in the summer/winter transfer 
  		windows as a proportion of the fees involved.
	********************************************************************/
    var transferWindow_totals = transferWindowDim.group().reduceCount(function(d) { return d.fee; });
    var windowPieChart = dc.pieChart("#piechart-window");
    windowPieChart
        .width(150)
        .height(150)
        .innerRadius(25)
        .ordinalColors(['#80aaff', '#003cb3'])
        .dimension(transferWindowDim)
        .group(transferWindow_totals);


    /*******************************************************************
	  	Number Display 'Total Transfer Spend'
  		A sum of the transfers fee's involved for the filters applied
	********************************************************************/
    //---------------------------------------------------------
    // Code supplied by Timmy O'Mahony (my mentor) to get the 
    // overal value shown for 'Total Transfer Spend to show 'B'
    // for Billions rather than 'G' for Gig
    //---------------------------------------------------------

    var totalFeesSeasonal = ndx.groupAll().reduceSum(function(d) {
        return d.fee;
    });

    var UK = d3.locale({
        "decimal": ".",
        "thousands": ",",
        "grouping": [3],
        "currency": ["£", ""],
        "dateTime": "%a %b %e %X %Y",
        "date": "%m/%d/%Y",
        "time": "%H:%M:%S",
        "periods": ["AM", "PM"],
        "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    });


    // Getting M, B thousands etc.
    // https://github.com/d3/d3/issues/2241
    formatSi = UK.numberFormat("$.2s");

    function formatAbbreviation(x) {
        var s = formatSi(x);
        switch (s[s.length - 1]) {
            case "G":
                return s.slice(0, -1) + "B";
        }
        return s;
    }
    //---------------------------------------------------------
    //                     Supplied code ends
    //---------------------------------------------------------

    //Chart for all none-xs views
    var chartTotalSpend = dc.numberDisplay("#total-transfer-spend");
    chartTotalSpend
        .formatNumber(formatAbbreviation)
        .valueAccessor(function(d) {
            return d;
        })
        .group(totalFeesSeasonal);

    //For hidden chart that is made visible in xs view
    var chartTotalSpend_xs = dc.numberDisplay("#total-transfer-spend-xs");
    chartTotalSpend_xs
        .formatNumber(formatAbbreviation)
        .valueAccessor(function(d) {
            return d;
        })
        .group(totalFeesSeasonal);





    /*******************************************************************
	  	Row Chart 'League Sold To'
  		Showing the amount of transfers made TO a league
  		Note: While fee is returned, it is based on the actual amount of 
  		      transfers because reduceCount is used (not reduceSum).
	********************************************************************/
    var leagueSoldToGroup = leagueSoldToDim.group().reduceCount(function(d) { return d.fee; });
    var leagueSoldToRowChart = dc.rowChart("#rowchart-leagueSoldTo");
    leagueSoldToRowChart
        .width(soldToWidth)
        .height(soldToHeight)
        .margins({ top: 10, left: 15, right: 15, bottom: 40 })
        .ordinalColors(['#80aaff', '#1a66ff', '#003cb3'])
        .dimension(leagueSoldToDim)
        .group(leagueSoldToGroup)
        .xAxis().ticks(5);



    /*******************************************************************
	  	Row Chart 'League Sold From'
  		Showing the amount of transfers made FROM a league
  		Note: While fee is returned, it is based on the actual amount of 
  		      transfers because reduceCount is used (not reduceSum).
	********************************************************************/
    var leagueSoldFromGroup = leagueSoldFromDim.group().reduceCount(function(d) { return d.fee; });
    var leagueSoldFromRowChart = dc.rowChart("#rowchart-leagueSoldFrom");
    //criteria for pie chart
    leagueSoldFromRowChart
        .width(soldFromWidth)
        .height(soldFromHeight)
        .margins({ top: 10, left: 15, right: 15, bottom: 40 })
        .ordinalColors(['#80aaff', '#1a66ff', '#003cb3'])
        .dimension(leagueSoldFromDim)
        .group(leagueSoldFromGroup)
        .xAxis().ticks(5);



    /*********************************************************************************
	  	Table - 'The 10/15/25/50 Most Expensive Transfers' device depending on device size
  		Shows the most expensive transfers in the table for the given filters applied
	**********************************************************************************/

    /*****************************************
       Needed to get comma's into fee amounts
    ******************************************/
    var formatInCommas = d3.format(",");

    /*****************************************
       Zero filing dates for table aesthetics
    ******************************************/
    function zeroFillDay(dd) {
        if (dd < 10) {
            dd = '0' + dd;
        }
        return dd;
    }

    /*****************************************
       Zero filing dates for table aesthetics
    ******************************************/
    function zeroFillMonth(mm) {
        if (mm < 10) {
            mm = '0' + mm;
        }
        return mm;
    }

	/*******************************************************************************************
	   This is set in customJS to enable a different table to be shown depending on screen size
	********************************************************************************************/
    if ((datatableSize == 50) || datatableSize == 25) {
        datatableBig = dc.dataTable("#dc-data-table");
        datatableBig
            //.dimension(feeDateDimFilter2)
            .dimension(feeDim)
            .group(function(d) { return ''; }) // an empty string
            .sortBy(function(d) { return d.fee; })
            //size of the data table in rows, this needs to be automatic...
            .size(datatableSize)
            // create the columns dynamically
            .columns([
                function(d) {
                    return zeroFillDay(d.date.getDate()) + "/" + zeroFillMonth((d.date.getMonth() + 1)) + "/" + d.date.getFullYear();
                },
                function(d) {
                    return d.player_name;
                },
                function(d) {
                    return "£" + formatInCommas(+d.fee);
                },
                function(d) {
                    return d.club_moving_from;
                },
                function(d) {
                    return d.league_moving_from;
                },
                function(d) {
                    return d.club_moving_to;
                },
                function(d) {
                    return d.league_moving_to;
                }
            ])
            .order(d3.descending);
    } else if ((datatableSize == 15) || datatableSize == 10) {
        datatableSmall = dc.dataTable("#dc-data-table");
        datatableSmall
            .dimension(feeDim)
            .group(function(d) { return ''; }) // an empty string
            .sortBy(function(d) { return d.fee; })
            //size of the data table in rows, this needs to be automatic...
            .size(datatableSize)            
            .columns([
                function(d) {
                    return zeroFillDay(d.date.getDate()) + "/" + zeroFillMonth((d.date.getMonth() + 1)) + "/" + d.date.getFullYear();
                },
                function(d) {
                    return d.player_name;
                },
                function(d) {
                    return "£" + formatInCommas(+d.fee);
                },
                function(d) {
                    return d.club_moving_from;
                },
                function(d) {
                    return d.club_moving_to;
                },
            ])
            .order(d3.descending);
    }

    //Draw all the graphs that have been 
    dc.renderAll();
    //fading in the graphs once the data has been loaded
    $("#loader-frame").fadeOut(2500);



    /***********************************************************************************************************
    	Adding Axis labels to the row charts AFTER they have been built by DC.JS
    	Code idea taken from:
    	https://stackoverflow.com/questions/21114336/how-to-add-axis-labels-for-row-chart-using-dc-js-or-d3-js 
    ************************************************************************************************************/
    function AddXAxis(chartToUpdate, displayText) {
        chartToUpdate.svg()
            .append("text")
            .attr("class", "x-axis-label")
            .attr("text-anchor", "middle")
            .attr("x", chartToUpdate.width() / 2)
            .attr("y", chartToUpdate.height() - 3.5)
            .text(displayText);
    }
    AddXAxis(chartSeasonalFees, "Billions (£)");
    AddXAxis(leagueSoldToRowChart, "Amount of Players");
    AddXAxis(leagueSoldFromRowChart, "Amount of Players");




    /*******************************************************************
       Resetting all the filters, one global and an individual one each
     *******************************************************************/
    var resetAllFilters = function() {
        dc.filterAll();
        dc.redrawAll();
        return false;
    };

    var resetTransferWinFilter = function() {
        transferWindowDim.filterAll();
        windowPieChart.filter(null);
        dc.redrawAll();
        return false;
    };

    var resetSeasonFilter = function() {
        seasonDim.filterAll();
        chartSeasonalFees.filter(null);
        dc.redrawAll();
        return false;
    };

    //League Sold To
    var resetMoveToFilter = function() {
        leagueSoldToDim.filterAll();
        leagueSoldToRowChart.filter(null);
        dc.redrawAll();
        return false;
    };

    //League Sold From
    var resetMoveFromFilter = function() {
        leagueSoldFromDim.filterAll();
        leagueSoldFromRowChart.filter(null);
        dc.redrawAll();
        return false;
    };


    /***********************************************
       jQuery click event to manage button presses
    ************************************************/
    $('.reset-all').click(resetAllFilters);
    $('#reset-season').click(resetSeasonFilter);
    $('#reset-window').click(resetTransferWinFilter);
    $('#reset-moveTo').click(resetMoveToFilter);
    $('#reset-moveFrom').click(resetMoveFromFilter);

}