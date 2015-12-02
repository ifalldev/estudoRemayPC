Post = new Meteor.Collection('posts');

Post.publish = function(message, name) {
  let params = {
    message: message,
    time: new Date(),
    userId: Meteor.userId(),
    name: name,
  };
  this.insert(params);
};

Post.list = function(userIds) {
  return this.find(
      {userId: {'$in': userIds}},
      {sort: {time: -1, name: 1}}
    );
};
