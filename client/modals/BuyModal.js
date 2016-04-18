Template.BuyOrderModal.onRendered(function(){
	const buyerBTC = this.data.data.BTC;
  $.validator.addMethod('minMoney', function(param) {
    return param > 0 ? true : false
  });
	
	$.validator.addMethod('maxMoney', function(param) {
    return param < buyerBTC ? true : false
  });
  $("#BuyOrderModalForm").validate({
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
				maxMoney: "You cant sell more then what the buyer wants"
      }

    }
  });

});




Template.BuyOrderModal.events({
		'submit form':function(events,template){
				events.preventDefault();
				
				
				var BTC = $("#btcAmount").val();
				var USD = this.data.USD;
				var price = this.data.price;
        var currentTime = Date.now();
				var username = Meteor.user().username;

				// This is sell order collection because if someone clicks on a
				// buy order that means they are responding to someones desire to
				// Buy. So they want to sell to that buyer
					
				SellOrderCollection.insert({
						username:username,
						BTC:BTC,
						USD:USD,
						price:price,
						time:currentTime
						
				},function(error,result){
						if(error){
								Modal.hide("BuyOrderModal");
								FlashMessages.sendError("Sorry there was an error creating the Order please try again");
						}else{
								Modal.hide("BuyOrderModal");
								FlashMessages.sendSuccess("You created a new order");
						}
				});
		}
});