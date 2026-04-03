// All available stocks with multiple logo URL options
const allStocks = [
    { 
        symbol: 'AAPL', 
        name: 'Apple Inc.', 
        price: 178.45, 
        change: 2.34, 
        logos: [
            'https://companieslogo.com/img/orig/AAPL-bf1a4314.png',
            'https://logo.clearbit.com/apple.com',
            'https://img.logo.dev/apple.com?token=pk_X-1ZO13CRYmGUIJQiOEKlQ'
        ]
    },
    { 
        symbol: 'GOOGL', 
        name: 'Alphabet Inc.', 
        price: 142.87, 
        change: -1.23, 
        logos: [
            'https://companieslogo.com/img/orig/GOOG-0ed88f7c.png',
            'https://logo.clearbit.com/google.com',
            'https://img.logo.dev/google.com?token=pk_X-1ZO13CRYmGUIJQiOEKlQ'
        ]
    },
    { 
        symbol: 'MSFT', 
        name: 'Microsoft Corp.', 
        price: 412.33, 
        change: 3.67, 
        logos: [
            'https://companieslogo.com/img/orig/MSFT-a203b22d.png',
            'https://logo.clearbit.com/microsoft.com',
            'https://img.logo.dev/microsoft.com?token=pk_X-1ZO13CRYmGUIJQiOEKlQ'
        ]
    },
    { 
        symbol: 'AMZN', 
        name: 'Amazon.com Inc.', 
        price: 178.25, 
        change: 1.89, 
        logos: [
            'https://companieslogo.com/img/orig/AMZN-e9f942e4.png',
            'https://logo.clearbit.com/amazon.com',
            'https://img.logo.dev/amazon.com?token=pk_X-1ZO13CRYmGUIJQiOEKlQ'
        ]
    },
    { 
        symbol: 'TSLA', 
        name: 'Tesla Inc.', 
        price: 248.92, 
        change: -2.45, 
        logos: [
            'https://companieslogo.com/img/orig/TSLA-e0a4ec8c.png',
            'https://logo.clearbit.com/tesla.com',
            'https://img.logo.dev/tesla.com?token=pk_X-1ZO13CRYmGUIJQiOEKlQ'
        ]
    },
    { 
        symbol: 'META', 
        name: 'Meta Platforms Inc.', 
        price: 352.89, 
        change: 1.56, 
        logos: [
            'https://companieslogo.com/img/orig/META-559d4789.png',
            'https://logo.clearbit.com/meta.com',
            'https://img.logo.dev/meta.com?token=pk_X-1ZO13CRYmGUIJQiOEKlQ'
        ]
    },
    { 
        symbol: 'NVDA', 
        name: 'NVIDIA Corporation', 
        price: 495.22, 
        change: 4.12, 
        logos: [
            'https://companieslogo.com/img/orig/NVDA-4b0d3d6d.png',
            'https://logo.clearbit.com/nvidia.com',
            'https://img.logo.dev/nvidia.com?token=pk_X-1ZO13CRYmGUIJQiOEKlQ'
        ]
    },
    { 
        symbol: 'NFLX', 
        name: 'Netflix Inc.', 
        price: 445.87, 
        change: -0.89, 
        logos: [
            'https://companieslogo.com/img/orig/NFLX-9b36b0e7.png',
            'https://logo.clearbit.com/netflix.com',
            'https://img.logo.dev/netflix.com?token=pk_X-1ZO13CRYmGUIJQiOEKlQ'
        ]
    },
    { 
        symbol: 'AMD', 
        name: 'Advanced Micro Devices', 
        price: 156.43, 
        change: 2.87, 
        logos: [
            'https://companieslogo.com/img/orig/AMD-23277b0b.png',
            'https://logo.clearbit.com/amd.com',
            'https://img.logo.dev/amd.com?token=pk_X-1ZO13CRYmGUIJQiOEKlQ'
        ]
    },
    { 
        symbol: 'INTC', 
        name: 'Intel Corporation', 
        price: 43.67, 
        change: -1.45, 
        logos: [
            'https://companieslogo.com/img/orig/INTC-3c1229db.png',
            'https://logo.clearbit.com/intel.com',
            'https://img.logo.dev/intel.com?token=pk_X-1ZO13CRYmGUIJQiOEKlQ'
        ]
    },
    { 
        symbol: 'DIS', 
        name: 'The Walt Disney Company', 
        price: 89.32, 
        change: 0.67, 
        logos: [
            'https://companieslogo.com/img/orig/DIS-0f9dc19c.png',
            'https://logo.clearbit.com/disney.com',
            'https://img.logo.dev/disney.com?token=pk_X-1ZO13CRYmGUIJQiOEKlQ'
        ]
    },
    { 
        symbol: 'BA', 
        name: 'Boeing Company', 
        price: 167.89, 
        change: -2.34, 
        logos: [
            'https://companieslogo.com/img/orig/BA-9c5f23ab.png',
            'https://logo.clearbit.com/boeing.com',
            'https://img.logo.dev/boeing.com?token=pk_X-1ZO13CRYmGUIJQiOEKlQ'
        ]
    }
];

