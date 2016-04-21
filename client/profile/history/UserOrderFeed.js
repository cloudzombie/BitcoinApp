Template.UserOrderFeed.helpers({
	userOrders:function(){
		let user = Meteor.user().username;
		console.log(user);
		let currentBuyOrders = BuyOrderCollection.find({username:user}).fetch();
		let currentSellOrders = SellOrderCollection.find({username:user}).fetch();
		let UserOrders = currentBuyOrders.concat(currentSellOrders);
		return _.sortBy(UserOrders,function(order){return order.time});
	}
});

Template.UserOrder.events({
	'click #userTrade':function(event,template){
		Router.go('order.history',{_id:this._id});
	}
});