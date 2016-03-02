<?php

$kmlOutput = '<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://earth.google.com/kml/2.2"><Document>';
if (isset($_REQUEST['region']) && is_array($_REQUEST['region'])) {

    $basePath = dirname(__FILE__) . '/regions/';
    foreach ($_REQUEST['region'] as $region) {

        if (file_exists($basePath . $region)) {

            $kmlOutput .= file_get_contents($basePath . $region);
        }
    }
}
$kmlOutput.='</Document></kml>';
header('Content-type: application/vnd.google-earth.kml+xml');
echo $kmlOutput;
exit;
