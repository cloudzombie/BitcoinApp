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

      var BTCtoBuy = Session.get('amountBTC');
      var currBuy = Session.get('amountCurrency');
      var totBuy = BTCtoBuy*currBuy;


      var username = Meteor.user().username;
      var user = Meteor.users.findOne({username:username});
      var userWallet = user.profile.wallet

      var currUSD = userWallet.USD;

      // Do validation check if user has enough money
      if(currUSD > totBuy){

        var currentTime = Date.now();

        BuyOrderCollection.insert({username:username,
          BTC:Number(BTCtoBuy),
          price:Number(currBuy),
          USD: Number(totBuy),
          time:currentTime});
        var newUSD = currUSD - currBuy;
        userWallet.USD = newUSD;


        Meteor.users.update({_id:user._id}, {$set:{"profile.wallet":userWallet}});
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
      var BTCtoSell = Session.get('amountBTCSell');

      var currSell = Session.get('amountCurrencySell');
      var totSell = BTCtoSell*currSell;

      // do validation allow sell order only if user
      // has sufficient BTC
      if(BTCtoSell <= currBTC){
        var currentTime = Date.now();
        SellOrderCollection.insert({username:username,
          BTC:Number(BTCtoSell),
          price:Number(currSell),
          USD: Number(totSell),
          time: currentTime});

        //TODO only update user wallet and post new order once everything
        // has been checked and is valid
        var newBTC = currBTC - BTCtoSell;
        userWallet.BTC = newBTC;
        Meteor.call('matchOrders', function(error,result){});
        Meteor.users.update({_id:user._id}, {$set:{"profile.wallet":userWallet}});
      }else{
        alert("you dont have sufficient Bitcoins :(");
      }
    }else{
      alert('must be logged in');
    }


      // TODO put erro into form or do a redirect

  }

});
