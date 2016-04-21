Template.OrderHistory.helpers({
	
	order:()=>{
		
		let id = Router.current().params._id;
		
		let userBuyOrder = BuyOrderCollection.find({_id:id}).fetch();
		let userSellOrder = SellOrderCollection.find({_id:id}).fetch();
		console.log(userBuyOrder.length);
		console.log(userSellOrder);
		if(userBuyOrder.length > 0){
			console.log("ya");
			return userBuyOrder[0];
			
		}else if(userSellOrder.length > 0){
			return userSellOrder;
		}
	},
	
	orderHistory:()=>{
		let id = Router.current().params._id;
		
		let userBuyOrder = BuyOrderCollection.find({_id:id}).fetch();
		let userSellOrder = SellOrderCollection.find({_id:id}).fetch();
		console.log(userBuyOrder.length);
		console.log(userSellOrder);
		if(userBuyOrder.length > 0){
			let order_id = userBuyOrder[0]._id;
			return HistoryOrderCollection.find({BuyOrderID:order_id});
			
		}else if(userSellOrder.length > 0){
			let order_id = userSellOrder[0]._id;
			return HistoryOrderCollection.find({SellOrderID:order_id});
			
		}
		
	}
});

