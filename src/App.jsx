import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AccordionList from './components/AccordionList';
import HamburgerMenu from './components/HamburgerMenu';
import MenuContent from './components/MenuContent';
import { sortLocationsByDistance } from './utils/sortLocations';
import { remainingLocations } from './data/remaining_locations';
import ReactModal from 'react-modal';

// Set the app element for accessibility
ReactModal.setAppElement('#root');

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

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [sortedLocations, setSortedLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newUserLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newUserLocation);
          setCenter(newUserLocation);
          const sorted = sortLocationsByDistance(remainingLocations, newUserLocation);
          setSortedLocations(sorted);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          const defaultLocation = { lat: 40.7128, lng: -74.0060 };
          setUserLocation(defaultLocation);
          const sorted = sortLocationsByDistance(remainingLocations, defaultLocation);
          setSortedLocations(sorted);
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 30000
        }
      );
    }
  }, []);

  const handleViewMap = (location) => {
    setCenter({ lat: parseFloat(location.lat), lng: parseFloat(location.lng) });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <HamburgerMenu onClick={toggleMenu} isOpen={isMenuOpen} />
      
      <ReactModal 
        isOpen={isMenuOpen}
        onRequestClose={toggleMenu}
        contentLabel="Menu"
      >
        <MenuContent onClose={toggleMenu} />
      </ReactModal>

      <div style={{ position: 'fixed', right: '20px', top: '20px', width: '300px', zIndex: 1001 }}>
        <AccordionList locations={sortedLocations} isLoading={isLoading} onViewMap={handleViewMap} />
      </div>

      <div style={{ position: 'relative', height: '100vh', zIndex: 1 }}>
        <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
          <ChangeView center={center} />
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {userLocation && (
            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={500}
              pathOptions={{ color: '#4285F4', fillColor: '#4285F4', fillOpacity: 0.2 }}
            />
          )}
          {sortedLocations.map((location, index) => (
            <Marker key={index} position={[location.lat, location.lng]}>
              <Popup>
                <div>
                  <h3>{location.Location}</h3>
                  <p>Time: {location.Time}</p>
                  <p>Route: {location.Route}</p>
                  {userLocation && (
                    <p>Distance: {sortLocationsByDistance([location], userLocation)[0].distance.toFixed(1)} miles</p>
                  )}
                  <a href={location.link} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <ReactModal 
          isOpen={isModalOpen} 
          onRequestClose={closeModal} 
          contentLabel="App Instructions"
          className="welcome-modal"
        >
          <div className="modal-content">
            <h2>Welcome to MealFinder</h2>
            <div className="instructions">
              <h3>How to use:</h3>
              <ul>
                <li>Enable location services for accurate results</li>
                <li>View food truck locations sorted by distance</li>
                <li>Click "View on Map" to locate trucks</li>
                <li>Check "Leave at" times to plan your walk (includes 8-minute buffer)</li>
                <li>Use menu (☰) for more information</li>
              </ul>
              <p className="tip">Tip: Plan ahead using the "Leave at" times which include a buffer for unexpected delays.</p>
            </div>
            <button className="close-button" onClick={closeModal}>Got It!</button>
          </div>
        </ReactModal>
      </div>
    </>
  );
}

export default App;
