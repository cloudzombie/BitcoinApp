if(Meteor.isServer){

  Meteor.startup(function(){
    if(SellOrderCollection.find().count() === 0){
      SellOrderCollection.insert({
        username: 'testUser6',
        price: 325,
        BTC: 1,
        USD: 325,
        time: Date.now()
      });
    }

    if(BuyOrderCollection.find().count() === 0){
      BuyOrderCollection.insert({
        username: 'testUser5',
        price: 310,
        BTC: 1,
        USD: 310,
        time:Date.now()
      });
    }
  });
}
