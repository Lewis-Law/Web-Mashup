import $ from "jquery";
let ready_cb;
export function getCords(ready){
    ready_cb=ready;
    let latData = -34.397;
    let lngData = 150.644;
    
    ready_cb(latData,lngData)
}