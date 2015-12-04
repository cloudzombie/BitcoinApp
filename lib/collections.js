SellOrderCollection = new Mongo.Collection('SellOrderCollection');
BuyOrderCollection = new Mongo.Collection('BuyOrderCollection');

if(Meteor.isClient){
  //Subscribe to all Orders
}

if(Meteor.isServer){
  //handle updates
}
