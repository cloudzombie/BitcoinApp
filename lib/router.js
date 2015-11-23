Router.route('/', function(){

  this.layout('mainLayout');

  this.render('homePageTemplate');

  this.render('headerTemplate', {
    to: 'header',
    data: function(){
      if(Meteor.user()){
        console.log(Meteor.user().username);
        var username =Meteor.user().username;
        return Meteor.users.findOne({username:username});
      }else{
        return undefined;
      }

    }
  });
  },{name:'home'});

Router.route('/profile/:username', function(){

  this.layout('mainLayout');

  this.render('profileTemplate');

  this.render('headerTemplate', {to: 'header'});

},{name:'profile.show',controller:'ProfileController'});


ProfileController = RouteController.extend({
  onAfteraction: function(){
    this.next();
  }

});

var mustBeSignedIn = function(pause) {
  if(!(Meteor.user() || Meteor.loggingIn())) {
    Router.go('/')
  } else {
    this.next();
  }
}

//Router.onBeforeAction(mustBeSignedIn);
