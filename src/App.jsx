import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AccordionList from './components/AccordionList';
import { sortLocationsByDistance } from './utils/sortLocations';
import { remainingLocations } from './data/remaining_locations';
import AppTitle from './components/AppTitle';
import ReactModal from 'react-modal';
import AppHeader from './components/AppHeader';


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
  const [locations] = useState(remainingLocations);
  const [userLocation, setUserLocation] = useState(null);
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
  const [sortedLocations, setSortedLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(true); // Modal starts open

    const closeModal = () => {
        setIsModalOpen(false);
    };

  useEffect(() => {
    // Get user's location only once initially
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
          // Sort locations when user location is updated
          const sorted = sortLocationsByDistance(locations, newUserLocation);
          setSortedLocations(sorted);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Use default NYC location if geolocation fails
          const defaultLocation = { lat: 40.7128, lng: -74.0060 };
          setUserLocation(defaultLocation);
          const sorted = sortLocationsByDistance(locations, defaultLocation);
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
  }, [locations]);

  const handleViewMap = (location) => {
    // Add smooth animation to center changes
    
    setCenter({
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lng)
    });
  };

  const sidebarStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '300px',
    maxHeight: 'calc(100vh - 20px)',
    overflowY: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '10px',
    borderRadius: '8px',
    zIndex: 1000,
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <AppHeader />
      
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <ChangeView center={center} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {/* User location circle */}
        {userLocation && (
          <Circle
            center={[userLocation.lat, userLocation.lng]}
            radius={500}
            pathOptions={{ color: '#4285F4', fillColor: '#4285F4', fillOpacity: 0.2 }}
          />
        )}
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
          >
            <Popup>
              <div>
                <h3>{location.Location}</h3>
                <p>Time: {location.Time}</p>
                <p>Route: {location.Route}</p>
                {userLocation && (
                  <>
                    <p>Distance: {sortLocationsByDistance([location], userLocation)[0].distance.toFixed(2)} miles</p>
                    <p>Walking time: {Math.round(sortLocationsByDistance([location], userLocation)[0].distance/ 3.1 * 60)+12} minutes</p>
                  </>
                )}
                <a href={location.link} target="_blank" rel="noopener noreferrer">
                  View on Google Maps
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="App Instructions"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2>Welcome to MealFinder, here to help you find food</h2>
                <p>
                    Before you start to use MealFinder, MAKE SURE YOUR LOCATION SERVICES ARE ENABLED. IF NOT, THE APP WILL NOT WORK <br></br>
                    <br></br>
                    Here is how to <a href={"https://support.apple.com/en-us/HT207092"} target="_blank" rel="noopener noreferrer">
                               enable location services on your device
                  </a>
                    <br></br>
                    <br></br>
                  ----------------------------------------------------------------------------------------------------------- 
                    </p>
                    <p>
                    Here's How To Use It:
                    </p>
                <ul>
                <li>The locations of all the food truck stops is on the right, with the 5 closest at the top</li>
                    <li>Zoom in or click the "view on map" button to get a closer look</li>
                    <li>Click the Marker for more information, including the google maps link for directions</li>
                    <li>On the right are suggestions on when to leave for each stop</li>
                    <li>Make sure to leave early! We've added a 7-minute cushion to all durations.
                      Disclamer - This app is for demonstration purposes only. The walking times are based on a 3.1 mph walking speed and do not account for real-world conditions. Please Leave very early for each stop
                    </li>
                </ul>
                <button onClick={closeModal} className="close-button">Got It!</button>
            </ReactModal>
    
      <div style={sidebarStyle} position="relative" marginTop="10px">
        
        <AccordionList
          locations={sortedLocations}
          isLoading={isLoading}
          onViewMap={handleViewMap}
        />
      </div>
    </div>
  );
}

export default App;
