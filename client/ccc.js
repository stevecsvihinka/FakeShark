_player = document.getElementById("player"),
_playlist = document.getElementById("playlist");
Meteor.subscribe('votescollection')

Template.hello.onCreated(function() {
  Meteor.subscribe('lecture_audio');
  this.subscribe('lecture_audio');
  Meteor.subscribe('votescollection');
});

Template.hello.events({
  'click #submitAudio': 
  submitAudio = function(){  
    file =  $('#inputAudio').get(0).files[0]
    console.log(file);
    fsFile = new FS.File(file);
    fsFileClone = fsFile;
    console.log(fsFile);      
    AudioCollection.insert(fsFile);
  }//function
})//events

Template.hello.events({
  'click #songInfo': function() {
    id3tags();
  }
})

id3tags = function() {
  ID3.loadTags('cfs/files/AudioCollection/'+fsFileClone._id+'/'+file.url, function() {
  tags = ID3.getAllTags('cfs/files/AudioCollection/'+fsFileClone._id+'/'+file.url);
  AudioCollection.update({_id: fsFileClone._id}, 
  {$set: {coolText: tags.artist + " - " + tags.title + " added by: " + Meteor.user().username} }); 
  AudioCollection.update({_id: fsFileClone._id}, {$set: {uploader: Meteor.user().username } });
  AudioCollection.update({_id: fsFileClone._id}, {$set: {plays: 0} });
  });//second param of loadtags  
}//id3tags

Template.outer.onCreated(function(){
  Meteor.subscribe('lecture_audio');
  this.subscribe('lecture_audio');
  Meteor.subscribe('votescollection');
});

Template.hello.helpers({
  showAudio:function(){
    return AudioCollection.find();
  }
})

Template.hello.events({
  'click .noblue': function(evt){
    var tar = (evt.target); // target is clicked
    console.log(tar);
    playSong(tar);
  }
})

Template.hello.events({
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
  for (i=0; i < toBeRemoved.length; i++)
    {
      if (toBeRemoved[i] !== clickedElement)
        {
          toBeRemoved[i].classList.remove("selected");
        }
    }    
  songId = clickedElement.getAttribute("id");
  // clickedElement.getAttribute("style") == "display: list-item;"
  $("#player").attr("src", songId);
}



Template.hello.helpers({
  currentSong: function() {
    z = $('.selected').text();
    return z; 
   }
});

Accounts.ui.config({
passwordSignupFields: 'USERNAME_ONLY'
})

Template.hello.helpers({
  users: function() {
  return VotesCollection.find({}, { sort: { plays: -1 } });
  }
})

Template.hello.events({
  'click .usernames': function(clickedUsername){
   var userName =($(clickedUsername.target).attr('id'));
   console.log(userName);
   gg = $("li[rel=" + userName +"]");
   console.log(gg);
   $('.noblue').toggle(false);
   $("li[rel=" + userName +"]").toggle(true);
    
  }
})


