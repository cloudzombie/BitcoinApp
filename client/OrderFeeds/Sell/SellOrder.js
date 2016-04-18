Template.sellOrder.helpers({
    isUser:function(){
        var username = Meteor.user().username;
        console.log(this);
        var currUsername = this.username;
        return username == currUsername;
    }
});