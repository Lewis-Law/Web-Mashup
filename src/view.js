import $ from "jquery";
import flickrPhotos from "./templates/flickrPhotos.handlebars";
import facebookAlbums from "./templates/facebookAlbums.handlebars";
import facebookPhotos from "./templates/facebookPhotos.handlebars";
import facebookInfo from "./templates/facebookInfo.handlebars";
import facebookLikes from "./templates/facebookLikes.handlebars";
import googleMaps from "./templates/googleMaps.handlebars";

// display photos after search input
export function displayFlickrPhotos(photosArr, categoryStr){
    let data = {photos: photosArr, search: categoryStr};
    console.log(data);
    $("#mainBody").css("display", "flex");
    $("#mainBody").html(flickrPhotos(data));
}

// display photos from searchLike tab
export function displayFlickrLikePhotos(photosArr, categoryStr){
    let data = {photos: photosArr, search: categoryStr};
    console.log(data);
    $('#nav-items div').removeClass('current');
    $('#searchLikes').addClass('current');
    $("#mainBody").css("display", "flex");
    $("#mainBody").html(flickrPhotos(data));
}

// display photos from myAlbums tab
export function displayFacebookAlbums(photosArr){
    $('#nav-items div').removeClass('current');
    $('#myPhotos').addClass('current');
    console.log("displayfacebookalbums");
    let data = {photos: photosArr};
    console.log(data);
    $("#mainBody").css("display", "flex");
    $("#mainBody").html(facebookAlbums(data));
}

// display photos after clicking on an album from myAlbumstab
export function displayFacebookPhotos(photosArr){

    let data = {photos: photosArr};
    console.log("displayfacebookphotos");
    console.log(data);
    $("#mainBody").css("display", "flex");
    $("#mainBody").html(facebookPhotos(data));
}

// display Info and posts from About Me tab
export function displayAboutMe(infoArr, postsArr){
    $('#nav-items div').removeClass('current');
    $('#aboutMe').addClass('current');
    let data = {posts: postsArr, info: infoArr};
    console.log(data);
    $("#mainBody").css("display", "block");
    $("#mainBody").html(facebookInfo(data));
}

// display a list of likes from my likes tab
export function displayFacebookLikes(likesArr){
    $('#nav-items div').removeClass('current');
    $('#myLikes').addClass('current');
    let data = {likes: likesArr};
    console.log(data);
    $("#mainBody").css("display", "block");
    $("#mainBody").html(facebookLikes(data));
}


// display a map from Google Map tab
export function displayGoogleMap(latData, lngData){
    console.log("displayGoogleMap");
    $('#nav-items div').removeClass('current');
    $('#googleMap').addClass('current'); 
    $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyD4AMLViAJ9z1c7L5GsiJzhlortHEErx1c&callback=initMap', function(){
        initMap(latData, lngData);
    });
    $("#mainBody").html(googleMaps());
}


var map;

function initMap(latData, lngData) {
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: latData, lng: lngData},
        //center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
    console.log(map);
}

