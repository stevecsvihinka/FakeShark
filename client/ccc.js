_player = document.getElementById("player"),
_playlist = document.getElementById("playlist");
Meteor.subscribe('votescollection')

Template.fakesharkPlayer.onCreated(function() {
  Meteor.subscribe('lecture_audio');
  this.subscribe('lecture_audio');
  Meteor.subscribe('votescollection');
});

Template.fakesharkPlayer.events({
  'click #submitAudio': 
  submitAudio = function(){  
    file =  $('#inputAudio').get(0).files[0]
    fileClone = file;
    console.log(file);
    fsFile = new FS.File(file);
    fsFileClone = fsFile;
    console.log(fsFile);      
    AudioCollection.insert(fsFile);
  }//function
})//events

Template.fakesharkPlayer.events({
  'click #songInfo': function() {
    id3tags();
  }
})

id3tags = function() {
  var collectionId = 'cfs/files/AudioCollection/'+fsFileClone._id+'/'+fileClone.url;
  ID3.loadTags('cfs/files/AudioCollection/'+fsFileClone._id+'/'+file.url, function() {
  tags = ID3.getAllTags('cfs/files/AudioCollection/'+fsFileClone._id+'/'+file.url);
  AudioCollection.update({_id: fsFileClone._id}, 
  {$set: {metadata: tags.artist + " - " + tags.title + " added by: " + Meteor.user().username} }); 
  AudioCollection.update({_id: fsFileClone._id}, {$set: {uploader: Meteor.user().username } });
  AudioCollection.update({_id: fsFileClone._id}, {$set: {plays: 0} });
  });//second param of loadtags  
}//id3tags

Template.outer.onCreated(function(){
  Meteor.subscribe('lecture_audio');
  this.subscribe('lecture_audio');
  Meteor.subscribe('votescollection');
});

Template.fakesharkPlayer.helpers({
  showAudio:function(){
    return AudioCollection.find();
  }
})

Template.fakesharkPlayer.events({
  'click .noblue': function(evt){
    var tar = (evt.target); // target is clicked
    console.log(tar);
    playSong(tar);
  }
})

Template.fakesharkPlayer.events({
  'ended #player': function(){
      tempId = $( '.selected' ).attr('rel');
      var grabId = VotesCollection.findOne({username: tempId})._id;
      incrementNum = VotesCollection.findOne({username: tempId}).plays + 1;
      VotesCollection.update({_id: grabId}, {$set: {plays: incrementNum} });
      nextElem = $( '.selected' ).nextAll('li:visible:first')[0];
      playSong(nextElem);
  }
})

function playSong(clickedElement) {
  clickedElement.classList.add("selected");
  var toBeRemoved = $( '.selected' );
  for (i=0; i < toBeRemoved.length; i++) {
      if (toBeRemoved[i] !== clickedElement) {
          toBeRemoved[i].classList.remove("selected");
      }
  }    
  songId = clickedElement.getAttribute("id");
  $("#player").attr("src", songId);
}

Accounts.ui.config({
passwordSignupFields: 'USERNAME_ONLY'
})

Template.fakesharkPlayer.helpers({
  users: function() {
  return VotesCollection.find({}, { sort: { plays: -1 } });
  }
})

Template.fakesharkPlayer.events({
  'click .usernames': function(clickedUsername){
   var userName =($(clickedUsername.target).attr('id'));
   console.log(userName);
   gg = $("li[rel=" + userName +"]");
   console.log(gg);
   $('.noblue').toggle(false);
   $("li[rel=" + userName +"]").toggle(true);
  }
})

Template.fakesharkPlayer.events({
  'click #leaderboard': function(){
    $('.noblue').toggle(true);
  }
})
