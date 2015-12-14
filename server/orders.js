Meteor.methods({

  deleteBuyOrder: function(_id){
    console.log('server deleteBuyOrder');
    BuyOrderCollection.remove({_id:_id});
  }
});