// User's watchlist with holdings
let watchlist = [];

// Get logo URL with fallback
function getLogoUrl(stock) {
    return stock.logos[0];
}

// Update time
function updateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    document.getElementById('currentTime').textContent = now.toLocaleDateString('en-US', options);
}

// Calculate portfolio statistics
function calculatePortfolioStats() {
    let totalValue = 0;
    let totalPL = 0;
    let totalInvested = 0;

    watchlist.forEach(item => {
        const stock = allStocks.find(s => s.symbol === item.symbol);
        if (stock) {
            const currentValue = stock.price * item.quantity;
            const invested = item.purchasePrice * item.quantity;
            const pl = currentValue - invested;
            
            totalValue += currentValue;
            totalPL += pl;
            totalInvested += invested;
        }
    });

    // Update portfolio value
    document.getElementById('portfolioValue').textContent = `$${totalValue.toFixed(2)}`;
    
    // Update total P/L
    const plPercent = totalInvested > 0 ? ((totalPL / totalInvested) * 100) : 0;
    document.getElementById('totalProfitLoss').textContent = `${totalPL >= 0 ? '+' : ''}$${totalPL.toFixed(2)}`;
    
    const plPercentEl = document.getElementById('profitLossPercent');
    const plIcon = document.getElementById('profitLossIcon');
    
    if (totalPL >= 0) {
        plPercentEl.className = 'stat-change positive';
        plPercentEl.innerHTML = `<i class="fas fa-arrow-up"></i> <span>+${plPercent.toFixed(2)}%</span>`;
        plIcon.className = 'stat-icon green';
    } else {
        plPercentEl.className = 'stat-change negative';
        plPercentEl.innerHTML = `<i class="fas fa-arrow-down"></i> <span>${plPercent.toFixed(2)}%</span>`;
        plIcon.className = 'stat-icon orange';
    }

    // Update portfolio change
    const portfolioChangePercent = totalInvested > 0 ? ((totalValue - totalInvested) / totalInvested * 100) : 0;
    const portfolioChangeEl = document.getElementById('portfolioChange');
    portfolioChangeEl.textContent = `${portfolioChangePercent >= 0 ? '+' : ''}${portfolioChangePercent.toFixed(2)}%`;
    portfolioChangeEl.parentElement.className = `stat-change ${portfolioChangePercent >= 0 ? 'positive' : 'negative'}`;

    // Update holdings count
    document.getElementById('totalHoldings').textContent = watchlist.length;
}

