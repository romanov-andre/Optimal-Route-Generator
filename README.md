<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This is a web application titled TrafficGUI that intends to connect to a mapquest API for real-time map and traffic data. It then displays that data for
the current user and allows them to create a route based on the traffic levels. The app comes with a local database feature that allows the user to save accounts. We intend to implement a feature that connects the current account to the database and pulls previuosly saved routes from earlier uses and displays them for easier access.

The future for this project is to create a much nicer looking UI along with fully deploying the app so that anyone can use it with just a link. This would involve deploying a mongoDB over the cloud, so any account created is saved for future access. Also, the front-end would need to be permantely deployed and scaleable depending on the amount of users and the type of devices they're using.

### Built With

The major frameworks used for this application:

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Mapquest.js](https://developer.mapquest.com/documentation/mapquest-js/v1.3/)
- [Express](https://www.npmjs.com/package/express)

<!-- GETTING STARTED -->

## Getting Started

The current version of the app only runs locally and needs an api key from mapquest.js. If the map doesn't load upon first use the go to mapquest.com
and create an account. The api key it generates can replace the current key in the L.mapquest.key variable in client.js.

### Prerequisites

You will need Node.js, MongoDB, and some form of local network to run the application!
Once all that is installed, navigate to the server folder within the project and run the command below in the terminal to start the server:

- npm
  ```sh
  npm run dev
  ```

### Installation

1. Get a free API Key at [MapQuest](https://developer.mapquest.com/plan_purchase/steps/business_edition/business_edition_free/register)
2. Clone the repo
   ```sh
   git clone https://github.com/alannorman99/TrafficGUI.git
   ```
3. Install NPM packages
   ```sh
   npm install express morgan cors express-rate-limit monk
   ```
4. Enter your API in `client.js`
   ```JS
   L.mapquest.key = 'ENTER YOUR API';
   ```

## Usage

Once you successfully get the application working locally:

1. Create an Account then login with that account information
2. Enter any destination in the search bar and the map will center on that location
3. Use the contol panel on the right of the map to toggle the traffic levels
4. Enter a specific start and end and create the fastest route based on the local traffic

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png

## Demo gif

![58dy4c](https://user-images.githubusercontent.com/83718752/117183918-1e551180-ada6-11eb-8380-306dd5fe0ca6.gif)

