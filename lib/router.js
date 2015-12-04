

Router.configure({
  layoutTemplate: 'mainLayout'

});


Router.route('/', function(){

  Session.set('amountBTC',0);
  Session.set('amountCurrency',0);
  Session.set('amountBTCSell',0);
  Session.set('amountCurrencySell',0);

  this.render('homePageTemplate');

  this.render('headerTemplate', {
    to: 'header',
    data: function(){
      if(Meteor.user()){
        var username =Meteor.user().username;
        return Meteor.users.findOne({username:username});
      }else{
        return undefined;
      }

    }
  });


  },{name:'home'});

Router.route('/profile/:username', function(){

  //this.layout('mainLayout');

  if(Meteor.user() || Meteor.loggingIn()){
    this.render('profileTemplate');
  }else{
    console.log('a;ldkjf;a');
    Router.go('/');
  }

  this.render('headerTemplate', {
    to: 'header',
    data: function(){
      if(Meteor.user()){
        var username =Meteor.user().username;
        return Meteor.users.findOne({username:username});
      }else{
        return undefined;
      }

    }
  });

},{name:'profile.show'});
