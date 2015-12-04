Template.headerTemplate.events({

});

Template.headerTemplate.helpers({

  username: function(){
    return Meteor.user().username
  },
  wallet: function(){
    return Meteor.user().profile.wallet;
  }
});
