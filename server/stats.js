Meteor.methods({

  getCurrentStats: function (argument) {
    // body...

    var latestTrade = HistoryOrderCollection.find({},{sort:{time:-1},limit:1}).fetch();
    console.log("latestTrade");
    console.log(latestTrade);
    var latestPrice = latestTrade[0].Price;
    // get day/week history
    var distanceOfDay = Date.now()/1000 - 24*60*60
    var distanceOfWeek = Date.now()/1000 - 7*24*60*60
  //  var todaysHistory = HistoryOrderCollection.find({time:{$gt:distanceOfDay}}).fetch();
  //  var weeksHistory = HistoryOrderCollection.find({time:{$gt:distanceOfWeek}}).fetch();

    // todays High
    var todaysHigh = HistoryOrderCollection.find({time:{$gt:distanceOfDay}},{sort:{time:-1},limit:-1}).fetch();

    // weeks High
    var weeksHigh = HistoryOrderCollection.find({time:{$gt:distanceOfWeek}},{sort:{time:-1},limit:-1}).fetch();

    // calculate the averages
    var todaysAverage = HistoryOrderCollection.aggregate([{$group:{_id:null,dailyAvg:{$avg:"$Price"}}}]);
    var weeksAverage = HistoryOrderCollection.aggregate([{$group:{_id:null,weeksAvg:{$avg:"$Price"}}}]);

    var currentStats = {};
    currentStats["latestPrice"] = latestPrice;
    currentStats["todaysHigh"] = todaysHigh[0].Price;
    currentStats["weeksHigh"] = weeksHigh[0].Price;
    currentStats["todaysAverage"] = todaysAverage[0].dailyAvg.toPrecision(4);
    currentStats["weeksAverage"] = weeksAverage[0].weeksAvg.toPrecision(4);

    return currentStats;

  }

});
