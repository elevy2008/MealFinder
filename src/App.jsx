import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AccordionList from './components/AccordionList';
import HamburgerMenu from './components/HamburgerMenu';
import MenuContent from './components/MenuContent';
import TypeFilter from './components/TypeFilter';
import { sortLocationsByDistance } from './utils/sortLocations';
import { remainingLocations } from './data/remaining_locations';
import { helpLocations } from './data/help_locations';
import ToggleSwitch from './components/ToggleSwitch';
import ReactModal from 'react-modal';
import * as Dialog from '@radix-ui/react-dialog';

// Set the app element for accessibility
ReactModal.setAppElement('#root');

// Marker icons
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const PantryIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ShelterIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Help mode icons
const VolunteerIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const DonationIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const AdvocacyIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const SupportIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const CommunityIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function MoveZoomControl() {
  const map = useMap();

  useEffect(() => {
    const zoomControl = document.querySelector('.leaflet-control-zoom');
    if (zoomControl) {
      zoomControl.style.position = 'absolute';
      zoomControl.style.bottom = '20px';
      zoomControl.style.right = '20px';
      zoomControl.style.left = 'auto';
    }
  }, []);
}

function CenterMapButton({ userLocation }) {
  const map = useMap();

  if (!userLocation) return null;

  return (
    <button
      onClick={() => map.setView([userLocation.lat, userLocation.lng], 13)}
      style={{
        position: 'fixed',
        top: '20px',
        left: '70px',
        zIndex: 998,
        padding: '10px',
        backgroundColor: 'white',
        border: 'none',
        borderRadius: '4px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        height: '40px',
        width: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      📍
    </button>
  );
}

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
  const [selectedTypes, setSelectedTypes] = useState(['food_truck', 'pantry', 'shelter']);
  const [helpSelectedTypes, setHelpSelectedTypes] = useState(['volunteer', 'donation', 'advocacy', 'support', 'community']);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [mode, setMode] = useState('need-help'); // 'need-help' or 'want-to-help'

  const handleTypeFilter = (type) => {
    if (mode === 'need-help') {
      setSelectedTypes(prev => 
        prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
      );
    } else {
      setHelpSelectedTypes(prev => 
        prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
      );
    }
  };

  useEffect(() => {
    setIsWelcomeModalOpen(true); // Show welcome popup when app loads
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

          // Load appropriate locations based on mode
          const locations = mode === 'need-help' ? 
            [...remainingLocations] : 
            [...helpLocations];

          const sorted = sortLocationsByDistance(locations, newUserLocation);
          setSortedLocations(sorted);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          const defaultLocation = { lat: 40.7128, lng: -74.0060 };
          setUserLocation(defaultLocation);

          // Load appropriate locations based on mode
          const locations = mode === 'need-help' ? 
            [...remainingLocations] : 
            [...helpLocations];

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
  }, [mode]); // Re-run when mode changes

  const handleViewMap = (location) => {
    setCenter({ lat: parseFloat(location.lat), lng: parseFloat(location.lng) });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Get current active types based on mode
  const activeTypes = mode === 'need-help' ? selectedTypes : helpSelectedTypes;

  // Get filtered locations based on mode and selected types
  const filteredLocations = sortedLocations.filter(loc => activeTypes.includes(loc.type));

  // Function to get the appropriate icon based on location type and mode
  const getMarkerIcon = (locationType) => {
    if (mode === 'need-help') {
      switch (locationType) {
        case 'food_truck': return DefaultIcon;
        case 'pantry': return PantryIcon;
        case 'shelter': return ShelterIcon;
        default: return DefaultIcon;
      }
    } else {
      switch (locationType) {
        case 'volunteer': return VolunteerIcon;
        case 'donation': return DonationIcon;
        case 'advocacy': return AdvocacyIcon;
        case 'support': return SupportIcon;
        case 'community': return CommunityIcon;
        default: return DefaultIcon;
      }
    }
  };

  // Function to get location type label based on type and mode
  const getTypeLabel = (locationType) => {
    if (mode === 'need-help') {
      switch (locationType) {
        case 'food_truck': return 'Food Truck';
        case 'pantry': return 'Food Pantry';
        case 'shelter': return 'Shelter';
        default: return locationType;
      }
    } else {
      switch (locationType) {
        case 'volunteer': return 'Volunteer Opportunity';
        case 'donation': return 'Donation Center';
        case 'advocacy': return 'Advocacy Organization';
        case 'support': return 'Support Service';
        case 'community': return 'Community Resource';
        default: return locationType;
      }
    }
  };

  return (
    <>
      <HamburgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)} isOpen={isMenuOpen} />
      <MenuContent isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} mode={mode} setMode={setMode} />

      {/* Welcome Popup (Appears on App Load) */}
      <Dialog.Root open={isWelcomeModalOpen} onOpenChange={setIsWelcomeModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            inset: 0,
            zIndex: 1000
          }} />
          <Dialog.Content style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '300px',
            textAlign: 'center',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1001
          }}>
            <Dialog.Title>Welcome to MealFinder!</Dialog.Title>
            <p>Find your next meal</p>
            <p>Make sure your location services are enabled</p>
            <p>Click the dropdown menu of food truck locations, and find the five closest locations at the top</p>
            <p>It has all of the information you need, and if you click on the marker, you will find a link right to the Google Map directions!</p>
            <p>Hope this helps, and make sure to leave on time!!!!!!</p>

            {/* Toggle Switch in Welcome Popup */}
            <div style={{ marginTop: '15px', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
              <ToggleSwitch mode={mode} setMode={setMode} />
            </div>

            <Dialog.Close asChild>
              <button style={{
                marginTop: '15px', padding: '8px 16px', backgroundColor: '#4285F4', 
                color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'
              }}>
                Get Started
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <ReactModal 
        isOpen={isMenuOpen}
        onRequestClose={toggleMenu}
        contentLabel="Menu"
      >
        <MenuContent onClose={toggleMenu} mode={mode} setMode={setMode} />
      </ReactModal>

      <TypeFilter selectedTypes={activeTypes} onTypeSelect={handleTypeFilter} mode={mode} />

      <div style={{ position: 'fixed', right: '0px', top: '15px', width: '300px', zIndex: 1001 }}>
        <AccordionList 
          locations={filteredLocations} 
          isLoading={isLoading} 
          onViewMap={handleViewMap} 
        />
      </div>

      <div style={{ position: 'relative', height: '100vh', zIndex: 1 }}>
        <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
          <ChangeView center={center} />
          <CenterMapButton userLocation={userLocation} />
          <MoveZoomControl />
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
          {filteredLocations.map((location, index) => (
            <Marker 
              key={index} 
              position={[location.lat, location.lng]}
              icon={getMarkerIcon(location.type)}
            >
              <Popup>
                <div>
                  <h3>{location.Location}</h3>
                  <p>Type: {getTypeLabel(location.type)}</p>
                  <p>Time: {location.Time}</p>
                  <p>Route: {location.Route}</p>
                  {location.description && <p>Description: {location.description}</p>}
                  {userLocation && (
                    <p>Distance: {sortLocationsByDistance([location], userLocation)[0].distance.toFixed(1)} miles</p>
                  )}
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