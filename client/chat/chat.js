Template.chatInput.events({
	'submit form#chatInput': function(e) {
		event.preventDefault();
		var chatInput = $(e.currentTarget);
		var message = chatInput.find('#message').val();
		var user = Meteor.user().username;

		
		ChatRoom.insert({name: user, message: message});
	}
});

Template.chat.helpers({
  chat:function(){
    return ChatRoom.find();
  }
})