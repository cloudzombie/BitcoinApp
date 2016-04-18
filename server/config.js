Accounts.config({
	//sendVerificationEmail: true, 
	//forbidClientAccountCreation: false
});


if(Meteor.isServer){
   Meteor.startup(function(){
		 var smtp = {
			 username:"testmyapp12345678@gmail.com",
			 password:"bitchange",
			 server:"smtp.gmail.com",
			 port:465
		 }
		 
     process.env.MAIL_URL='smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password)
		 + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
				
				
		//'smtp://postmaster@support.bitchange.com:54ee0a7d9ce2c9b4c3ffecb4f95c4125@smtp.mailgun.org:587';
   });
}