chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "fetchBlackMarketRate") {
        fetchBlackMarketRate()
            .then(blackMarketRate => {
                sendResponse({ blackMarketRate });
            })
            .catch(error => {
                sendResponse({ error: error.message });
            });
        return true;
    } else if (request.action === "fetchLegalMarketRate") {
        fetchLegalMarketRate()
            .then(legalMarketRate => {
                sendResponse({ legalMarketRate });
            })
            .catch(error => {
                sendResponse({ error: error.message });
            });
        return true;
    }
});

// Black Market Rates
async function fetchBlackMarketRate() {
    try {
        const payload = {
            asset: "USDT",
            fiat: "EGP",
            merchantCheck: true,
            page: 1,
            payTypes: ["BANK"],
            rows: 20,
            tradeType: "SELL"
        };

        const response = await fetch("https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
            timeout: 10000
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if ('data' in data && data.data.length > 0) {
            const maxPrice = Math.max(...data.data.map(item => parseFloat(item.adv.price)));
            return maxPrice;
        } else {
            throw new Error("No data available");
        }
    } catch (error) {
        throw new Error("Error fetching legal market rate. Check your internet connection.");
    }
}

// Legal Market Rates
async function fetchLegalMarketRate() {
    try {
        const apiKey = 'Zt9nE84Z6uUURHiByW9kFTz3aWylpG7m'; // Replace 'YOUR_API_KEY' with your actual API key
        const response = await fetch('https://api.apilayer.com/exchangerates_data/latest?symbols=EGP&base=USD', {
            headers: {
                'apikey': `${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const exchangeRate = data.rates.EGP;

        if (exchangeRate) {
            return exchangeRate;
        } else {
            throw new Error("No data available");
        }
    } catch (error) {
        throw new Error("Error fetching legal market rate. Check your internet connection.");
    }
}
