Template.SellOrderFeed.helpers({

  sellOrders: function(){
    return SellOrderCollection.find({},{sort:{time:-1}},{limit:8});
  }
});
