
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5ubWFyaWVqZW5ueSIsImEiOiJja2w4NGUycWMydHVnMnBwbGtwYTd2bDdsIn0.nw5eYr-3jZj6cS7lDUIFMg';

var options = {
    container: 'map-container', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    // uses streets-v11 but there are many other options
    // light-v10
    // darkv-10
    // many other themes or styles you can find
    center: [-73.942278,40.740154], // starting position [lng, lat] << South Jersey
    zoom: 11// starting zoom
    //pitch: 40 // causes a tilt in viewing
}
// splitting the var out below and above helps you refer to it (here "options") more than once

var map = new mapboxgl.Map(options); // if you didn't set this here, you couldn't set line 28 to map.addControl
// pulls from options as indicated above
// there are many other options you can do in MapboxGL
// center: use LONG, LAT (not LAT, LONG)
//Zoom levels: 0 = viewing the whole world
// 19 = will show you one building
//MapboxGL is great that it lets you zoom and if your
//hold down ctrl you can look at the map with different norths
//and at different levels

//add a navigation control in the upper left corner
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

///let's add a marker to the map
var marker = new mapboxgl.Marker({ // could get rid of var market if you're never going to reference it again, show and hide,etc
  // variables help with interactions
  color: 'red'//make sure to add quotes
})
  .setLngLat([-74.0060, 40.7128])
  .setPopup(new mapboxgl.Popup().setHTML("<h1>City Hall!</h1>")) // add popup, using html
  .addTo(map);

// add several markers at once using a loop
// starting with a csv and converting it into mappable data using code

// set up dummy data
// this will be an array of objects - can review from last week
// helpful resource for finding lat longs: bboxfinder.com
var dummyData = [
  {
    name: 'The Pond',
    point: [-73.974047,40.765837]
  },
  {
    name: 'The Zoo',
    point: [-73.971755,40.767857]
  },
  {
    name: 'Strawberry Fields',
    point: [-73.974844,40.775583]
  }
]
dummyData.forEach(function(data) { //this row is where you name it, here it's named data
  //it's good practice to name it the singular version of what's in the array
  console.log(data.name, data.point)

  new mapboxgl.Marker()
  .setLngLat(data.point) // pass through an array
  .setPopup(new mapboxgl.Popup().setHTML(`<h1>${data.name}</h1>`)) // add popup, using html
  // back ticks with the dollar sign and brackets allows you to put code/variables inside of the
  .addTo(map);
})

// can turn a csv into an array of objects using an online converter
// csv to json >> csvjson converter

// $ means we're in jquery world navigation
// $.getJSON() takes two arguments: (1) location of json (internet or local) (2)
$.getJSON('./data/nyc-tea-shops.json', function(teaShops){
  console.log(teaShops)
    teaShops.forEach(function(teaShop) {
      console.log(teaShop.name, teaShop.hours)

var html = `
<h3>${teaShop.name}</h3>
<div>Hours: ${teaShop.hours}</div>
<div><i>${teaShop.description}</i></div>
`

var color = 'lightblue'
  if(teaShop.outdoorseating === 'Outdoor Seating!'){
    color = 'pink'
  }

    new mapboxgl.Marker({
      color: color
    })
    .setLngLat([teaShop.lng,teaShop.lat]) // pass through an array
    .setPopup(new mapboxgl.Popup().setHTML(html))
    .addTo(map);
  })

})

// TO DOs 
/// Create a color key
// Insert a call to action
