//GET IP
$.getJSON('https://api.ipify.org?format=json', function (data) {
  getISP(data.ip);
  getGEO(data.ip);
});


//ISP
let apiKey = "e2fb6d69079348edaeb12e516b94856c";
function getISP(ip) {
  fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`).then(function (u) { return u.json(); }
  ).then(
    function (json) {
      isp = json.isp;
    }
  )
};

//GEOLOCALIZACION
var access_key = 'bf65467ccdc6c2a94250d68cb2e48e5e';
function getGEO(ip) {
  $.ajax({
    url: 'http://api.ipapi.com/' + ip + '?access_key=' + access_key,
    dataType: 'jsonp',
    type: "GET",

    success: function (json) {

      let output = { "Public IP": `${json.ip}`, "Continent": `${json.continent_name}`, "Country": `${json.country_name}`, "State/Prov": `${json.region_name}`, "City": `${json.city}`, "ZipCode": `${json.zip}`, "ISP": `${isp}`, "Lat / Long": `(${json.latitude}, ${json.longitude})` };

      // dibujar la tabla
      const $cuerpoTabla = document.querySelector("#cuerpoTabla");

      for (var key in output) {

        // Crear un <tr>
        const $tr = document.createElement("tr");
        // Creamos el <td> de nombre y lo adjuntamos a tr
        let $td_id = document.createElement("td");
        $td_id.textContent = key; // el textContent del td es el nombre
        $tr.appendChild($td_id);
        let $td_content = document.createElement("td");
        $td_content.textContent = output[key]; // el textContent del td es el nombre
        $tr.appendChild($td_content);
        $cuerpoTabla.appendChild($tr);
      }
      initMap(`${json.latitude}`, `${json.longitude}`);
      //Se devuelve el resultado
      // document.getElementById('data').innerHTML = output;

    }
  })
};


//MAP
let initMap = async (lat, lng) => {

  mapboxgl.accessToken = 'pk.eyJ1Ijoic2hvY2t6IiwiYSI6ImNrbXkzcGRpaDAwOGsycHBzazdsc2xycXQifQ.lVtT5RSnHTsxweT_L82x1w';
  var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [lng, lat], // starting position [lng, lat]
    zoom: 11 // starting zoom
  });

  // Create a default Marker and add it to the map.
  var marker1 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
    .setLngLat([lng, lat])
    .addTo(map);
}