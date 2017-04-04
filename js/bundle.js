(function () {
    var content = document.getElementById("app");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (objPosition) {
            var lon = objPosition.coords.longitude;
            var lat = objPosition.coords.latitude;

            var dir = "";
            var dpto = "";
            var latlng = new google.maps.LatLng(lat, lon);
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({ "latLng": latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        console.log(results);
                        dir = "<p><strong>Dirección: </strong>" + results[0].formatted_address + "</p>";
                        dpto = "<p><strong>Departamento: </strong>" + results[0].address_components[3].long_name + "</p>";
                    }
                    else {
                        dir = "<p>No se ha podido obtener ninguna dirección en esas coordenadas.</p>";
                    }
                }
                else {
                    dir = "<p>El Servicio de Codificación Geográfica ha fallado con el siguiente error: " + status + ".</p>";
                }

                content.innerHTML = "<p><strong>Latitud:</strong> " + lat + "</p><p><strong>Longitud:</strong> " + lon + "</p>" + dir + dpto;
            });
        }, function (objPositionError) {
                switch (objPositionError.code) {
                    case objPositionError.PERMISSION_DENIED:
                        content.innerHTML = "No se ha permitido el acceso a la posición del usuario.";
                        break;
                    case objPositionError.POSITION_UNAVAILABLE:
                        content.innerHTML = "No se ha podido acceder a la información de su posición.";
                        break;
                    case objPositionError.TIMEOUT:
                        content.innerHTML = "El servicio ha tardado demasiado tiempo en responder.";
                        break;
                    default:
                        content.innerHTML = "Error desconocido.";
                }
            }, {
                maximumAge: 75000,
                timeout: 15000
            });
    }
    else {
        content.innerHTML = "Su navegador no soporta la API de geolocalización.";
    }
})();