Friendship = new Meteor.Collection('friendships');

Friendship.follow = function(friendId) {
  if (! this.findOne({
    userId: Meteor.userId(), friendId: friendId})
    ) {
    this.insert({
      userId: Meteor.userId(),
      friendId: friendId,
    });
  }
};

Friendship.unfollow = function(friendId) {
  this.remove({
    userId: Meteor.userId(),
    friendId: friendId,
  });
};

Friendship.isFollowing = function(userId, friendId) {
  return this.findOne({
    userId: userId,
    friendId: friendId,
  });
};

Friendship.following = function(userId) {
  return this.find({userId: userId}).count();
};

Friendship.followers = function(friendId) {
  return this.find({friendId: friendId}).count();
};

Friendship.timelineIds = function(userId) {
  let timelineIds = this.find({
    userId: userId,
  }).map(function(f) {
    return f.friendId;
  });
  timelineIds.push(userId);
  return timelineIds;
};

Friendship.followersAndFollowings = function(_id) {
  return this.find({$or: [{userId: _id}, {friendId: _id}]});
};
