import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page" style={{padding:'0.5em'}}>
      <h1>Menu Cast</h1>
      <a href="https://choosealicense.com/licenses/mit/">
        <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" />
      </a>
      
      <h2>Description</h2>
      <p>Menu Cast is a simple solution for your menu needs, quick and easy to set up, and helps you keep your menus up to date effortlessly.</p>
      
      <h2>Technology Stack</h2>
      <div className="tech-stack">
        <img src="https://img.shields.io/badge/-javascript-61DAFB?color=green&style=flat" alt="JavaScript" />
        <img src="https://img.shields.io/badge/-React-61DAFB?color=blue&style=flat" alt="React" />
        <img src="https://img.shields.io/badge/-Node.js-61DAFB?color=teal&style=flat" alt="Node.js" />
        <img src="https://img.shields.io/badge/-Express.js-61DAFB?color=red&style=flat" alt="Express.js" />
        <img src="https://img.shields.io/badge/-MongoDB-61DAFB?color=pink&style=flat" alt="MongoDB" />
      </div>
      
      <h2>User Story</h2>
      <pre>
        {`
        AS A business owner
        I WANT a software that allows me to change menu boards and specials per location/device
        SO THAT I can minimize the time needed to make changes and set up future events efficiently
        `}
      </pre>
      
      <h2>Installation</h2>
      <ul>
        <li>MongoDB - <a href="https://coding-boot-camp.github.io/full-stack/mongodb/how-to-install-mongodb">Install Guide</a></li>
        <li>Node.js - Version 16.18.0 <a href="https://nodejs.org/download/release/v16.18.0/">Download Links</a></li>
        <li>Install Node.js</li>
      </ul>
      
      <h2>Usage</h2>
      <pre>
        {`
        In-house demo:
        - Ensure MongoDB is installed locally
        - Run the following commands:
          npm install
          npm run develop
        `}
      </pre>
      <p>
        * The host will be displayed in the terminal.<br />
        * Navigate to the hostname on devices.<br />
        * Login or sign up.<br />
        * Upload your menu images and promos in PNG or JPEG format.<br />
        * Create slideshows for menu images and rotating slides.<br />
        * Create an endpoint with a unique ID and slideshows.<br />
        * See the instructions below for more details on creation.
      </p>
      
      <h2>Current Roadmap</h2>
      <pre>
        {`
        - Allow slideshows to limit shows based on the day
        - Specials - broadcast to non-point of sale TVs
        - Bug Fixes
        `}
      </pre>
      
      <h2>Notes</h2>
      <pre>
        {`
        Menu Software:
        - Software to display slides/menus of our choosing to each device
        - TV uses an embedded browser
        - No longer need to physically change USBs
        - Run specials:
          - Add specials
          - Run a special for a day, week, year
          - Easier last-minute corrections
        - Upselling:
          - Broadcast groups of images, names, as you enter
          - Welcomes
          - More frequently updated information
        `}
      </pre>
      
      <h2>Preview</h2>
      <p>Preview content here.</p>
      
      <h2>Instructions</h2>
      
      <h3>Uploading Slides</h3>
      <p>
        (Please compress images before uploading to reduce bandwidth and slow loading on internal networks) <a href="https://compressnow.com">CompressNow</a><br />
        - Login<br />
        - Choose File (must be smaller than 9MB)<br />
        - Press upload - you should then see the picture added to the available slides in the "Create Slide Show" section below.
      </p>
      
      <h3>Creating a Slide Show</h3>
      <pre>
        {`
        - Enter a name for the slide show
        - Select the slides you wish to include by clicking on them (they will have a highlighted blue edge to indicate selection)
        - IMPORTANT - The order in which you select the slides is the order in which they play
        - Once set and name entered, press "Create Slideshow"
        - The slideshow should then be listed in the "Create Endpoint" list below
        `}
      </pre>
      
      <h3>Edit Slide Show</h3>
      <pre>
        {`
        - To edit a slideshow, click the wrench icon to the right of the slide show name under "Create Endpoint"
        - This will load a page allowing you to reselect the slides you want (order matters)
        - Once set, hit "Update Slideshow"
        - You will need to navigate back to the home page manually. The slideshow should now be updated.
        `}
      </pre>
      
      <h3>Location Specific</h3>
      <p>
        Navigating to Endpoints:<br />
        - <strong>LG TV:</strong> Using the TV's web browser app (TV firmware should be updated to at least 5.0.x)
      </p>
      <pre>
        {`
        Example: Private IP
        Address: 192.168.x.x:3000/ss/deviceId
        Replace deviceId with the endpoint ID you want the TV to display. Once the page is loaded, press "OK" on the TV remote for the navigation bar to hide itself (the cursor must not be on the nav bar).
        `}
      </pre>
      
      <h2>Credits</h2>
      <p>Developed by [Your Name/Team]</p>
    </div>
  );
};

export default AboutPage;