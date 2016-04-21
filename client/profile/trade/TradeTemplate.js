Template.TradeTemplate.helpers({

  BTC: function(){
    return Meteor.user().profile.wallet.BTC || "";
  },
  USD: function () {
    return Meteor.user().profile.wallet.USD || "";
  }
});



Template.TradeTemplate.onRendered(function (){
	
	$("#TradeTabExplain").show();
	$("#AvailableOrders").hide();
	
	$("#UserHistoryFeed").hide();
	$("#UserOrderFeed").show();

  // code for creating a weekly line chart
  /*var ctx = document.getElementById("tradeChart").getContext("2d");

  var data = {
    labels: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    datasets: [{
      label: "Weekly average",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [65,45,87,25,101,67,89]
    }]
  }

  var options = {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    //legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};
  var lineChart = new Chart(ctx).Line(data,options);*/
});


Template.TradeTemplate.events({
	'click #AvailableTab':function(event,template){
		$("#TradeTab").toggleClass("active","");
		$("#AvailableTab").toggleClass("active");
		$("#AvailableOrders").show();
		$("#TradeTabExplain").hide();
	},
	
	'click #TradeTab':function(event,template){
		$("#AvailableTab").toggleClass("active","");
		$("#TradeTab").toggleClass("active");
		$("#TradeTabExplain").show();
		$("#AvailableOrders").hide();
	},
	
	'click #FullHistory':function(event,template){
		$("#MyTrades").toggleClass("active","");
		$("#FullHistory").toggleClass("active");
		$("#UserHistoryFeed").show();
		$("#UserOrderFeed").hide();
	},
	
	'click #MyTrades':function(event,template){
		$("#FullHistory").toggleClass("active","");
		$("#MyTrades").toggleClass("active");
		$("#UserHistoryFeed").hide();
		$("#UserOrderFeed").show();
	}
	
})
