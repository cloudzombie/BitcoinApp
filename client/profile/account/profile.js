Template.userAccountTemplate.helpers({
  username: function(){
    return Meteor.user().username || "";
  },
  emailAddress: function () {
    return Meteor.user().email || "N/A";
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
