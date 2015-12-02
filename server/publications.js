Meteor.autorun(function() {
  Meteor.publish('post', function(_id) {
    let timelineIds = Friendship.timelineIds(_id);
    return Post.list(timelineIds);
  });

  Meteor.publish('friendship', function(_id) {
    return Friendship.followersAndFollowings(_id);
  });

  Meteor.publish('isFollowing', function(_id, _friendId) {
    return Friendship.isFollowing(_id, _friendId);
  });

  Meteor.publish('user', function(_id) {
    return Meteor.users.find({_id: _id});
  });
});
