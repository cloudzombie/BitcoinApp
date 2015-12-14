
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
});
Template.buyingBitcoinForm.onRendered(function(){
  $.validator.addMethod('minMoney', function(param) {
    return param > 0 ? true : false
  });
  $("#buyingBitcoinForm").validate({
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
});

Template.sellingBitcoinForm.onRendered(function(){
  $.validator.addMethod('minMoneySell', function(param) {
    return param > 0 ? true : false
  });
  $("#sellingBitcoinForm").validate({
    rules:{
      amountBTCSell: {
        required: true,
        minMoneySell: true
      },
      amountCurrencySell: {
        required: true,
        minMoneySell: true
      }
    },
    messages: {
      amountBTCSell: {
        required: "Must enter an amount for BTC",
        minMoney: "Must enter an amount greater than 0"
      },
      amountCurrencySell: {
        required: "Must enter an amount for BTC",
        minMoney: "Must enter an amount greater than 0"
      }

    }
  });
});

Template.allInOneBitcoinForm.helpers({

  Totalcurrency:function(){
    var btc = Session.get('amountBTC');
    var currency = Session.get('amountCurrency');

    return btc*currency;
  },
  amountBTC:function(){
    return Session.get('amountBTC');;
  },
  amountCurrency: function(){
    return Session.get('amountCurrency');
  },


});

// This applies the selectpicker library and javascript to work on
// .selectpicker
Template.allInOneBitcoinForm.onRendered(function(){
  $('.selectpicker').selectpicker();
});

Template.allInOneBitcoinForm.events({

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

Template.buyingBitcoinForm.events({

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
      if(currUSD > totBuy){

        Session.set('amountBTC',0.0);
        Session.set('amountCurrency',0.0);
        Session.set('amountBTCSell',0.0);
        Session.set('amountCurrencySell',0.0);

        var currentTime = Date.now();

        BuyOrderCollection.insert({username:username,
          BTC:parseFloat(BTCtoBuy),
          price:parseFloat(currBuy),
          USD: parseFloat(totBuy),
          time:currentTime});

        // Only inserting an order so we only subtract money from players account
        // once a match has been made and processed this is more just like a request
        //*******************************************//
        //*  var newUSD = currUSD - currBuy;
        //*  userWallet.USD = newUSD;
        //* Meteor.users.update({_id:user._id}, {$set:{"profile.wallet":userWallet}});
        // ******************************************
        Meteor.call('matchOrders', function(error,result){});
      }else{
        // TODO create cleaner alert of course :(
        alert("you need more money :(");
      }
    }else{
      // TODO put erro into form or do a redirect
      alert('must be logged in');
    }
  }
});

Template.sellingBitcoinForm.events({

'input #amountBTCSell': function(event, template){
    var currentNum = event.currentTarget.value;
    Session.set('amountBTCSell',currentNum);

  },
  'input #amountCurrencySell': function(event, template){

    var currentNum = event.currentTarget.value;
    Session.set('amountCurrencySell',currentNum);
  },

  'submit form': function(event,template) {
    event.preventDefault();
    if(Meteor.user()){
      var username = Meteor.user().username;
      var user = Meteor.users.findOne({username:username});
      var userWallet = user.profile.wallet

      var currBTC =user.profile.wallet.BTC;
      var BTCtoSell = Tracker.nonreactive(function(){
        return Session.get('amountBTCSell');
      });
      var currSell = Tracker.nonreactive(function(){
        return Session.get('amountCurrencySell');
      });
      var totSell = BTCtoSell*currSell;

      // do validation allow sell order only if user
      // has sufficient BTC
      if(BTCtoSell <= currBTC){
        Session.set('amountBTC',0.0);
        Session.set('amountCurrency',0.0);
        Session.set('amountBTCSell',0.0);
        Session.set('amountCurrencySell',0.0);
        var currentTime = Date.now();
        SellOrderCollection.insert({username:username,
          BTC:parseFloat(BTCtoSell),
          price:parseFloat(currSell),
          USD: parseFloat(totSell),
          time: currentTime});


    // Only inserting an order so we only subtract money from players account
    // once a match has been made and processed this is more just like a request
    //*******************************************//
    //*  var newBTC = currBTC - BTCtoSell;
    //*  userWallet.BTC = newBTC;
    //*  Meteor.users.update({_id:user._id}, {$set:{"profile.wallet":userWallet}});
    // ******************************************


        Meteor.call('matchOrders', function(error,result){});
      }else{
        alert("you dont have sufficient Bitcoins :(");
      }
    }else{
      alert('must be logged in');
    }


      // TODO put erro into form or do a redirect

  }

});


Template.buyingBitcoinForm.helpers({

  Totalcurrency:function(){
    var btc = Session.get('amountBTC');
    var currency = Session.get('amountCurrency');

    return btc*currency;
  },
  amountBTC:function(){
    return Session.get('amountBTC');;
  },
  amountCurrency: function(){
    return Session.get('amountCurrency');
  },


});

Template.sellingBitcoinForm.helpers({

  TotalBTC:function(){
    var btc = Session.get('amountBTCSell');
    var currency = Session.get('amountCurrencySell');
    console.log(btc*currency);

    return btc*currency;
  },
  amountBTCSell:function(){
    return Session.get('amountBTCSell');;
  },
  amountCurrencySell: function(){
    return Session.get('amountCurrencySell');
  }

});
