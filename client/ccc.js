_player = document.getElementById("player"),
_playlist = document.getElementById("playlist"),
_stop = document.getElementById("stop");
Meteor.subscribe('votescollection')

Template.hello.onCreated(function() {
  Meteor.subscribe('lecture_audio');
  this.subscribe('lecture_audio');
  Meteor.subscribe('votescollection');
});

Template.hello.events({
  'click #submitAudio': 
  submitAudio = function(){  
    file =  $('#inputAudio').get(0).files[0] //Some jQuery to get the value.
    console.log(file);
    fsFile = new FS.File(file);
    fsFileClone = fsFile;
    console.log(fsFile);      

    // ID3.loadTags('cfs/files/AudioCollection/'+fsFile._id+'/'+file.url, function() {
    // tags = ID3.getAllTags('cfs/files/AudioCollection/'+fsFile._id+'/'+file.url);
    // fsFile.metadata = {coolText: tags.artist + " - " + tags.title + ": added by " + Meteor.user().username}
    // });

    AudioCollection.insert(fsFile);//insert
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
  AudioCollection.update({_id: fsFileClone._id}, {$set: {coolText: tags.artist + " - " + tags.title + " added by: " + Meteor.user().username} });
  });
}

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
    tar = (evt.target); // target is clicked
    console.log(tar);
    playlistItemClick(tar);
  }
})

Template.hello.events({
  'ended #player': function(){
      nextElem = $( '.selected' ).next('li')[0];
      playlistItemClick(nextElem);
  }
})

function playlistItemClick(clickedElement) {
  clickedElement.classList.add("selected");
  x = clickedElement;
  var toBeRemoved = $( '.selected' );
  for (i=0; i < toBeRemoved.length; i++)
  {
    if (toBeRemoved[i] !== x)
      {
        toBeRemoved[i].classList.remove("selected");
      }
  }    
  abc = clickedElement.getAttribute("id");
  $("#player").attr("src", abc);
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

// Accounts.onCreateUser({
//   VotesCollection.insert({ 'user': Meteor.user(), 'votes': 0 })
// });

