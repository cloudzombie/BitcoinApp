//***** NEW SCHEMA **********//
// 	ONLY One Order Collection//
// 	Username
//  TYPE: "BUY or SELL"
// 	Status: "Completed,Pending or Cancelled"
// 	BTC
// 	price
// 	USD
// 	time

SellOrderCollection = new Mongo.Collection('SellOrderCollection');

//**** SCHEMA ***//
// BTC 
// price
// USD
// time
BuyOrderCollection = new Mongo.Collection('BuyOrderCollection');

// **** SCHEMA ***//
// Buyer
// Seller 
// BTC
// Price
// Total 
// timeFormatted
// time
// id of order that was either bought or sold from 

HistoryOrderCollection = new Mongo.Collection('HistoryOrderCollection');

if(Meteor.isClient){
  //Subscribe to all Orders
	
}

if(Meteor.isServer){
  SellOrderCollection.after.insert(function(){
		Meteor.call('matchOrders', function(error,result){});
	});
	
	BuyOrderCollection.after.insert(function(){
		Meteor.call('matchOrders', function(error,result){});
	});
	
	Meteor.users.after.insert(function(userId,doc){
		
		Accounts.sendVerificationEmail(doc._id);
		Email.send({
			from:"testmyapp12345678@gmail.com",
			to:doc.emails[0].address,
			replyTo:"testmyapp12345678@gmail.com",
			subject:"Welcome to Bitchange",
			text:"Are you ready to get rich and get all the ladies?"
		});
		console.log("USER DOC!!!!");
		console.log(doc.emails[0].address);
		console.log(doc);
	});
}
