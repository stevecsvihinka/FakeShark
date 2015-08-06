  Meteor.subscribe('lecture_audio');

  Template.hello.events({
  'click #submitAudio':function(){
     var file =  $('#inputAudio').get(0).files[0] //Some jQuery to get the value.
     console.log(file);
     fsFile = new FS.File(file);
     console.log(fsFile);

     ID3.loadTags(fsFile, function() {
     var tags = ID3.getAllTags(fsFile);
     console.log(tags.artist + " - " + tags.title + ", " + tags.album);
     });

     fsFile.metadata = {coolText:"coolText"} //FS.File support metadata.
     AudioCollection.insert(fsFile);//insert

setTimeout(function() { location.reload(); }, 5000);
     
  }//function
})//events

  Template.hello.helpers({
  showAudio:function(){
   return AudioCollection.find();
  }
})


// Template.hello.rendered = function() {
//      var file =  $('#inputAudio').get(0).files[0] //Some jQuery to get the value.
//      fsFile = new FS.File(file);
//      fsFile.metadata = {coolText:"coolText"} //FS.File support metadata.
//      AudioCollection.insert(fsFile,function(err,result){
//       if(err){
//         console.log(result) //you should get an id here since the full object take more less 10 sec to upload
//         }
//   })//insert
//   }//function
