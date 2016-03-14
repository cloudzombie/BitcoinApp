Template.WalletTemplate.helpers({
  username: function(){
    return Meteor.user().username || "";
  },
  emailAddress: function () {
    return Meteor.user().email || "";
  },
  bitcoinAddress: function(){
    return Meteor.user().profile.bitcoinAddress || "";
  },
  BTC: function(){
    return Meteor.user().profile.wallet.BTC || "";
  },
  USD: function () {
    return Meteor.user().profile.wallet.USD || "";
  }

});
