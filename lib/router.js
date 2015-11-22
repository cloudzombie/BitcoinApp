Router.route('/', function(){

  name:'home',

  this.layout('mainLayout');

  this.render('homePageTemplate');

  this.render('headerTemplate', {to: 'header'});

});

Router.route('/profile:_id', function(){

  name: "profile.show",

  this.layout('mainLayout');

  this.render('profileTemplate');

  this.render('headerTemplate', {to: 'header'});
});

var mustBeSignedIn = function(pause) {
  if(!(Meteor.user() || Meteor.loggingIn())){
    Router.go('/profile/' + Meteor.user());
  }else{
    this.next();
  }
}

var goToProfile = function(pause) {
  console.log("hey");
  if (Meteor.user()){
    Router.go('/profile/' + Meteor.user());
  }else{
    this.next();
  }
}

Router.onBeforeAction(goToProfile,{only: ['home']});
