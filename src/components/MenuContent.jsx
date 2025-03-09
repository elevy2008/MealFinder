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
        mode === 'need-help' ? 
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

We're constantly updating our database to provide the most accurate and helpful information possible.` :
        `MealFinder connects compassionate individuals like you with opportunities to make a real difference in fighting food insecurity across New York City.

Our platform brings together various ways to help:
• Volunteer at food distribution programs
• Donate to food banks and pantries
• Support advocacy initiatives
• Join community support programs
• Participate in food rescue missions

Why Your Help Matters:
• 1.2 million NYC residents face food insecurity
• 1 in 4 children don't have reliable access to food
• Food pantries see 65% more visitors than pre-pandemic
• Many locations need consistent volunteer support

The app helps you:
• Find nearby volunteer opportunities
• Locate donation centers
• Connect with advocacy groups
• Join support services
• Engage with community resources

Together, we can make a significant impact in our community.`)}
      >
        About
      </div>

      <div 
        style={{ padding: '10px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }} 
        onClick={() => handleItemClick("FAQs", 
        mode === 'need-help' ?
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
   • ${createLink("sms:877-877?&body=FOOD", "Text 'FOOD' to 877-877")} for summer meals` :
        `Frequently Asked Questions:

1. How can I help?
   • Volunteer at food distribution centers
   • Donate food or supplies
   • Support advocacy initiatives
   • Provide professional services
   • Join community programs

2. What kind of volunteers are needed?
   • Food preparation and service
   • Delivery drivers
   • Pantry organizers
   • Administrative support
   • Fundraising assistance
   • Professional services (legal, medical, social work)

3. What can I donate?
   • Non-perishable food items
   • Fresh produce (check with location first)
   • Personal care items
   • Baby supplies
   • Financial contributions

4. Time commitments:
   • One-time opportunities available
   • Regular weekly/monthly positions
   • Flexible scheduling at most locations
   • Both daytime and evening shifts

5. Getting started:
   • Click on markers for specific opportunities
   • Contact organizations directly through provided links
   • Complete any required training
   • Sign up for available shifts

6. COVID-19 protocols:
   • Follow location-specific guidelines
   • Wear appropriate PPE
   • Complete health screenings if required
   • Practice social distancing`)}>
        FAQs
      </div>

      <div 
        style={{ padding: '10px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }} 
        onClick={() => handleItemClick(mode === 'need-help' ? "Help/Donate Now" : "Volunteer/Donate", 
        mode === 'need-help' ?
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

For corporate donations, sponsorships, or large-scale volunteering, please ${createLink("mailto:ethanjonathanlevy@gmail.com", "email us")}.` :
        `Get Involved Today:

Volunteer Opportunities:

1. Food Distribution Programs
   • ${createLink("https://www.coalitionforthehomeless.org/volunteer/", "Coalition for the Homeless")}
     - Evening food truck routes
     - Meal preparation
     - Food sorting and packing
   
2. Food Banks & Pantries
   • ${createLink("https://www.foodbanknyc.org/volunteer/", "Food Bank For New York City")}
     - Warehouse operations
     - Food sorting
     - Client services
   
3. Food Rescue
   • ${createLink("https://www.cityharvest.org/volunteer/", "City Harvest")}
     - Food rescue operations
     - Delivery assistance
     - Market collection

4. Community Support
   • ${createLink("https://www.bowery.org/volunteer/", "Bowery Mission")}
     - Meal service
     - Clothing distribution
     - Resource center support

Donation Opportunities:

1. Financial Contributions
   • ${createLink("https://www.coalitionforthehomeless.org/donate/", "Coalition for the Homeless")}
   • ${createLink("https://www.foodbanknyc.org/donate/", "Food Bank NYC")}
   • ${createLink("https://www.cityharvest.org/donate/", "City Harvest")}

2. Food Donations
   • Non-perishable items
   • Fresh produce
   • Bulk donations
   
3. Supply Donations
   • Personal care items
   • Baby supplies
   • Winter clothing

4. Professional Services
   • Legal assistance
   • Healthcare services
   • Administrative support
   • Marketing and outreach

Corporate Partnerships:
• ${createLink("https://www.foodbanknyc.org/partner/", "Corporate volunteer programs")}
• Matching gift programs
• Sponsorship opportunities
• Food drive organizing

Contact ${createLink("mailto:ethanjonathanlevy@gmail.com", "ethanjonathanlevy@gmail.com")} for:
• Large group volunteering
• Corporate partnerships
• Special initiatives
• Custom programs`)}>
        {mode === 'need-help' ? 'Help/Donate Now' : 'Volunteer/Donate'}
      </div>

      <div 
        style={{ padding: '10px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }} 
        onClick={() => handleItemClick("Contact", 
        mode === 'need-help' ?
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

Your feedback helps us improve MealFinder and serve our community better.` :
        `Contact Information:

Volunteer & Donation Inquiries:
${createLink("mailto:ethanjonathanlevy@gmail.com", "ethanjonathanlevy@gmail.com")}

Partner Organizations:
• ${createLink("https://www.coalitionforthehomeless.org/", "Coalition for the Homeless")}
• ${createLink("https://www.foodbanknyc.org/", "Food Bank For New York City")}
• ${createLink("https://www.cityharvest.org/", "City Harvest")}
• ${createLink("https://www.bowery.org/", "Bowery Mission")}

Get Involved:
• Organization partnerships
• Corporate volunteering
• Food drive coordination
• Special initiatives

Report Updates:
• New volunteer opportunities
• Changed schedules
• Additional resources
• Program updates

Your involvement helps us expand our impact and serve more people in need.`)}>
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