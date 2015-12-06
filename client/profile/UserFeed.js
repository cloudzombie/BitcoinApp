Template.UserBuyOrderFeed.helpers({

  userBuyOrders: function(){
    return BuyOrderCollection.find({username:this.username},
      {sort:{time:-1}},{limit:8});
  }
});

Template.UserSellOrderFeed.helpers({

  userSellOrders: function(){
    return SellOrderCollection.find({username:this.username},
      {sort:{time:-1}},{limit:8});
  }
});
