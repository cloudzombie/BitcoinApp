Template.DeleteBuyOrderModal.events({
	'click #cancel_button':function(event,template){
		event.preventDefault();
		
	
		$('.modal').modal('hide');
	}
});


Template.DeleteSellOrderModal.events({
	'click #cancel_button':function(event,template){
		event.preventDefault();
		
	
		$('.modal').modal('hide');
	}
});




Template.DeleteBuyOrderModal.events({
    'submit form':function(events,template){
        events.preventDefault();
        BuyOrderCollection.remove({_id:this.data._id},function(error,result){
						if(error){
								Modal.hide("DeleteBuyOrderModal");
								FlashMessages.sendError("Sorry there was an error creating the Order please try again");
								console.log(error);
						}else{
								FlashMessages.sendSuccess("Deleted Buy Order");
								Modal.hide("DeleteBuyOrderModal");
						}
				});
    }
});

Template.DeleteSellOrderModal.events({
    'submit form':function(events,template){
			console.log(this.data);
			events.preventDefault();
			console.log(this.data);
			console.log(this.data._id);
			SellOrderCollection.remove({_id:this.data._id},function(error,result){
					if(error){
							console.log(error);
					}else{
							FlashMessages.sendSuccess("Dseleted Sell Order");
							Modal.hide("DeleteSellOrderModal");
					}
			});

			//Meteor.call("deleteBuyOrder",this.data._id);
    }
});
