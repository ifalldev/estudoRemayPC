Router.map(function() {
  this.route('home', {
    path: '/',
    template: 'home',
    layoutTemplate: 'layout',
    onBeforeAction: function() {
      let _id = Meteor.userId();
      this.subscribe('post', _id);
      this.subscribe('friendship', _id);
      this.next();
    },
    data: function() {
      let _id = Meteor.userId();
      return {
        posts: Post.find({}),
        followers: Friendship.followers(_id),
        following: Friendship.following(_id),
      };
    },
  });
  this.route('user', {
    path: '/user/:_id',
    template: 'user',
    layoutTemplate: 'layout',
    onBeforeAction: function() {
      let _friendId = this.params._id;
      let _id       = Meteor.userId();
      this.subscribe('post', _friendId);
      this.subscribe('friendship', _friendId);
      this.subscribe('isFollowing', [_id, _friendId]);
      this.subscribe('user', _friendId);
      this.next();
    },
    data: function() {
      let _friendId = this.params._id;
      let _id       = Meteor.userId();
      let isFollowing = Friendship.isFollowing(_id, _friendId);
      Session.set('currentUserId', _friendId);
      Session.set('isFollowing', isFollowing);
      return {
        user: Meteor.users.findOne({_id: _friendId}),
        posts: Post.find({userId: _friendId}),
        followers: Friendship.followers(_friendId),
        following: Friendship.following(_friendId),
        // isFollowing: Friendship.isFollowing(_id),
      };
    },
  });
  this.route('follow', {
    path: 'user/:_id/follow',
    action: function() {
      let _id = this.params._id;
      Meteor.call('followUser', _id);
      this.redirect('/user/' + _id);
    },
  });
  this.route('unfollow', {
    path: '/user/:_id/unfollow',
    action: function() {
      let _id = this.params._id;
      Meteor.call('unfollowUser', _id);
      this.redirect('/user/' + _id);
    }
  });
});
