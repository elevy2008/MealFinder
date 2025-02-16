import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AccordionList from './components/AccordionList';
import HamburgerMenu from './components/HamburgerMenu';
import MenuContent from './components/MenuContent';
import { sortLocationsByDistance } from './utils/sortLocations';
import { remainingLocations } from './data/remaining_locations';

// Fix for default marker icon
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true, duration: 0.5 });
  }, [center, map]);
  return null;
}

function CenterMapButton({ userLocation }) {
  const map = useMap();
  
  if (!userLocation) return null;

  return (
    <button
      onClick={() => map.setView([userLocation.lat, userLocation.lng], map.getZoom())}
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        padding: '10px',
        backgroundColor: 'white',
        border: 'none',
        borderRadius: '4px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        cursor: 'pointer'
      }}
    >
      Center to My Location
    </button>
  );
}

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [sortedLocations, setSortedLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const setDefaultLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newLocation);
          setCenter(newLocation);
          const sorted = sortLocationsByDistance(remainingLocations, newLocation);
          setSortedLocations(sorted);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          const defaultLocation = { lat: 40.7128, lng: -74.0060 };
          setCenter(defaultLocation);
          const sorted = sortLocationsByDistance(remainingLocations, defaultLocation);
          setSortedLocations(sorted);
          setIsLoading(false);
        }
      );
    } else {
      const defaultLocation = { lat: 40.7128, lng: -74.0060 };
      setCenter(defaultLocation);
      const sorted = sortLocationsByDistance(remainingLocations, defaultLocation);
      setSortedLocations(sorted);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setDefaultLocation();
  }, []);

  const handleViewMap = (location) => {
    setCenter({ lat: parseFloat(location.lat), lng: parseFloat(location.lng) });
  };

  return (
    <>
      <HamburgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)} isOpen={isMenuOpen} />
      <MenuContent isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <div style={{ position: 'fixed', right: '20px', top: '20px', width: '300px', zIndex: 1001 }}>
        <AccordionList locations={sortedLocations} isLoading={isLoading} onViewMap={handleViewMap} />
      </div>

      <div style={{ position: 'relative', height: '100vh', zIndex: 1 }}>
        <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
          <ChangeView center={center} />
          <CenterMapButton userLocation={userLocation} />
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {sortedLocations.map((location, index) => (
            <Marker key={index} position={[location.lat, location.lng]}>
              <Popup>
                <div>
                  <h3>{location.Location}</h3>
                  <p>Time: {location.Time}</p>
                  <p>Route: {location.Route}</p>
                  <a href={location.link} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

export default App;
