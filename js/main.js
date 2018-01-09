function init() {
    Window.mymap = new L.map('mapid').setView([35.227772, -80.840916], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 15,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZGV2cmFuZHkiLCJhIjoiY2pieHYxZ3MxMnFhcTJxazEyZnlnaDcxdyJ9.hJ3fcjrQ6DoMreIi4C0p3A'
    }).addTo(Window.mymap);

    var popup = L.popup()
        .setLatLng([35.227772, -80.840916])
        .setContent('<p>Hello world!<br />This is a nice popup.</p>');
    L.marker([35.227772, -80.840916]).addTo(Window.mymap).on('click', function (e) {
        Window.mymap.openPopup(L.popup()
            .setLatLng([35.227772, -80.840916])
            .setContent('<p><strong>Synechron Uptown</strong> <br />Current seating location</p>'))
    });
    L.marker([32.7836, -79.9372]).addTo(Window.mymap).on('click', function (e) {
        Window.mymap.openPopup(L.popup()
            .setLatLng([32.7836, -79.9372])
            .setContent('<p><strong>College of Charleston</strong> <br />BS in Computer Info Systems</p>'))
    });
    L.Control.zoomHome = L.Control.extend({
        options: {
            position: 'bottomleft',
            zoomInText: '<i class="fa fa-graduation-cap" style="line-height:1.65;"></i>',
            zoomInTitle: 'College',
            zoomHomeText: '<i class="fa fa-home" style="line-height:1.65;"></i>',
            zoomHomeTitle: 'Zoom home'
        },

        onAdd: function (map) {
            var controlName = 'gin-control-zoom',
                container = L.DomUtil.create('div', controlName + ' leaflet-bar'),
                options = this.options;

            this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle,
                controlName + '-in', container, this._zoomIn);
            this._zoomHomeButton = this._createButton(options.zoomHomeText, options.zoomHomeTitle,
                controlName + '-home', container, this._zoomHome);

            this._updateDisabled();
            map.on('zoomend zoomlevelschange', this._updateDisabled, this);

            return container;
        },

        onRemove: function (map) {
            map.off('zoomend zoomlevelschange', this._updateDisabled, this);
        },

        _zoomIn: function (e) {
            Window.mymap.setView([32.7836, -79.9372], 13);
        },
        _zoomHome: function (e) {
            Window.mymap.setView([35.227772, -80.840916], 13);
        },

        _createButton: function (html, title, className, container, fn) {
            var link = L.DomUtil.create('a', className, container);
            link.innerHTML = html;
            link.href = '#';
            link.title = title;

            L.DomEvent.on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
                .on(link, 'click', L.DomEvent.stop)
                .on(link, 'click', fn, this)
                .on(link, 'click', this._refocusOnMap, this);

            return link;
        },

        _updateDisabled: function () {
            var map = this._map,
                className = 'leaflet-disabled';

            L.DomUtil.removeClass(this._zoomInButton, className);
        }
    });
    var zoomHome = new L.Control.zoomHome();
    zoomHome.addTo(Window.mymap);
}

function changeRightContainer(option) {
    $('#rightContainer').children().css({"display":"none"});
    switch(option) {
        case 'home':
            $('#rcTextBlock').css({
                "display":"block"
            });
            break;
        case 'profile':
            $('#resumeTab').css({
                "display":"block",
                "-webkit-animation": "fadein 2s"
            });
            break;
        case 'map':
            $('#mapTab').css({
                "display":"block",
                "-webkit-animation": "fadein 2s"
            });
            Window.mymap.invalidateSize();
            break;
        case 'blog':
            $('#blogTab').css({
                "display":"block",
                "-webkit-animation": "fadein 2s"
            });
            break;
    }

    function test() {
        console.log('test');
    }

}
