Elevator Pitch
Have you ever been frustrated by long wait times at popular restaurants or not knowing which location would be the quickest for a group meetup? The QuickDine app allows users to check real-time wait times and table availability at nearby restaurants. You can also make a reservation or place your order in advance to skip the line. The app integrates with restaurants’ seating systems to display up-to-the-minute updates. With QuickDine, you can gather your group, check for available tables, and dine faster without the hassle.

Design
Mock
This sequence diagram illustrates how users would interact with the backend to view availability, reserve tables, and place orders.

Key Features
Secure login using OAuth
Real-time updates of table availability
Reservation and pre-ordering functionality
Options for restaurant filtering based on location, cuisine, and wait time
Push notifications for table availability and order readiness
Persistent data storage for user preferences and order history
Admin access for restaurant staff to update wait times, manage reservations, and table statuses
Technologies
Here’s how I plan to use the required technologies:
HTML

Structured pages for login, restaurant browsing, and reservation management
Links between restaurant listings and detailed availability pages
CSS

Responsive layout that works well on all screen sizes
Clean and modern design, focusing on usability and good contrast
React

Login, restaurant listings, and order management are implemented as components
Use of hooks to track table availability and reservations
Routing between restaurant details, reservation, and order confirmation pages
Service

Backend services that handle:
User login
Fetching real-time data on restaurant availability
Submitting reservations and orders
Fetching order status
DB/Login

MongoDB to store user preferences, reservations, and order history
Secure authentication using OAuth
Only authenticated users can make reservations or pre-orders
WebSocket

Real-time updates of table availability using WebSocket
Broadcast restaurant updates (e.g., order status, table readiness) to all connected users
HTML Deliverable
For this deliverable, I created the basic structure for the application using HTML.

HTML Pages: Two pages – one for login, and another for restaurant browsing and reservations
Links: The restaurant browsing page contains links to individual restaurant detail pages
Text: Each restaurant's availability is displayed as text
Images: Placeholder images for restaurant logos
DB/Login: Login form and input fields to pull user data from the database
WebSocket: Display real-time table availability using WebSocket connection

