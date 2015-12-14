SellOrderCollection = new Mongo.Collection('SellOrderCollection');
BuyOrderCollection = new Mongo.Collection('BuyOrderCollection');

// Collection of the form {buyer:'',seller:'',BTCSold:0,Price:0,time:}
HistoryOrderCollection = new Mongo.Collection('HistoryOrderCollection');

if(Meteor.isClient){
  //Subscribe to all Orders
}

if(Meteor.isServer){
  //handle updates
}
