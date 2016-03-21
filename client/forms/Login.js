Template.LoginTemplate.onRendered(function(){
  $("#loginUserForm").validate();
});


Template.LoginTemplate.events({

  'submit form': function (event,template) {
    event.preventDefault();
    var username = $("#username_input").val();
    var password = $("#password_input").val();

    if(Meteor.user())
    {
      FlashMessages.sendSuccess("Your already logged in!");
      return;
    }

    console.log(username);
    Meteor.loginWithPassword(username,password,function (error,result) {
      if(error){
        console.log(error);
        FlashMessages.sendError(error.reason);
        //FlashMessages.sendError("Im sorry there was an error. Please reload the page and try again.");

      }else {
        FlashMessages.sendSuccess("Welcome back!");
        Router.go("/");
      }
    });
  }
});
