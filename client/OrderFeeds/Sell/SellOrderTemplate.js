Template.SellOrderFeed.helpers({

  sellOrders: function(){
    let orders =  SellOrderCollection.find({},{sort:{time:-1}},{limit:8}).fetch();
		if(orders.length == 0){
			return null;
		}else{
			return orders;
		}
  }
});


Template.SellOrderFeed.events({
    'click #sellOrderItem':function(event,template){
        if(Meteor.user()){
						
					var username = Meteor.user().username;
					var sellingUsername = this.username;
					if(username === sellingUsername){
						Modal.show("DeleteSellOrderModal",{data:this});
					}else{
						Modal.show("SellOrderModal",{data:this});
					}
        }
    }
});