Template.userAccountTemplate.helpers({
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


Template.sideBarUserTemplate.onRendered(function(){

    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

});
