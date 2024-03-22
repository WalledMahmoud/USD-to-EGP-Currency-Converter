# USD to EGP Currency Converter Chrome Extension

USD to EGP Currency Converter is a Chrome extension that allows users to quickly convert currency from USD to EGP using real-time exchange rates.

<div style="display: flex;">
    <img src="/images/usdegp1.PNG" alt="Image 1" style="width: 45%;">
    <img src="/images/usdegp2.PNG" alt="Image 2" style="width: 45%;">
</div>

## Disclaimer
This Chrome extension is designed for educational purposes only. We do not encourage or endorse the use of black market exchange rates for currency conversion. Dealing with black market rates may be illegal and can pose financial risks. It is always recommended to use legal and authorized channels for currency exchange transactions. The legal market rates provided by this extension are sourced from reputable sources and are intended for informational purposes only. Users are responsible for their own actions and should adhere to local laws and regulations regarding currency exchange.

## Features

### Black Market Exchange Rate
- Fetches the latest black market exchange rate for USD to EGP from Binance P2P platform.
- Displays the converted amount in Egyptian pounds based on the user-entered amount.

### Legal Market Exchange Rate
- Fetches the latest legal market exchange rate for USD to EGP from the API.
- Displays the converted amount in Egyptian pounds based on the user-entered amount.

### User Input Validation
- Validates user input to ensure that only positive numbers are entered for conversion.
- Displays an error message if the user enters an invalid amount.

### Persistent Storage
- Saves user-entered amounts and conversion results locally using Chrome storage.
- Restores saved data when the extension is reopened.

### Financial Loss Calculation
- Calculates and displays the financial loss between the black market and legal market exchange rates.
- Determines the market with the higher rate and provides a user-friendly message indicating which market is better.

### Time and Date Display
- Displays the current date and time of the last conversion.
- Updates the time and date automatically with each conversion.

## Installation
1. Download the extension ZIP file.
2. Extract the ZIP file to a directory on your computer.
3. Open Google Chrome and navigate to `chrome://extensions/`.
4. Enable "Developer mode" by toggling the switch in the top right corner.
5. Click on the "Load unpacked" button and select the directory where you extracted the extension files.

## Usage
1. Click on the Currency Converter extension icon in the Chrome toolbar.
2. Enter the amount you want to convert from USD to EGP.
3. Click the "Convert" button to see the conversion results.
4. View the converted amounts in both black market and legal market exchange rates.
5. Financial losses between the two market rates are shown, along with a message indicating which market is better.
6. The time and date of the last conversion are displayed at the bottom for reference.

## Development:
- This extension was developed using HTML, CSS, JavaScript, and the Chrome Extension API.

## Credits:
- [Binance P2P](https://p2p.binance.com): Used for fetching black market rates.
- [exchangerate-api](https://exchangerate-api.com): Used for fetching legal market rates.


## Contributing
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and create a pull request with your changes.
