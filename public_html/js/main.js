$(document).ready(function () {

    /** SIDEBAR FUNCTION **/
    $('.sidebar-left ul.sidebar-menu li a').click(function () {
        "use strict";
        $('.sidebar-left li').removeClass('active');
        $(this).closest('li').addClass('active');
        var checkElement = $(this).next();
        if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
            $(this).closest('li').removeClass('active');
            checkElement.slideUp('fast');
        }
        if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
            $('.sidebar-left ul.sidebar-menu ul:visible').slideUp('fast');
            checkElement.slideDown('fast');
        }
        if ($(this).closest('li').find('ul').children().length == 0) {
            return true;
        } else {
            return false;
        }
    });

    if ($(window).width() < 1025) {
        $(".sidebar-left").removeClass("sidebar-nicescroller");
        $(".sidebar-right").removeClass("right-sidebar-nicescroller");
        $(".nav-dropdown-content").removeClass("scroll-nav-dropdown");
    }
    /** END SIDEBAR FUNCTION **/

    /** BUTTON TOGGLE FUNCTION **/
    $(".btn-collapse-sidebar-left").click(function () {
        "use strict";
        $(".top-navbar").toggleClass("toggle");
        $(".sidebar-left").toggleClass("toggle");
        $(".page-content").toggleClass("toggle");
        $(".icon-dinamic").toggleClass("rotate-180");

        if ($(window).width() > 991) {
            if ($(".sidebar-right").hasClass("toggle-left") === true) {
                $(".sidebar-right").removeClass("toggle-left");
                $(".top-navbar").removeClass("toggle-left");
                $(".page-content").removeClass("toggle-left");
                $(".sidebar-left").removeClass("toggle-left");
                if ($(".sidebar-left").hasClass("toggle") === true) {
                    $(".sidebar-left").removeClass("toggle");
                }
                if ($(".page-content").hasClass("toggle") === true) {
                    $(".page-content").removeClass("toggle");
                }
            }
        }
        $(document).trigger("viewport.update");
    });
    $(".btn-collapse-nav").click(function () {
        "use strict";
        $(".icon-plus").toggleClass("rotate-45");
    });
    /** END BUTTON TOGGLE FUNCTION **/

    /** BOF MAP */
    var map = L.map('map').setView([49.8327786, 23.9420238], 11);
    var googleLayer = new L.Google('ROADMAP');
    map.addLayer(googleLayer);
    function mapResize() {
        setTimeout(function () {
            map.invalidateSize();
        }, 320);
    }
    $(document).on("viewport.update", function () {
        mapResize();
    });
    $(window).on("resize", function () {
        mapResize();
    });
    /** EOF MAP */

    var $filterForm = $("#form-filter");
    $('input').on('change', function () {
        mapLoadData();
    });
    function mapLoadData() {

        var kmlLayer = new L.KML('api.php?' + $filterForm.serialize(), {async: true});
        kmlLayer.on("loaded", function (e) {
            map.fitBounds(e.target.getBounds());
        });
        map.addLayer(kmlLayer);

//        var geojsonTileLayer = new L.TileLayer.GeoJSON('api.php?' + $filterForm.serialize(), {
//            clipTiles: true,
//            unique: function (feature) {
//                return feature.id;
//            }
//        }, {
//            style: style,
//            onEachFeature: function (feature, layer) {
//                if (feature.properties) {
//                    var popupString = '<div class="popup">';
//                    for (var k in feature.properties) {
//                        var v = feature.properties[k];
//                        popupString += k + ': ' + v + '<br />';
//                    }
//                    popupString += '</div>';
//                    layer.bindPopup(popupString);
//                }
//                if (!(layer instanceof L.Point)) {
//                    layer.on('mouseover', function () {
//                        layer.setStyle(hoverStyle);
//                    });
//                    layer.on('mouseout', function () {
//                        layer.setStyle(style);
//                    });
//                }
//            }
//        }
//        );
//        map.addLayer(geojsonTileLayer);
    }
});