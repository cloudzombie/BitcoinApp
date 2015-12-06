Template._loginButtonsAdditionalLoggedInDropdownActions.events({
  'click #go-to-account': function(event) {
    var username = Meteor.user().username
    Router.go('/profile/' + username);
  }
});
