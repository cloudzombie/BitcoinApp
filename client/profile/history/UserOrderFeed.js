Template.UserOrderFeed.helpers({
	userOrdes:function(){
		let user = Meteor.user().username;
		let currentBuyOrders = BuyOrderCollection.find({username:user}).fetch();
		let currentSellOrders = SellOrderCollection.find({username:user}).fetch();
		let UserOrders = currentBuyOrders.concat(currentSellOrders);
		return _.sortBy(UserOrders,function(order){return order.time});
	}
})