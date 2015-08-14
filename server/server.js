Meteor.publish(null, function() {
  return Meteor.users.find(this.userId, {fields: {vote: 0}});
});

// Houston.add_collection(Meteor.users);
// Houston.add_collection(AudioCollection);
// Houston.add_collection(VotesCollection);

Accounts.onCreateUser(function(options, user) {
	var id = user._id;
	var name = user.username;
	VotesCollection.insert( {userId: id, username: name, plays: 0});     

	return user;
})