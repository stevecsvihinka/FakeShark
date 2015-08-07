  Template.hello.onCreated(function() {
  Meteor.subscribe('lecture_audio');
  this.subscribe('lecture_audio');
});

  Template.hello.events({
  'click #submitAudio':function(){
     file =  $('#inputAudio').get(0).files[0] //Some jQuery to get the value.
     console.log(file);
     fsFile = new FS.File(file);
     console.log(fsFile);   
  
      ID3.loadTags('cfs/files/AudioCollection/'+fsFile._id+'/'+file.url, function() {
      tags = ID3.getAllTags('cfs/files/AudioCollection/'+fsFile._id+'/'+file.url);
      console.log(tags.artist + " - " + tags.title + ", " + tags.album);
      });
      
     fsFile.metadata = {coolText:"coolText"} //FS.File support metadata.
     AudioCollection.insert(fsFile);//insert
  }//function
})//events

  Template.outer.onCreated(function(){
  Meteor.subscribe('lecture_audio');
  this.subscribe('lecture_audio');
});

  Template.hello.helpers({
  showAudio:function(){
   return AudioCollection.find();
  }
})

// Template.hello.rendered = function() {
//   ID3.loadTags(fsFile, function() {
//      var tags = ID3.getAllTags(fsFile);
//      console.log(tags.artist + " - " + tags.title + ", " + tags.album);
//      });  
//  }