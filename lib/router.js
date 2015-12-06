

Router.configure({
  layoutTemplate: 'mainLayout'

});


Router.route('/', function(){

  Session.set('amountBTC',0.0);
  Session.set('amountCurrency',0.0);
  Session.set('amountBTCSell',0.0);
  Session.set('amountCurrencySell',0.0);

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

Router.route('/trade/:username', function(){

  Session.set('amountBTC',0.0);
  Session.set('amountCurrency',0.0);
  Session.set('amountBTCSell',0.0);
  Session.set('amountCurrencySell',0.0);

  this.layout('sideBarUserTemplate');

  if(Meteor.user() || Meteor.loggingIn()){
    this.render('TradeTemplate',{
      data: function(){
        return {username:this.params.username}
      }
    });
  }else{
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

},{name:'trade.show'});

Router.route('/profile/:username', function(){

  this.layout('sideBarUserTemplate');

  if(Meteor.user() || Meteor.loggingIn()){
    this.render('userAccountTemplate',{
      data: function(){
        return {username:this.params.username}
      }
    });
  }else{
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
