import $ from "jquery";
let API_KEY = "api_key=dc140afe3fd3a251c2fdf9dcd835be5c";
let photos = [];
let nrequest;
let nreceived;
let ready_cb;
let categoryStr;
// Function for registering a search using Flickr's Search API and getting photos
export function search_Register(category ,ready){
    ready_cb = ready;
    categoryStr = category;
    let searchStr = "https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=10&format=json&nojsoncallback=1&"+API_KEY+"&text="+category;
    $.get(searchStr,function(data){
        fetchPhoto(data);
    });
}

// sorts the photo into id and title
function fetchPhoto(data){
    nrequest = data.photos.photo.length;
    nreceived = 0;
    photos=[];
    for (let i = 0; i < data.photos.photo.length; i++){
        let photoObj = {id: data.photos.photo[i].id, title: data.photos.photo[i].title};
        photos.push(photoObj);
        getSizes(photoObj);
    }
}

//gets the sizes of photo, call back function
function getSizes(photoObj){
    let getSizesStr= "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&nojsoncallback=1&"+API_KEY+ "&photo_id="+ photoObj.id; 
    $.get(getSizesStr, function(data){
        nreceived++;
        photoObj.file = data.sizes.size[data.sizes.size.length-1].source;
        photoObj.full = data.sizes.size[data.sizes.size.length-1].source;
        if( nreceived == nrequest){
            ready_cb(photos, categoryStr)
        }
    });
}

