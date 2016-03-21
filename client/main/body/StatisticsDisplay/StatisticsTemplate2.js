Template.StatisticsTemplate2.helpers({

  currentStats: function () {
    return Session.get("currentStats") || "";
  }

});


Template.StatisticsTemplate2.created = function (argument) {

  Meteor.call('getCurrentStats',[],function (error,result) {
    console.log("getCurrentStats");
    if(error){
      console.log("Error");
      console.log(error);
    }else{
      Session.set("currentStats",result);
    }
  });

};
