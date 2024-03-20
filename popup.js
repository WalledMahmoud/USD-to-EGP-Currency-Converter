// Save input, result, and date/time data to local storage
function saveData() {
    const amountInput = document.getElementById('amount');
    const blackMarketResultDiv = document.getElementById('blackMarketResult');
    const legalMarketResultDiv = document.getElementById('legalMarketResult');
    const timeDateDiv = document.getElementById('timeDate');

    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString();
    const currentDateStr = currentDate.toLocaleDateString();
    const data = {
        amount: amountInput.value,
        blackMarketResult: blackMarketResultDiv.textContent,
        legalMarketResult: legalMarketResultDiv.textContent,
        timeDate: `${currentDateStr} ${currentTime}` // Save current date and time
    };

    // Update time/date display
    timeDateDiv.textContent = `Last Conversion: ${data.timeDate}`;

    chrome.storage.local.set(data);
}

// Restore input, result, and date/time data from local storage
function restoreData() {
    const amountInput = document.getElementById('amount');
    const blackMarketResultDiv = document.getElementById('blackMarketResult');
    const legalMarketResultDiv = document.getElementById('legalMarketResult');
    const timeDateDiv = document.getElementById('timeDate');

    chrome.storage.local.get(['amount', 'blackMarketResult', 'legalMarketResult', 'timeDate'], (data) => {
        if (data.amount) {
            amountInput.value = data.amount;
        }
        if (data.blackMarketResult) {
            blackMarketResultDiv.textContent = data.blackMarketResult;
        }
        if (data.legalMarketResult) {
            legalMarketResultDiv.textContent = data.legalMarketResult;
        }
        if (data.timeDate) {
            timeDateDiv.textContent = `Last Conversion: ${data.timeDate}`; // Display last conversion time/date
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const convertBtn = document.getElementById('convertBtn');
    const amountInput = document.getElementById('amount');
    const blackMarketResultDiv = document.getElementById('blackMarketResult');
    const legalMarketResultDiv = document.getElementById('legalMarketResult');
    const invalidAmountDiv = document.getElementById('invalidAmount');

    // Restore input, result, and date/time data when the popup is opened
    restoreData();

    // Add event listener to input field
    amountInput.addEventListener('input', function () {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount < 0) {
            invalidAmountDiv.textContent = 'Please enter a valid amount!';
        } else {
            invalidAmountDiv.textContent = '';
        }
    });

    convertBtn.addEventListener('click', function () {
        const amount = parseFloat(amountInput.value);
        if (!isNaN(amount) && amount >= 0) {
            blackMarketResultDiv.textContent = 'Fetching exchange rate...';
            legalMarketResultDiv.textContent = 'Fetching exchange rate...';

            chrome.runtime.sendMessage({ action: "fetchBlackMarketRate" }, function (response) {
                if (response && response.blackMarketRate) {
                    const totalBlackMarketAmount = (response.blackMarketRate * amount).toFixed(2);
                    blackMarketResultDiv.textContent = `Black Market: ${amount} USD = ${totalBlackMarketAmount} EGP`;
                    saveData(); // Save the updated data including date/time
                } else if (response && response.error) {
                    blackMarketResultDiv.textContent = `Error fetching black market rate: ${response.error}`;
                } else {
                    blackMarketResultDiv.textContent = "An unexpected error occurred.";
                }
            });

            chrome.runtime.sendMessage({ action: "fetchLegalMarketRate" }, function (response) {
                if (response && response.legalMarketRate) {
                    const totalLegalMarketAmount = (response.legalMarketRate * amount).toFixed(2);
                    legalMarketResultDiv.textContent = `Legal Market: ${amount} USD = ${totalLegalMarketAmount} EGP`;
                    saveData(); // Save the updated data including date/time
                } else if (response && response.error) {
                    legalMarketResultDiv.textContent = `Error fetching legal market rate: ${response.error}`;
                } else {
                    legalMarketResultDiv.textContent = "An unexpected error occurred.";
                }
            });
        } else {
            blackMarketResultDiv.textContent = '';
            legalMarketResultDiv.textContent = '';
        }
    });
});
