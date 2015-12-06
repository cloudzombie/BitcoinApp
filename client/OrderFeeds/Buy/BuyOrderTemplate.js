Template.BuyOrderFeed.helpers({

  buyOrders: function(){
    return BuyOrderCollection.find({},{sort:{time:-1}},{limit:8});
  }
});
