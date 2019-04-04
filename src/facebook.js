import $ from "jquery";
const APP_ID = "1741682419233349";
let ready_cb;

export function bootstrap() {
    $.ajaxSetup({ cache: true });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
            appId: APP_ID,
            version: 'v3.0' // or v2.1, v2.2, v2.3, ...
        });     
        FB.getLoginStatus(updateStatusCallback);
    });
    }

// used for detecting log in status
function updateStatusCallback(response) {
    console.log("updateStatusCallback");
    if (response.status === 'connected') {
        console.log(response);
        console.log('Logged in.');
        $('#login').hide(500);
        $('#logout').show(500);
        $('#left').show(500);
        FB.api('/me', function(response){
            $('#fbname').html('Name:' + response.name);
        });
    }
    else {
        console.log('Logged out');
        $('#logout').hide(500);
        $('#login').show(500);
        $('#left').hide(500);
    }
}

// log in to facebook
export function login(){
    console.log("in login funcction");
    FB.login(function(response){
        FB.api('/me', function(response){
            console.log(response);
            FB.getLoginStatus(updateStatusCallback)
            $('#mainBody').html('Welcome, ' + response.name + '!');
        });
    }, {scope: 'email, user_posts, user_likes, user_friends, user_gender, user_photos'});
    
}

//log out of facebook
export function logout(){
    FB.logout(function(response){
        FB.getLoginStatus(updateStatusCallback)
        $("#mainBody").html('Sucessfully Logged Out');
        console.log("Logged Out");
    });
    
}

// fetch user's albums
export function getMyAlbums(ready){
    ready_cb = ready;
    FB.api('me?fields=albums{name,photos{images}}', function(response){
        arrangeMyAlbums(response.albums);
    });
}

// extract the first photo of user's album and album name
function arrangeMyAlbums(albums){
    let photos=[];
    for (let k = 0; k < albums.data.length; k++){
            if (albums.data[k].photos != undefined){
                let photoObj = {id: k, source: albums.data[k].photos.data[0].images[0].source, name: albums.data[k].name};
                photos.push(photoObj);
        }
    }
    ready_cb(photos);
}


// feteches all photos from a specfic album
export function photosFromAlbum(i, ready){
    ready_cb = ready;
    let photos=[];
    console.log("photosFromAlbum");
    FB.api('me?fields=albums{name,photos{images}}', function(response){
        for (let k = 0; k < response.albums.data[i].photos.data.length; k++){
            let photoObj = {source: response.albums.data[i].photos.data[k].images[0].source};
            photos.push(photoObj);
        }
        ready_cb(photos);
    });
}



// fetch user info
export function getMyInfo(ready){
    ready_cb = ready;
    FB.api('me?fields=name,posts{message},friends,gender,email,albums{name,photos{images}}', function(response){
       console.log(response); 
       displayInfo(response);
    });
}

// extract user info into 2 arrays and callback to display
// variables taken Profile Picutre, name, gender, email, total no. of friends, all of user's posts
function displayInfo(response){
    let info = [];
    let posts = [];
    let sourceStr = "";
    for (let k = 0; k < response.albums.data.length; k++){
        if (response.albums.data[k].name == "Profile Pictures"){
            sourceStr = response.albums.data[k].photos.data[0].images[0].source;
            break;
        }
    }
    console.log(sourceStr);
    info.push({source: sourceStr, name: response.name, gender: response.gender, email: response.email, friends: response.friends.summary.total_count});
    for (let k = 0; k < response.posts.data.length; k++){
        if (response.posts.data[k].message != undefined)
    posts.push({name:response.name, message: response.posts.data[k].message});
    }
    ready_cb(info, posts);
}

// fetch user's likes
export function getMyLikes(ready){
    ready_cb = ready;
    FB.api('me?fields=likes', function(response){
       displayLikes(response.likes);
    });
}

// extract user likes
function displayLikes(likes){
    let likesArr = [];
    for (let k = 0; k < likes.data.length; k++){
        likesArr.push({name: likes.data[k].name});
    }
    ready_cb(likesArr);
}



// fetch user likes
export function exploreLikes(ready){
    ready_cb = ready;
    FB.api('me?fields=likes', function(response){
       console.log(response);
       randomLikes(response.likes);
    });
}

// extract a random like and callback to controller -> flicker to perform search
function randomLikes(likes){
    let likesArr = [];
    for (let k = 0; k < likes.data.length; k++){
        likesArr.push(likes.data[k].name);
    }
    var randomSearch = likesArr[Math.floor(Math.random() * likesArr.length)];
    console.log("randomSearch: " + randomSearch);
    ready_cb(randomSearch);
}

