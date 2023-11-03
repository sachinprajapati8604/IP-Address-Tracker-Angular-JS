## IP Address Tracker

This project is an IP address tracking application that provides information about a given IP address or domain. It leverages the ipify API (https://geo.ipify.org/) for geolocation data and utilizes the Leaflet library (https://leafletjs.com/) to display the IP location on a map.

#### Features

IP Address Details: Enter an IP address or domain, and the application retrieves its geolocation details, including country, region, city, postal code, and ISP.

Validation: The input field is equipped with validation to ensure you enter a valid IP address or domain and used sweetalert2 for the wrong input alert.

Direction Integration: Easily navigate to the location by clicking the "Direction" button, which redirects you to Google Maps for directions.

Responsive Design: The application is designed to provide a great user experience on both mobile and desktop devices, with media queries to optimize the layout.

## Live Demo

You can try the IP Address Tracker live on https://sp-ipaddress-tracker.netlify.app/

## Setup and Usage

To set up and run this project locally, follow these steps:

Clone this repository.
Install the project's dependencies using npm install.
Start the development server with npm start.
The application will run locally on http://localhost:4200/. Enter an IP address or domain to begin tracking.

## Technologies Used

Angular
Leaflet
ipify API
