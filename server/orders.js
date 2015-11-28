if(Meteor.isServer){

  Meteor.startup(function(){
    if(SellOrders.find().count() === 0){
      SellOrders.insert({
        username: 'testUser6',
        price: 325,
        BTC: 1,
        USD: 325
      });
    }

    if(BuyOrders.find().count() === 0){
      BuyOrders.insert({
        username: 'testUser5',
        price: 310,
        BTC: 1,
        USD: 310
      });
    }
  });
}
