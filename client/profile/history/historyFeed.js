Template.HistoryFeedTemplate.helpers({

  historyOrders: function(){
    var username = Meteor.user().username;
    return HistoryOrderCollection.find({$or:[{"seller":username},
    {"buyer":username}]},{sort:{time:-1}},{limit:8});
  }
});
