# Weather Wizard

Weather Wizard is a web application that provides weather updates for a town or city, based on the location and country entered by the user. It uses the OpenWeatherMap API to fetch weather data, and displays basic information such as temperature, current weather conditions, air pressure, real feel, humidity, wind speed and direction, sunrise and sunset times, cloudiness, and visibility.

The application also features a dark mode, which can be toggled on or off, and saves the current status of the mode so that it is preserved upon refreshing the page.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Getting Started

To get started with Weather Wizard, simply visit the live [demo](https://weather-wizard-js.netlify.app/) of the application. The application is hosted on a remote server, so no installation is required.

Alternatively, you can download the source code from the [GitHub repository](https://github.com/mazharkafi004/WeatherWizard) and run it locally on your computer.

## Prerequisites

Before running Weather Wizard locally, you will need to have the following software installed on your computer:

- A web browser (such as Chrome, Firefox, or Safari)
- A code editor (such as Visual Studio Code, Sublime Text, or Atom)

You will also need an API key from [OpenWeatherMap](https://openweathermap.org/) in order to access weather data. You can sign up for a free account on their website to obtain an API key.

## Installation

To install Weather Wizard locally on your computer, follow these steps:

1. Download the source code from the GitHub repository.
2. Open the code in your preferred code editor.
3. Navigate to the `js` folder and create a `config.js` file.
4. Add `const  YOUR_API_KEY = "Your_own_API_KEY";` line to the file, Replace `Your_own_API_KEY` with your actual OpenWeatherMap API key.
5. Save the `config.js` file and close it.
6. Open the `index.html` file in your web browser.

That's it! You should now be able to use Weather Wizard to obtain weather updates for any town or city.

## Usage

Using Weather Wizard is simple. Follow these steps to get started:

1. Enter the name of a town or city in the `Location` field.
2. Select a country from the `Country` field.
3. Click the `Get Weather` button.
4. The weather update for the location you entered should now be displayed.
5. You can view basic weather information, such as temperature, humidity, wind speed and direction, and more.
6. You can enable Dark Mode by enabling of disabling the toggle button above.

## License

This project is licensed under the GNU General Public License. See the `LICENSE` file for details.

## Acknowledgements

Weather Wizard was built using the following technologies:

- HTML
- CSS
- JavaScript
- OpenWeatherMap API

Special thanks to OpenWeatherMap for providing the API used by this application.
