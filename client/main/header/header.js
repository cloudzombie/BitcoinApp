Template.headerTemplate.events({

});

Template.headerTemplate.colorOnChange = function() {

}

Template.headerTemplate.helpers({

  username: function(){
    return Meteor.user().username
  },
  walletBTC: function(){
    $("#walletBTC").effect('highlight');

    return Meteor.user().profile.wallet.BTC;
  },
  walletUSD: function(){
    $("#walletUSD").effect('highlight');
    return Meteor.user().profile.wallet.USD;
  }
});