// Render watchlist stocks
function renderStocks() {
    const stocksList = document.getElementById('stocksList');
    
    if (watchlist.length === 0) {
        stocksList.innerHTML = '<p style="color: #8b92b8; text-align: center; padding: 40px;">No stocks in watchlist. Click "Add Stock" to get started!</p>';
        return;
    }

    stocksList.innerHTML = watchlist.map((item) => {
        const stock = allStocks.find(s => s.symbol === item.symbol);
        if (!stock) return '';
        
        const currentValue = stock.price * item.quantity;
        const invested = item.purchasePrice * item.quantity;
        const pl = currentValue - invested;
        const plPercent = (pl / invested) * 100;
        
        const logoUrl = getLogoUrl(stock);
        const logoId = `logo-${stock.symbol}`;
        
        return `
        <div class="stock-item" onclick="goToStockDetail('${stock.symbol}')" style="cursor: pointer;">
            <div class="stock-info">
                <img id="${logoId}" src="${logoUrl}" alt="${stock.symbol}" class="stock-logo" 
                     onerror="handleLogoError(this, '${stock.symbol}')">
                <div class="stock-details">
                    <h3>${stock.symbol}</h3>
                    <p>${stock.name}</p>
                    <p style="font-size: 0.75rem; color: #8b92b8; margin-top: 3px;">${item.quantity} shares @ $${item.purchasePrice.toFixed(2)}</p>
                </div>
            </div>
            <div class="stock-pl">
                <div class="pl-label">P/L</div>
                <div class="pl-value ${pl >= 0 ? 'profit' : 'loss'}">
                    ${pl >= 0 ? '+' : ''}$${pl.toFixed(2)}
                    <div style="font-size: 0.8rem;">(${pl >= 0 ? '+' : ''}${plPercent.toFixed(2)}%)</div>
                </div>
            </div>
            <div class="mini-chart">
                ${generateMiniChart()}
            </div>
            <div class="stock-price">
                <div class="price">$${stock.price.toFixed(2)}</div>
                <div class="price-change ${stock.change >= 0 ? 'positive' : 'negative'}">
                    <i class="fas fa-arrow-${stock.change >= 0 ? 'up' : 'down'}"></i>
                    ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%
                </div>
            </div>
            <button class="remove-stock-btn" onclick="event.stopPropagation(); removeFromWatchlist('${stock.symbol}')">
                <i class="fas fa-times"></i> Remove
            </button>
        </div>
    `;
    }).join('');
}

// Render available stocks
function renderAvailableStocks() {
    const availableList = document.getElementById('availableStocksList');
    const watchlistSymbols = watchlist.map(w => w.symbol);
    const available = allStocks.filter(s => !watchlistSymbols.includes(s.symbol));

    if (available.length === 0) {
        availableList.innerHTML = '<p style="color: #8b92b8; text-align: center; padding: 40px;">All stocks are in your watchlist!</p>';
        return;
    }

    availableList.innerHTML = available.map((stock) => {
        const logoUrl = getLogoUrl(stock);
        const logoId = `available-logo-${stock.symbol}`;
        
        return `
        <div class="stock-item" onclick="goToStockDetail('${stock.symbol}')" style="cursor: pointer;">
            <div class="stock-info">
                <img id="${logoId}" src="${logoUrl}" alt="${stock.symbol}" class="stock-logo" 
                     onerror="handleLogoError(this, '${stock.symbol}')">
                <div class="stock-details">
                    <h3>${stock.symbol}</h3>
                    <p>${stock.name}</p>
                </div>
            </div>
            <div class="mini-chart">
                ${generateMiniChart()}
            </div>
            <div class="stock-price">
                <div class="price">$${stock.price.toFixed(2)}</div>
                <div class="price-change ${stock.change >= 0 ? 'positive' : 'negative'}">
                    <i class="fas fa-arrow-${stock.change >= 0 ? 'up' : 'down'}"></i>
                    ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%
                </div>
            </div>
        </div>
    `;
    }).join('');
}

// Handle logo loading errors
let logoAttempts = {};

function handleLogoError(img, symbol) {
    const stock = allStocks.find(s => s.symbol === symbol);
    if (!stock) return;
    
    if (!logoAttempts[symbol]) {
        logoAttempts[symbol] = 0;
    }
    
    logoAttempts[symbol]++;
    
    if (logoAttempts[symbol] < stock.logos.length) {
        img.src = stock.logos[logoAttempts[symbol]];
    } else {
        img.style.display = 'none';
        const parent = img.parentElement;
        const placeholder = document.createElement('div');
        placeholder.className = 'stock-logo logo-placeholder';
        placeholder.style.cssText = `
            width: 50px;
            height: 50px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: white;
            font-size: 1.2rem;
            background: linear-gradient(135deg, #00d4ff, #0099ff);
            box-shadow: 0 2px 10px rgba(0, 212, 255, 0.3);
        `;
        placeholder.textContent = symbol.charAt(0);
        parent.insertBefore(placeholder, img);
    }
}

// Navigate to stock detail page
function goToStockDetail(symbol) {
    window.location.href = `stock-detail.html?symbol=${symbol}`;
}

// Generate mini chart
function generateMiniChart() {
    const bars = [];
    for (let i = 0; i < 10; i++) {
        const height = Math.random() * 80 + 20;
        bars.push(`<span class="chart-bar" style="height: ${height}%; animation-delay: ${i * 0.1}s;"></span>`);
    }
    return `<div class="chart-line">${bars.join('')}</div>`;
}

