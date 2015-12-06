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

    // get newest BuyOrderCollection
    console.log(newBuyOrder);
    // TODO if someone post a really low bid then it will stay in front
    // of the 'line' forever unless we make a way to get rid of that.
    // maybe keep track of the amount of times something has been pulled from
    // the list.
    if(newBuyOrder)
    {
      console.log("buy order");
      console.log(newBuyOrder[0]);
      var CurrentBuyOrder = newBuyOrder;
      var requestedBTC = CurrentBuyOrder.BTC;
      var price = CurrentBuyOrder.price;
      // Use requestedBTC, price to search SellOrderCollection for matchOrders
      var sellORderMatch = SellOrderCollection.find({price:{$lte:price},username:{$ne:CurrentBuyOrder.username}},
         {sort:{time:-1}});

      console.log(price);
      console.log("sellORderMatch");
      console.log(sellORderMatch.fetch()[0]);
      var leftToBuyBTC = requestedBTC;
      // TODO figure out which way is less expensive
      // Use foreach or just call each time inside while loop
      while(leftToBuyBTC > 0){
        console.log("sellORderMatch in loop");
        var currentMatch = sellORderMatch.fetch()[0];
        console.log(currentMatch);
        if(currentMatch){
          var currentBTc = currentMatch.BTC
          var amountBought = (leftToBuyBTC - currentBTc) > 0 ? (leftToBuyBTC - currentBTc): leftToBuyBTC;
          var amountSellerLeft = currentBTc - amountBought;


          // Update the sellOrder that sold the BTC
          // if the user that sold the BTC has sold all of their BTC then
          // remove them from the sell order list
          if(amountBought >= currentBTc){
            SellOrderCollection.remove({_id:currentMatch._id});
          }else{
            SellOrderCollection.update({_id:currentMatch._id},{$set:
              {BTC:amountSellerLeft}});
          }
          leftToBuyBTC -= amountBought;
          //Now update the BuyOrder
          console.log(leftToBuyBTC);
          console.log(CurrentBuyOrder);
          if(leftToBuyBTC > 0){
            BuyOrderCollection.update({_id:CurrentBuyOrder._id},{$set:
              {BTC:leftToBuyBTC}});
          }else{
            BuyOrderCollection.remove({_id:CurrentBuyOrder._id});

          }

          // UPDATE THE USERS
          // UPDATE BUYER
          console.log("---------------------------CurrentBuyer:" + CurrentBuyOrder.username);
          Meteor.users.update({username:CurrentBuyOrder.username},{$inc:{"profile.wallet.BTC":amountBought}});

          //UPDATE SELLER
          console.log("---------------------------CurrentSeller:" + currentMatch.username);
          var price = currentMatch.price;
          var updatedUSD = amountBought*price
          console.log("update SELLER");
          console.log(updatedUSD)
          Meteor.users.update({username:currentMatch.username},{$inc:{"profile.wallet.USD":updatedUSD}});


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
