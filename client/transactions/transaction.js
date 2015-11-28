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
      var username = Meteor.user().username;
      var BTCtoBuy = Session.get('amountBTC');
      var currBuy = Session.get('amountCurrency');
      var totBuy = BTCtoBuy*currBuy;
      BuyOrders.insert({username:username,
        BTC:BTCtoSell,
        price:currSell,
        USD: totSell});
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
      var BTCtoSell = Session.get('amountBTCSell');
      var currSell = Session.get('amountCurrencySll');
      var totSell = BTCtoSell*currSell;
      SellOrders.insert({username:username,
        BTC:BTCtoSell,
        price:currSell,
        USD: totSell});
    }else{
      // TODO put erro into form or do a redirect
      alert('must be logged in');
    }
  }

});
