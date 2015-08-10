  var _player = document.getElementById("player"),
    _playlist = document.getElementById("playlist"),
    _stop = document.getElementById("stop");

  Template.hello.onCreated(function() {
  Meteor.subscribe('lecture_audio');
  this.subscribe('lecture_audio');
});

  Template.hello.events({
  'click #submitAudio': 
  submitAudio = function(){
    
     file =  $('#inputAudio').get(0).files[0] //Some jQuery to get the value.
     console.log(file);
     fsFile = new FS.File(file);
     fsFileClone = fsFile;
     console.log(fsFile);      

     ID3.loadTags('cfs/files/AudioCollection/'+fsFile._id+'/'+file.url, function() {
     tags = ID3.getAllTags('cfs/files/AudioCollection/'+fsFile._id+'/'+file.url);
     fsFile.metadata = {coolText: tags.artist + " - " + tags.title + ", " + tags.album}
     });

     AudioCollection.insert(fsFile);//insert

     setTimeout(function(){  
     id3tags();
     }, 10000);

     
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
      AudioCollection.update({_id: fsFileClone._id}, {$set: {coolText: tags.artist + " - " + tags.title + ", " + tags.album} });
      });
  }

  Template.outer.onCreated(function(){
  Meteor.subscribe('lecture_audio');
  this.subscribe('lecture_audio');
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

function playlistItemClick(clickedElement) {
    clickedElement.classList.add("selected");
    var abc = clickedElement.getAttribute("id");
    $("#player").attr("src", abc);
}

function playNext() {
    var selected = _playlist.querySelector("li.selected");
    if (selected && selected.nextSibling) {
        playlistItemClick(selected.nextSibling);
    }
}