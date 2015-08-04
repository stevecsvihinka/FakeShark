Meteor.publish('lecture_audio', function () {
  return AudioCollection.find();
})

AudioCollection.allow({
     insert:function(){return true;},
     remove:function(){return true;},
     update:function(){return true;},
     download:function(){return true;}
 })