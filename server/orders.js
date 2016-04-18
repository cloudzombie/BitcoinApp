Meteor.methods({

  // method for removing a buy order
  deleteBuyOrder: function(_id){
    console.log('server deleteBuyOrder');
    BuyOrderCollection.remove({_id:_id});
  },
	
	deleteSellOrder:function(_id){
			
	}
      
});
