import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import chariot from './Images/chariot.png';
import { center, end, polyline, route, start } from './datapoints';
const customIcon = new L.Icon({
    iconUrl: chariot, // Replace with the path to your custom icon
    iconSize: [32, 32], // Adjust the size of your icon
    iconAnchor: [16, 32], // Adjust the anchor point of your icon
    popupAnchor: [0, -32], // Adjust the popup anchor point if you have popups
});
const MapComponent = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [dashOffset, setDashOffset] = useState(0);

    useEffect(() => {
        // Animate the polyline by updating dashOffset at regular intervals
        const intervalId = setInterval(() => {
            setDashOffset((prevOffset) => (prevOffset + 1) % 15); // Adjust as needed
        }, 100);

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);


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
    return <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: '100vh' }}>
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
        <Polyline positions={polyline} color="#dd7a8eeb"
            dashArray="5, 10" // Adjust these values for the desired dotted line appearance
            dashOffset={dashOffset} />
    </MapContainer>
}

export default MapComponent