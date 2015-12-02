Template.post.events({
  'submit form': function(e, template) {
    e.preventDefault();
    let textArea = template.find('textarea');
    let name = Meteor.user().profile.name;
    Meteor.call('publishPost', textArea.value, name);
    textArea.value = '';
  },
});
