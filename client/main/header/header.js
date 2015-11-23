Template.headerTemplate.events({

});

Template.headerTemplate.helpers({
  
  username: function(){
    return Meteor.user().username
  }
})
