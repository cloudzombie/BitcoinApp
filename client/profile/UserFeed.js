Template.UserBuyOrderFeed.helpers({

  userBuyOrders: function(){
    return BuyOrderCollection.find({username:this.username},
      {sort:{time:-1}},{limit:8});
  }
});

Template.userBuyOrder.events({
  'click #deleteOrder': function(evt,template){
    evt.preventDefault();
    console.log(this);
    Meteor.call('deleteBuyOrder',this._id,function(error,result){
      console.log('deletOrder called');
    });
  }
});

Template.UserSellOrderFeed.helpers({

  userSellOrders: function(){
    return SellOrderCollection.find({username:this.username},
      {sort:{time:-1}},{limit:8});
  }
});
