

Router.configure({
  layoutTemplate: 'mainLayout'

});

Router.route('/signup',function() {
  this.render("CreateAccountTemplate");
},{name:'signup'});

Router.route('/login',function() {
  this.render("LoginTemplate");
  // body...
},{name:'login'});


Router.route('/about', function(){

  this.render('aboutTemplate');

},{name:'about'});


Router.route('/', function(){
  this.render('homePageTemplate');


  },{name:'home'});

Router.route('/history/:username', function(){

  this.layout('sideBarUserTemplate');

  if(Meteor.user() || Meteor.loggingIn()){
    this.render('HistoryPage',{
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

},{name:'history.show'});

Router.route('/trade/:username', function(){

  Session.set('amountBTC',0.0);
  Session.set('amountCurrency',0.0);
  Session.set('amountBTCSell',0.0);
  Session.set('amountCurrencySell',0.0);

  if(Meteor.user() || Meteor.loggingIn()){
    this.render('TradeTemplate',{
      data: function(){
        return {username:this.params.username}
      }
    });
  }else{
    Router.go('/');
  }

},{name:'trade'});

Router.route('/profile/:username', function(){

  if(Meteor.user() || Meteor.loggingIn()){
    this.render('userAccountTemplate',{
      data: function(){
        return {username:this.params.username}
      }
    });
  }else{
    Router.go('/');
  }

},{name:'profile'});
