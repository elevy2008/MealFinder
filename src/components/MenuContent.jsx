import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import ToggleSwitch from './ToggleSwitch';

const MenuContent = ({ isOpen, onClose, mode, setMode }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  if (!isOpen) return null;

  const handleItemClick = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };

  const createLink = (url, text) => `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #4285F4; text-decoration: underline;">${text}</a>`;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '250px',
      height: '100vh',
      backgroundColor: 'white',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s ease-in-out',
      zIndex: 999
    }}>
      <h2 style={{ marginTop: '60px', marginBottom: '20px' }}>MealFinder</h2>      

      <div style={{ marginBottom: '20px' }}>
        <ToggleSwitch mode={mode} setMode={setMode} />
      </div>

      <div 
        style={{ padding: '10px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }} 
        onClick={() => handleItemClick("About MealFinder", 
        `MealFinder was created to help connect people with food resources across New York City.

The idea originated while volunteering at the Coalition for the Homeless's Grand Central Food Program. One evening, while distributing meals, we ran out of food with over 50 individuals still waiting. Many remained there throughout the night, unaware of other nearby food resources—they went to sleep hungry.

This experience inspired MealFinder, which now helps people locate:
• Food trucks with free meals
• Food pantries across all boroughs
• Emergency shelters
• Places to volunteer and donate

Our mission is to ensure no one goes hungry simply because they couldn't find available resources.

The app provides:
• Real-time locations
• Operating hours
• Walking directions
• Distance information
• Additional services available

We're constantly updating our database to provide the most accurate and helpful information possible.`)}
      >
        About
      </div>

      <div 
        style={{ padding: '10px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }} 
        onClick={() => handleItemClick("FAQs", 
        `Frequently Asked Questions:

1. How does MealFinder work?
   • Shows nearby food resources based on your location
   • Displays routes, schedules, and walking directions
   • Calculates arrival times and distances
   • Updates in real-time as you move

2. Food Truck Information:
   • ${createLink("https://www.coalitionforthehomeless.org/our-programs/food/", "Coalition for the Homeless")} (Downtown Route):
     - 7:15 PM: 35th St. under FDR Drive
     - 7:45 PM: Chinatown, Lafayette & Leonard St.
     - 8:00 PM: Staten Island Ferry Terminal
     - 8:20 PM: ${createLink("https://www.bowery.org/", "Bowery Mission")}
     - 8:45 PM: Madison Square Park
     - 9:15 PM: Penn Station

   • ${createLink("https://www.coalitionforthehomeless.org/our-programs/food/", "Coalition for the Homeless")} (Uptown Route):
     - 7:15 PM: 51st St. & Broadway
     - 7:35 PM: Port Authority
     - 7:55 PM: 79th St. Boat Basin
     - 8:15 PM: 86th St. & West End Ave.
     - 8:30 PM: ${createLink("https://www.stjohndivine.org/", "Cathedral of St. John")}
     - 8:45 PM: ${createLink("https://www.nychealthandhospitals.org/harlem/", "Harlem Hospital")}
     - 9:00 PM: Lexington Ave & 124th St.
     - 9:15 PM: Central Park (5th Ave. & 72nd St.)

   • ${createLink("https://www.coalitionforthehomeless.org/our-programs/food/", "Coalition for the Homeless")} (Bronx Route):
     - 7:30 PM: Randall & Bryant Ave.
     - 7:40 PM: Lafayette & Manida St.
     - 8:00 PM: ${createLink("https://www.nychealthandhospitals.org/lincoln/", "Lincoln Hospital")}
     - 8:25 PM: 164th St. & Ogden Ave.
     - 8:30 PM: 170th St. & Jerome Ave.
     - 8:45 PM: Fordham Rd. & University Ave.
     - 9:10 PM: Fordham Rd. & Webster Ave.

3. Emergency Resources:
   • ${createLink("tel:311", "Call 311")} for emergency food assistance
   • ${createLink("tel:866-888-8777", "NYC Emergency Food Line")}: 866-888-8777
   • ${createLink("tel:888-692-9355", "Crisis Services")}: 888-692-9355
   • ${createLink("sms:877-877?&body=FOOD", "Text 'FOOD' to 877-877")} for summer meals`)}>
        FAQs
      </div>

      <div 
        style={{ padding: '10px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }} 
        onClick={() => handleItemClick("Help/Donate Now", 
        `Ways to Help:

1. Coalition for the Homeless
   • ${createLink("https://www.coalitionforthehomeless.org/donate/", "Donate Now")}
   • ${createLink("https://www.coalitionforthehomeless.org/volunteer/", "Volunteer Opportunities")}
   • ${createLink("mailto:fooddrive@cfthomeless.org", "Email Food Drive Coordinator")}
   • ${createLink("https://www.coalitionforthehomeless.org/our-programs/food/", "Grand Central Food Program")}

2. Food Bank For New York City
   • ${createLink("https://www.foodbanknyc.org/donate/", "Donate Now")}
   • ${createLink("https://www.foodbanknyc.org/volunteer/", "Volunteer")}
   • ${createLink("https://www.foodbanknyc.org/partner/", "Corporate Partnerships")}

3. City Harvest
   • ${createLink("https://www.cityharvest.org/donate/", "Donate Now")}
   • ${createLink("https://www.cityharvest.org/volunteer/", "Volunteer")}
   • ${createLink("https://www.cityharvest.org/food-rescue/", "Food Rescue Program")}

4. Bowery Mission
   • ${createLink("https://www.bowery.org/donate/", "Donate Now")}
   • ${createLink("https://www.bowery.org/volunteer/", "Volunteer")}
   • ${createLink("https://www.bowery.org/meals/", "Meal Service Program")}

5. New York Common Pantry
   • ${createLink("https://nycommonpantry.org/donate/", "Donate Now")}
   • ${createLink("https://nycommonpantry.org/volunteer/", "Volunteer")}

6. Holy Apostles Soup Kitchen
   • ${createLink("https://holyapostlesnyc.org/donate/", "Donate Now")}
   • ${createLink("https://holyapostlesnyc.org/volunteer/", "Volunteer")}

How Your Help Makes a Difference:
• $10 provides 20 meals
• $25 feeds a family for a week
• $100 supports a pantry for a day
• Volunteering 3 hours serves 200+ people

All donations are tax-deductible. Organizations provide receipts for tax purposes.

Additional Resources:
• ${createLink("https://www.nyc.gov/site/dhs/index.page", "NYC Department of Homeless Services")}
• ${createLink("https://www.nyc.gov/site/hra/index.page", "NYC Human Resources Administration")}
• ${createLink("https://www.feedingamerica.org/find-your-local-foodbank", "Find Your Local Food Bank")}

For corporate donations, sponsorships, or large-scale volunteering, please ${createLink("mailto:ethanjonathanlevy@gmail.com", "email us")}.`)}>
        Help/Donate Now
      </div>

      <div 
        style={{ padding: '10px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }} 
        onClick={() => handleItemClick("Contact", 
        `Contact Information:

App Support & General Inquiries:
${createLink("mailto:ethanjonathanlevy@gmail.com", "ethanjonathanlevy@gmail.com")}

Emergency Food Assistance:
• ${createLink("tel:866-888-8777", "NYC Emergency Food Line")}: 866-888-8777
• ${createLink("tel:311", "311")} for immediate assistance
• ${createLink("tel:888-692-9355", "Crisis Services")}: 888-692-9355

Online Resources:
• ${createLink("https://www.nyc.gov/site/foodpolicy/index.page", "NYC Office of Food Policy")}
• ${createLink("https://www.ny.gov/services/apply-snap", "Apply for SNAP Benefits")}
• ${createLink("https://access.nyc.gov/", "ACCESS NYC Benefits")}

Report Issues:
• Location updates
• App functionality
• Schedule changes
• New resources to add

Your feedback helps us improve MealFinder and serve our community better.`)}>
        Contact
      </div>

      <div 
        style={{ padding: '10px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }} 
        onClick={() => handleItemClick("Developer", 
        `About the Developer:

Ethan Levy
NYC High School Student & Social Entrepreneur

Mission:
Using technology to address food insecurity and create positive social impact in New York City.

Background:
• Self-taught programmer
• Volunteer at Coalition for the Homeless
• Advocate for food security
• Technology for social good

Contact:
Email: ethanjonathanlevy@gmail.com

Looking to:
• Partner with organizations
• Expand the platform
• Improve features
• Help more people

Thank you for using MealFinder and being part of the solution to food insecurity in NYC.`)}>
        By Ethan Levy
      </div>

      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          bottom: '65px',
          left: '75px',
          padding: '10px 20px',
          backgroundColor: '#4285F4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Close Menu
      </button>

      {modalOpen && (
        <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
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
              width: '400px',
              maxHeight: '80vh',
              textAlign: 'left',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              zIndex: 1001,
              overflowY: 'auto'
            }}>
              <Dialog.Title style={{ marginBottom: '15px', color: '#4285F4' }}>{modalTitle}</Dialog.Title>
              <div 
                style={{ 
                  whiteSpace: 'pre-line',
                  lineHeight: '1.5',
                  fontSize: '14px'
                }}
                dangerouslySetInnerHTML={{ __html: modalContent }}
              />
              <Dialog.Close asChild>
                <button style={{
                  marginTop: '20px',
                  padding: '8px 16px',
                  backgroundColor: '#4285F4',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%'
                }}>
                  Close
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </div>
  );
};

export default MenuContent;