import $ from "jquery";
import style from "./css/stylesA2.css";
// import img1 from "./assets/DSC01049.JPG";
import * as view from "./view.js";
import * as flickr from "./flickr.js";
import * as facebook from "./facebook.js";
import * as googlejs from "./google.js";

$(document).ready(function(){
    facebook.bootstrap();
    initialiseComponents();
});

// initilise all functions on this page
function initialiseComponents(){
    loginClick();
    logoutClick();
    myAlbums(facebookAlbumReady);
    searchButton(flickrReady);
    aboutMe(facebookAboutMeReady);
    myLikes(facebookLikesReady);
    searchLikes(facebookSearchLikesReady);
    googleMap(googleMapReady);
}

// Search Button
function flickrReady(data, categoryStr){
    view.displayFlickrPhotos(data, categoryStr);
}

function searchButton(ready){
    $("#search-btn").click(function(){
        let category = $("#search-input").val();
        flickr.search_Register(category, ready);
    });
}

//My albums tab
function facebookAlbumReady(data){
    view.displayFacebookAlbums(data);
    clickAlbum(facebookAlbumPhotosReady);
}

function myAlbums(ready){
    $('#myPhotos').click(function() {
        facebook.getMyAlbums(ready);
    });
}

//Clicking an Album after alumbs are displayed from my album tab
function facebookAlbumPhotosReady(data){
    view.displayFacebookPhotos(data);
}

function clickAlbum(ready){
    $('figure').each(function (index){
        $(this).click(function(){
            facebook.photosFromAlbum(this.id, ready);
        });
    });
}

//About me tab
function facebookAboutMeReady(info, posts){
    view.displayAboutMe(info, posts);
}

function aboutMe(ready){
    $('#aboutMe').click(function(){
        facebook.getMyInfo(ready);
    });
}


//My Likes tab
function facebookLikesReady(likes){
    view.displayFacebookLikes(likes);
}

function myLikes(ready){
    $('#myLikes').click(function(){
        facebook.getMyLikes(ready);
    });
}

// Search Likes Tab
function facebookSearchLikesReady(like){
    flickr.search_Register(like, flickrSearchLikesReady);
}

function flickrSearchLikesReady(data ,categoryStr){
    view.displayFlickrLikePhotos(data ,categoryStr);
}

function searchLikes(ready){
    $('#searchLikes').click(function(){
        console.log("searchLikes");
        facebook.exploreLikes(ready);
    });
}


//Google Map Tab
function googleMapReady(latData, lngData){
    view.displayGoogleMap(latData, lngData);
}
function googleMap(ready){
    $('#googleMap').click(function(){
       googlejs.getCords(ready);
    });
}


// log in button
function loginClick(){
    $('#login').click(function(){
        facebook.login(); 
    });
}

// log out button
function logoutClick(){
    $('#logout').click(function(){
        facebook.logout(); 
    });
}






