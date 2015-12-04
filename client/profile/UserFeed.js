Template.UserBuyOrderFeed.helpers({

  userBuyOrders: function(){
    return BuyOrderCollection.find({username:Meteor.user().username});
  }
});

Template.UserSellOrderFeed.helpers({

  userSellOrders: function(){
    return SellOrderCollection.find({username:Meteor.user().username});
  }
});
