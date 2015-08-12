AudioCollection = new FS.Collection("AudioCollection", {
  stores: [new FS.Store.GridFS("AudioCollection")]
});

VotesCollection = new Meteor.Collection("VotesCollection");
