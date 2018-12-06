function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    
    console.log('Name: ' + profile.getName());

    console.log('Image URL: ' + profile.getImageUrl());

    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    
   location.href="profile.htm";
}