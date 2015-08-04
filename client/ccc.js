if (Meteor.isClient) {

  Meteor.subscribe('lecture_audio');

  Template.hello.events({
  'click #inputAudio':function(){
     var file =  $('#inputAudio').get(0).files[0] //Some jQuery to get the value.
     fsFile = new FS.File(file);
     fsFile.metadata = {coolText:"coolText"} //FS.File support metadata.
     AudioCollection.insert(fsFile,function(err,result){
      if(!err){
        console.log(result) //you should get an id here since the full object take more less 10 sec to upload
        }
  })//insert
  }
})//events

  Template.hello.helpers({
  showAudio:function(){
   return AudioCollection.find();
  }
})
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
