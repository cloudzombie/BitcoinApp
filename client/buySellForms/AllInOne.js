Template.allInOneBitcoinForm.onRendered(function(){
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



  var current = $("#currency_type").val();
  Session.set("currency_type",current);
});

Template.allInOneBitcoinForm.helpers({

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
    return current;
  }


});

// This applies the selectpicker library and javascript to work on
// .selectpicker
Template.allInOneBitcoinForm.onRendered(function(){
  $('.selectpicker').selectpicker();
});

Template.allInOneBitcoinForm.events({

  'change #currency_type': function (event,template) {
    var current = $("#currency_type").val();
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

        var buyOsell = template.$("#buy-sell-select").val();
        if(buyOsell === "Buy"){
          if(currUSD > totBuy){
            BuyOrderCollection.insert({username:username,
              BTC:parseFloat(BTCtoBuy),
              price:parseFloat(currBuy),
              USD: parseFloat(totBuy),
              time:currentTime});
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
                time:currentTime});
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
