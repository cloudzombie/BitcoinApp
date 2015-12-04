Template.SellOrderFeed.helpers({

  sellOrders: function(){
    return SellOrderCollection.find({});
  }
});
