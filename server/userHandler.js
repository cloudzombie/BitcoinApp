


Accounts.onCreateUser(function (options, user) {
  var keyPair = bitcoinjs.ECKey.makeRandom();
  options.profile.bitcoinAddress = keyPair.pub.getAddress().toString()
  if(options.profile){
    user.profile = options.profile

  }
  Router.go('/profile' + user.username);
  console.log("CREATED USER", user);
  return user;
});
