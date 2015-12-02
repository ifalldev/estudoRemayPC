Template.followButton.helpers({
  canFollow: function() {
    let userId = Meteor.userId();
    return userId && Session.get('currentUserId') !== userId;
  },
  isFollowing: function() {
    return Session.get('isFollowing');
  },
});
