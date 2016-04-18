Template.SellOrderModal.onRendered(function(){
	const sellerBTC = this.data.data.BTC;
  $.validator.addMethod('minMoney', function(param) {
    return param > 0 ? true : false
  });
	
	$.validator.addMethod('maxMoney', function(param) {
    return param < buyerBTC ? true : false
  });
  $("#SellOrderModalForm").validate({
    rules:{
      btcAmount: {
        required: true,
        minMoney: true,
				maxMoney: true
      },
     
    },
    messages: {
      btcAmount: {
        required: "Must enter an amount for BTC",
        minMoney: "Must enter an amount greater than 0",
				maxMoney: "You cant buy more then what the seller wants"
      }

    }
  });

});


Template.SellOrderModal.events({
		'submit form':function(events,template){
				events.preventDefault();
				console.log(this);
				
				var BTC = $("#btcAmount").val();
				var USD = this.data.USD;
				var price = this.data.price;
        var currentTime = Date.now();
				var username = Meteor.user().username;
				console.log(BTC);
				console.log(this);
				BuyOrderCollection.insert({
						username:username,
						BTC:BTC,
						USD:USD,
						price:price,
						time:currentTime
						
				},function(error,result){
						if(error){
								Modal.hide("SellOrderModal");
								FlashMessages.sendError("Sorry there was an error creating the Order please try again");
						}else{
								Modal.hide("SellOrderModal");
								FlashMessages.sendSuccess("You created a new order");
						}
				});
		}
});