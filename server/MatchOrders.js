Meteor.methods({

  matchOrders: function(){

    // get newest BuyOrderCollection
    var newBuyOrder = BuyOrderCollection.find({},{sort:{time:-1,limit:1}}).fetch();
    // TODO if someone post a really low bid then it will stay in front
    // of the 'line' forever unless we make a way to get rid of that.
    // maybe keep track of the amount of times something has been pulled from
    // the list.
    console.log('buyorder' + newBuyOrder);
    var CurrentBuyOrder = newBuyOrder[0];
    var requestedBTC = CurrentBuyOrder.BTC;
    var price = CurrentBuyOrder.price;
    // Use requestedBTC, price to search SellOrderCollection for matchOrders
    var sellORderMatch = SellOrderCollection.find({price:{$lte:price}},
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
          SellOrderCollection.remove({_id:currentMatch._id});
        }else{
          SellOrderCollection.update({_id:currentMatch._id},{price:amountSellerLeft},{upsert:false});
        }

        //Now update the BuyOrder

        if(leftToBuyBTC > 0){
          BuyOrderCollection.update({_id:CurrentBuyOrder._id},{BTC:leftToBuyBTC},{upsert:false});
        }else{
          BuyOrderCollection.remove({_id:CurrentBuyOrder._id});

        }

        // UPDATE THE USERS
        // UPDATE BUYER
        console.log("---------------------------CurrentBuyer:" + CurrentBuyOrder.username);
        Meteor.users.update({username:CurrentBuyOrder.username},{$inc:{"profile.wallet.BTC":amountBought}});

        //UPDATE SELLER
        var price = currentMatch.price;
        var updatedUSD = amountBought*price
        Meteor.users.update({username:currentMatch.username},{$inc:{"profile.wallet.USD":updatedUSD}});

        leftToBuyBTC -= amountBought;
      }else{
        console.log("no match");
      }
    }

    /*sellORderMatch.forEach(function(order){
      console.log(order);
    });*/
  }
});
