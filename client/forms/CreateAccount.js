Template.CreateAccountTemplate.onRendered(function(){
  $("#createUserForm").validate();
});


Template.CreateAccountTemplate.events({

  'submit form': function (event,template) {
    event.preventDefault();
    var username = $("#username_input").val();
    var password = $("#password_input").val();
    var retype = $("#password_retry").val();

    if(Meteor.user())
    {
      FlashMessages.sendSuccess("Your already logged in!");
      return;
    }

    if(password !== retype)
    {
      FlashMessages.sendError("The two passwords must be equal");
    }
    else {
      Meteor.createUser(password=password,username=username,function (error,result) {
        if(error){
          FlashMessages.sendError("Im sorry there was an error. Please reload the page and try again.");

        }else {
          FlashMessages.sendSuccess("Welcome to Bitchange");
          Router.go("/");
        }
      });
    }
  }
});
