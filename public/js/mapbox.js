/*eslint-disable*/
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoiem1yeXMiLCJhIjoiY2tldHV6eGVsMXptZzJycG41dW1rajc0ZiJ9.NEg7B0bwejDcdvXXwQ8s-w';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/zmrys/ckf3inkf60lwv19mj1vknx6lo',
    scrollZoom: false,
    // center: [-118.267572, 34.015376],
    // zoom: 10,
    // interactive: false,
  });
  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach((location) => {
    //Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(location.coordinates)
      .addTo(map);
    // Add Popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(location.coordinates)
      .setHTML(`<p>Day ${location.day} ${location.description}</p>`)
      .addTo(map);
    //Extend map bounds to include current location
    bounds.extend(location.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
