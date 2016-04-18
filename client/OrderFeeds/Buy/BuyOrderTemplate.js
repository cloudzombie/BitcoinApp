Template.BuyOrderFeed.helpers({

  buyOrders: function(){
		let orders = BuyOrderCollection.find({},{sort:{time:-1}},{limit:8}).fetch();
		
		if(orders.length == 0){
			return null;
		}else{
			return orders;
		}
  }
});


Template.BuyOrderFeed.events({
    'click #buyOrderItem':function(event,template){
        if(Meteor.user()){
            var username = Meteor.user().username;
            var sellingUsername = this.username;
					
            if(username === sellingUsername){
							Modal.show("DeleteBuyOrderModal",{data:this});
            }else{
							Modal.show("BuyOrderModal",{data:this});
						}
            
        }
    }
});