// Toggle add stock modal
function toggleAddStockModal() {
    const modal = document.getElementById('addStockModal');
    modal.classList.toggle('active');
    
    if (modal.classList.contains('active')) {
        populateStockSelect();
    }
}

// Populate stock select dropdown
function populateStockSelect() {
    const select = document.getElementById('stockSymbolSelect');
    const watchlistSymbols = watchlist.map(w => w.symbol);
    const available = allStocks.filter(s => !watchlistSymbols.includes(s.symbol));
    
    select.innerHTML = '<option value="">Select a stock...</option>' + 
        available.map(stock => `<option value="${stock.symbol}">${stock.symbol} - ${stock.name}</option>`).join('');
    
    select.addEventListener('change', function() {
        const selectedStock = allStocks.find(s => s.symbol === this.value);
        if (selectedStock) {
            document.getElementById('purchasePriceInput').value = selectedStock.price.toFixed(2);
        }
    });
}

// Quick add stock (from available list)
function quickAddStock(symbol) {
    const stock = allStocks.find(s => s.symbol === symbol);
    if (!stock) return;
    
    watchlist.push({
        symbol: symbol,
        quantity: 1,
        purchasePrice: stock.price
    });
    
    renderStocks();
    renderAvailableStocks();
    calculatePortfolioStats();
    saveWatchlist();
}

// Add stock to watchlist
function addStockToWatchlist() {
    const symbol = document.getElementById('stockSymbolSelect').value;
    const quantity = parseInt(document.getElementById('quantityInput').value);
    const purchasePrice = parseFloat(document.getElementById('purchasePriceInput').value);
    
    if (!symbol || !quantity || !purchasePrice || quantity < 1 || purchasePrice < 0) {
        alert('Please fill in all fields correctly!');
        return;
    }
    
    watchlist.push({
        symbol: symbol,
        quantity: quantity,
        purchasePrice: purchasePrice
    });
    
    toggleAddStockModal();
    renderStocks();
    renderAvailableStocks();
    calculatePortfolioStats();
    saveWatchlist();
    
    // Reset form
    document.getElementById('stockSymbolSelect').value = '';
    document.getElementById('quantityInput').value = '1';
    document.getElementById('purchasePriceInput').value = '';
}

// Remove from watchlist
function removeFromWatchlist(symbol) {
    if (confirm(`Remove ${symbol} from your watchlist?`)) {
        watchlist = watchlist.filter(item => item.symbol !== symbol);
        renderStocks();
        renderAvailableStocks();
        calculatePortfolioStats();
        saveWatchlist();
    }
}

// Save watchlist to memory
function saveWatchlist() {
    // Since we can't use localStorage, we just keep it in memory
    // Data will be reset on page refresh
}

// Load watchlist from memory
function loadWatchlist() {
    // Start with empty watchlist
    watchlist = [];
}

// Animate stats
function animateStats() {
    const volume = parseFloat(document.getElementById('volume').textContent.replace('M', ''));
    const newVolume = (volume + (Math.random() - 0.5) * 5).toFixed(1);
    document.getElementById('volume').textContent = `${newVolume}M`;
}

// Animate stock prices
function animateStockPrices() {
    allStocks.forEach((stock) => {
        const priceChange = (Math.random() - 0.5) * 2;
        stock.price += priceChange;
        stock.change = parseFloat(((Math.random() - 0.5) * 5).toFixed(2));
    });
    renderStocks();
    renderAvailableStocks();
    calculatePortfolioStats();
}

// Initialize
updateTime();
loadWatchlist();
renderStocks();
renderAvailableStocks();
calculatePortfolioStats();
checkUserLogin();

setInterval(updateTime, 1000);
setInterval(animateStats, 3000);
setInterval(animateStockPrices, 5000);

// Check user login status
function checkUserLogin() {
    const currentUser = window.currentUser;
    if (currentUser) {
        document.getElementById('userText').textContent = currentUser.name.split(' ')[0];
        document.getElementById('userLink').href = '#';
        document.getElementById('userLink').onclick = function(e) {
            e.preventDefault();
            if (confirm('Do you want to logout?')) {
                window.currentUser = null;
                window.location.href = 'login.html';
            }
        };
    }
}

// Show my stocks (scroll to watchlist)
function showMyStocks() {
    const watchlistSection = document.querySelector('.stocks-section');
    watchlistSection.scrollIntoView({ behavior: 'smooth' });
}