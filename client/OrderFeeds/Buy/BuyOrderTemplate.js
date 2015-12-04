Template.BuyOrderFeed.helpers({

  buyOrders: function(){
    return BuyOrderCollection.find({});
  }
});
