Template.profileTemplate.helpers({
  username: function(){
    return Meteor.user().username;
  },
  bitcoinAddress: function(){
    return Meteor.user().profile.bitcoinAddress;
  },
  wallet: function(){
    return Meteor.user().profile.wallet;
  }

});
