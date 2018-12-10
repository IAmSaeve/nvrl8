function onSignIn(googleUser) {
    var uri = "https://localhost:5001/api/user";
    var data = { name: profile.getName, email: profile.getEmail, imageURL: profile.getImageUrl};

    axios.post(uri, data).then(() => {

    })
    .catch((error) => { console.log(error); })
    console.log(name)
    console.log(email)
    var profile = googleUser.getBasicProfile();

    console.log('Name: ' + profile.getName());

    console.log('Image URL: ' + profile.getImageUrl());

    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.


    

    //location.href = "profile.htm";
}


