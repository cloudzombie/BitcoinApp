//***** NEW SCHEMA **********//
// 	ONLY One Order Collection//
// 	Username
//  TYPE: "BUY or SELL"
// 	Status: "Completed,Trading or Cancelled"
// 	BTC
// 	price
// 	USD
// 	time

// TODOS to make full data structure change
// 1. When submiting change everything to make proper inserts
// 2. Change "Feeds" so that they still look the same
// 3. Change all places where any editing or canceling need to be done
// 4. Change the history collection
// 5. Change all the necessary logic in the Order matching section

// Or maybe I could not be a dumbass and just add a status attribue
// the the buy/sell orders 
// TODOS
// 1. Change insert - check
// 2. Change history collection check
// 3. Change logic during trades to update "status" - Instead of removing buy/sell orders
// just change status to completed. check
// 4. Then on front page and during mathing only user orders
// with a status of Trading 

OrderCollection = new Mongo.Collection('OrderCollection');



SellOrderCollection = new Mongo.Collection('SellOrderCollection');

//**** SCHEMA ***//
// BTC 
// price
// USD
// time
// username
// status - "Added 4/16/16"
// type - Added 4/17/16
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
