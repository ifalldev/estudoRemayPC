Accounts.onCreateUser(function(options, user) {
  if (user.services.facebook) {
    let facebook = user.services.facebook;
    user.profile = {
      name: facebook.name,
    };
  } else {
    user.profile = options.profile;
  }
  return user;
});
