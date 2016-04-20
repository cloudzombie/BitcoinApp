Meteor.methods({


  matchOrders: function(){
    var newBuyOrder = BuyOrderCollection.find({},{sort:{time:1}}).fetch();
    newBuyOrder.forEach(function(order){
      Meteor.call('findMatch',order,function(error,result){
        console.log(order);
      });
    });

  },

  findMatch: function(newBuyOrder){

    //var newBuyOrder = BuyOrderCollection.find({},{sort:{time:1}}).fetch()[0];
    // get newest BuyOrderCollection
    console.log(newBuyOrder);
    // TODO if someone post a really low bid then it will stay in front
    // of the 'line' forever unless we make a way to get rid of that.
    // maybe keep track of the amount of times something has been pulled from
    // the list.
    if(newBuyOrder)
    {
      
      var CurrentBuyOrder = newBuyOrder;
      var requestedBTC = CurrentBuyOrder.BTC;
      var price = CurrentBuyOrder.price;
      // Use requestedBTC, price to search SellOrderCollection for matchOrders
      var sellORderMatch = SellOrderCollection.find({price:{$lte:price},username:{$ne:CurrentBuyOrder.username}},
         {sort:{time:-1}});

    
      var leftToBuyBTC = requestedBTC;
      // TODO figure out which way is less expensive
      // Use foreach or just call each time inside while loop
      while(leftToBuyBTC > 0){
       
        var currentMatch = sellORderMatch.fetch()[0];
       
        if(currentMatch){
          var currentBTc = currentMatch.BTC
          var amountBought = (leftToBuyBTC - currentBTc) > 0 ? (leftToBuyBTC - currentBTc): leftToBuyBTC;
          var amountSellerLeft = currentBTc - amountBought;


          // Update the sellOrder that sold the BTC
          // if the user that sold the BTC has sold all of their BTC then
          // remove them from the sell order list
          if(amountBought >= currentBTc){
						// 4/17/16 change from remove to update status to completed
            // SellOrderCollection.remove({_id:currentMatch._id});
						SellOrderCollection.update({_id:currentMatch._id},{$set:{status:"completed"}});
          }else{
            SellOrderCollection.update({_id:currentMatch._id},{$set:
              {BTC:amountSellerLeft}});
          }
          leftToBuyBTC -= amountBought;
          //Now update the BuyOrder
          
          if(leftToBuyBTC > 0){
            BuyOrderCollection.update({_id:CurrentBuyOrder._id},{$set:
              {BTC:leftToBuyBTC}});
          }else{
						// 4/17/16 change from remove to update status to completed
            //BuyOrderCollection.remove({_id:CurrentBuyOrder._id});
						BuyOrderCollection.update({_id:CurrentBuyOrder._id},{$set:{status:"completed"}});

          }
          // BOTH BUYER and SELLER use the same following variables
          //var amountBought - already defined above
          var price = currentMatch.price;
          var updatedUSD = amountBought*price;
          // UPDATE THE USERS
          // UPDATE BUYER
          console.log("---------------------------CurrentBuyer:" + CurrentBuyOrder.username);
          // Increase buyer wallet.BTC by amount of BTC bought
          // Decrease buyer wallet.Currency by how much the BTC cost
          Meteor.users.update({username:CurrentBuyOrder.username},{$inc:{"profile.wallet.BTC":amountBought,
          "profile.wallet.USD":-updatedUSD}});

          //UPDATE SELLER
          console.log("---------------------------CurrentSeller:" + currentMatch.username);
          // Decrease seller wallet.BTC by amount of BTC sold
          // Increase seller wallet.Currency by how much BTC sold * price

          Meteor.users.update({username:currentMatch.username},{$inc:{"profile.wallet.USD":updatedUSD,
          "profile.wallet.BTC":-amountBought}});

          // A successful transaction has occured so now we can add the HistoryOrderCollection
          var buyer = CurrentBuyOrder.username;
          var seller = currentMatch.username;
          var amountBought = amountBought;
          var price = price;
          var time = Date.now();

          var timeFormatted = moment(time).format('MMMM Do YYYY, h:mm:ss a');
					// Add buy/sell order ids to history collection in order to be able to look at the history of a 
					// Specific order
          HistoryOrderCollection.insert({"buyer":buyer,"seller":seller,"BTC":amountBought,
																				 "Price":price,"Total":updatedUSD,"timeFormatted":timeFormatted,"time":time,
																				"BuyOrderID":CurrentBuyOrder._id,"SellOrderID":currentMatch._id});


        }else{
          leftToBuyBTC = -1;
          console.log("no match");
        }
      }
    }else{
      console.log('no buy orders');
    }

    /*sellORderMatch.forEach(function(order){
      console.log(order);
    });*/
  }
});
