SellOrders = new Mongo.Collection('SellOrders');
BuyOrders = new Mongo.Collection('BuyOrders');

if(Meteor.isClient){
  //Subscribe to all Orders
}

if(Meteor.isServer){
  //handle updates
}
