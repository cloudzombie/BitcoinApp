Template.allInOneBitcoinForm.onCreated(function(){
	//$('input[type=checkbox][data-toggle^=toggle]').bootstrapToggle()
});



Template.allInOneBitcoinForm.onRendered(function(){
	
	$('input[type=checkbox][data-toggle^=toggle]').bootstrapToggle();
	/*console.log("rendered");
	$('.selectpicker').selectpicker();
	let screen_size = Session.get("screen_size") || "normal"
	$('input[type=checkbox]').attr("data-size",screen_size);
	$('input[type=checkbox][data-toggle^=toggle]').bootstrapToggle();*/
	
	$(window).resize(function(){
		console.log("rendered2");
		let screen_width = $(window).width() - 15;
		if(screen_width < 992){
			Session.set("screen_size","small");
		}else if (screen_width >= 992 && screen_width < 1200){
			Session.set("screen_size","normal")
		}else {
			Session.set("screen_size","normal")
		}
		$('input[type=checkbox][data-toggle^=toggle]').bootstrapToggle();
	});
	
  $.validator.addMethod('minMoney', function(param) {
    return param > 0 ? true : false
  });
  $("#allInOneBitcoinForm").validate({
    rules:{
      amountBTC: {
        required: true,
        minMoney: true
      },
      amountCurrency: {
        required: true,
        minMoney: true
      }
    },
    messages: {
      amountBTC: {
        required: "Must enter an amount for BTC",
        minMoney: "Must enter an amount greater than 0"
      },
      amountCurrency: {
        required: "Must enter an amount for BTC",
        minMoney: "Must enter an amount greater than 0"
      }

    }
  });



  var current = $("#currency_type").prop("checked");
	Session.set("form_type","selling");
  Session.set("currency_type",current);
	Session.set("amountCurrency",300);
	Session.set("amountBTC",1);
});

Template.allInOneBitcoinForm.helpers({

	
	/*toggleButton:function(){
		console.log("resize");
		let screen_size = Session.get("screen_size");
		switch(screen_size){
			case "sm":
				$('input[type=checkbox]').attr("data-size","small");
			case "md":
				$('input[type=checkbox]').attr("data-size","normal");
			case "lg":
				$('input[type=checkbox]').attr("data-size","large");
		}
		$('input[type=checkbox][data-toggle^=toggle]').bootstrapToggle();
		
	},*/
	
	button_sm:function(){
		console.log("button_sma");
		let screen_size = Session.get("screen_size");
		if(screen_size === "small"){
			console.log("Screen small!");
			
			return true;
		}else{
			return false;
		}
	},
	
  Totalcurrency:function(){
    var btc = Session.get('amountBTC') || 0;
    var currency = Session.get('amountCurrency') || 0;

    return btc*currency;
  },
  amountBTC:function(){
    return Session.get('amountBTC') || 0;
  },
  amountCurrency: function(){
    return Session.get('amountCurrency') || 0;
  },
  currencyType: function () {
    var current = Session.get("currency_type");
		switch(current){
			case false:
				return "$"
			case true:
				return "Kc"			
			default:
				return "$"
				
		}
  },
	
	formType: function() {
		
		var formType = Session.get("form_type") || "selling";
		return formType;
	}


});

// This applies the selectpicker library and javascript to work on
// .selectpicker

Template.allInOneBitcoinForm.events({
	
	'change #buy-sell-select': function(event,template) {
		var checked = template.$("#buy-sell-select").prop("checked");
		if(checked){
			Session.set("form_type","buying");
			
		}else {
			Session.set("form_type","selling");
		}
	},

  'change #currency_type': function (event,template) {
		
    var current = $("#currency_type").prop("checked");
		console.log(current);
    Session.set("currency_type",current);
  },

  'input #amountBTC': function(event, template){
      var currentNum = event.currentTarget.value;
      Session.set('amountBTC',currentNum);

    },
  'input #amountCurrency': function(event, template){

      var currentNum = event.currentTarget.value;
      Session.set('amountCurrency',currentNum);
    },

   'submit form': function(event,template) {
      event.preventDefault();

      if(Meteor.user()){


        // reactive vs non_reactive
        var BTCtoBuy = Session.get('amountBTC');

        /*var BTCtoBuy = Tracker.nonreactive(function(){
            return Session.get('amountBTC');
        });*/

        var currBuy = Session.get('amountCurrency');
        /*var currBuy = Tracker.nonreactive(function(){
          return Session.get('amountCurrency');
        });*/
        var totBuy = BTCtoBuy*currBuy;


        var username = Meteor.user().username;
        var user = Meteor.users.findOne({username:username});
        var userWallet = user.profile.wallet

        var currUSD = userWallet.USD;

        // Do validation check if user has enough money


        Session.set('amountBTC',0.0);
        Session.set('amountCurrency',0.0);

        var currentTime = Date.now();

        //var buyOsell = template.$("#buy-sell-select").val();
				var buyOsell = "Sell";
				var checked = template.$("#buy-sell-select").prop("checked");
				if(checked){
					buyOsell = "Buy"
				}
				// 4/16/16 change from Buy/Sell Orders to Only BuyOrder
				var timeFormatted = moment(currentTime).format('MMMM Do YYYY, h:mm:ss a');
				
				if(buyOsell === "Buy"){
          if(currUSD > totBuy){
            BuyOrderCollection.insert({username:username,
              BTC:parseFloat(BTCtoBuy),
              price:parseFloat(currBuy),
              USD: parseFloat(totBuy),
							status:"Trading",
              time:currentTime,
							timeformatted:timeFormatted,
							type:"buy"});
          }else{
            alert("Need more money");
          }
        }else{
          if(buyOsell === "Sell"){
            if(userWallet.BTC > BTCtoBuy){
              SellOrderCollection.insert({username:username,
                BTC:parseFloat(BTCtoBuy),
                price:parseFloat(currBuy),
                USD: parseFloat(totBuy),
								status:"Trading",
								timeformatted:timeFormatted,
                time:currentTime,
								type:"sell"});
              }else{
                alert("Need more BTC. Please purchase more BTC");
              }
            }else{
              // Something is wrong
              console.log("buy sell is wrong");
            }
        }

          // Only inserting an order so we only subtract money from players account
          // once a match has been made and processed this is more just like a request
          //*******************************************//
          //*  var newUSD = currUSD - currBuy;
          //*  userWallet.USD = newUSD;
          //* Meteor.users.update({_id:user._id}, {$set:{"profile.wallet":userWallet}});
          // ******************************************
        //  Meteor.call('matchOrders', function(error,result){});
        Meteor.call('matchOrders', function(error,result){});
      }else{
        // TODO put erro into form or do a redirect
        alert('must be logged in');
      }
    }

});
