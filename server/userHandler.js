


Accounts.onCreateUser(function (options, user) {
  var keyPair = bitcoinjs.ECKey.makeRandom();
  options.profile.bitcoinAddress = keyPair.pub.getAddress().toString()
  options.profile.wallet = {BTC:50, 'USD':50000};
  if(options.profile){
    user.profile = options.profile

  }
  //Router.go('/profile' + user.username);
  console.log("CREATED USER", user);
  return user;
});
