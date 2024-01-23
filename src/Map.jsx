import L from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import chariot from './Images/chariot.png';
import { center, end, route, start } from './datapoints';
const customIcon = new L.Icon({
    iconUrl: chariot, // Replace with the path to your custom icon
    iconSize: [32, 32], // Adjust the size of your icon
    iconAnchor: [16, 32], // Adjust the anchor point of your icon
    popupAnchor: [0, -32], // Adjust the popup anchor point if you have popups
});

const path = antPath(route, {
    "delay": 1000,
    "dashArray": [
        12,
        12
    ],
    "weight": 3,
    "color": "#0000FF",
    "pulseColor": "#FFFFFF",
    "paused": false,
    "reverse": true,
    "hardwareAccelerated": true
});
const MapComponent = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (!map) return;
        map.addLayer(path);
    }, [map]);


    useEffect(() => {
        // Set interval to update the currentIndex every 2000 milliseconds (2 seconds)
        const intervalId = setInterval(() => {
            // Update the currentIndex to the next index or loop back to the beginning if at the end
            setCurrentIndex((prevIndex) => (prevIndex + 1) % route.length);
        }, 2000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);

    const item = route[currentIndex] ?? route[0];
    return <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: '100vh' }} whenCreated={(map) => setMap(map)}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={start}>
            <Popup>{'Nagarathar Kovil Veedu'}</Popup>
        </Marker>
        <Marker position={[item.lat, item.lon]} key={item.roadName + item.lat + item.lon} icon={customIcon}>
            <Popup>{item.roadName}</Popup>
        </Marker>
        <Marker position={end} >
            <Popup>Temple</Popup>
        </Marker>
    </MapContainer>
}

export default MapComponent