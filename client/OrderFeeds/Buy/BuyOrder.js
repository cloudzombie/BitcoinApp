Template.buyOrder.helpers({
    isUser:function(){
        var username = Meteor.user().username;
        var currUsername = this.username;
        return username == currUsername;
    }
});