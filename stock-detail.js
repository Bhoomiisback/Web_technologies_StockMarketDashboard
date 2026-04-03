// Stock detail data
const stockData = {
    'AAPL': {
        name: 'Apple Inc.',
        logos: [
            'https://companieslogo.com/img/orig/AAPL-bf1a4314.png',
            'https://logo.clearbit.com/apple.com',
            'https://img.logo.dev/apple.com?token=pk_X-1ZO13CRYmGUIJQiOEKlQ'
        ],
        price: 178.45,
        change: 2.34,
        open: 175.20,
        high: 179.80,
        low: 174.50,
        volume: '52.3M',
        marketCap: '$2.78T',
        pe: 29.45,
        week52High: 198.23,
        week52Low: 124.17,
        avgVolume: '58.2M',
        beta: 1.29,
        description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, Mac, iPad, and Wearables, Home and Accessories products.'
    },
    'GOOGL': {
        name: 'Alphabet Inc.',
        logos: [
            'https://companieslogo.com/img/orig/GOOG-0ed88f7c.png',
            'https://logo.clearbit.com/google.com',
            'https://img.logo.dev/google.com?token=pk_X-1ZO13CRYmGUIJQiOEKlQ'
        ],
        price: 142.87,
        change: -1.23,
        open: 144.50,
        high: 145.20,
        low: 142.10,
        volume: '28.5M',
        marketCap: '$1.82T',
        pe: 26.78,
        week52High: 153.78,
        week52Low: 102.21,
        avgVolume: '31.4M',
        beta: 1.06,
        description: 'Alphabet Inc. offers various products and platforms including Search, Android, Chrome, Google Maps, YouTube, and Google Cloud. The company generates revenue primarily from advertising.'
    },
    'MSFT': {
        name: 'Microsoft Corp.',
        logos: [
            'https://companieslogo.com/img/orig/MSFT-a203b22d.png',
            'https://logo.clearbit.com/microsoft.com',
            'https://img.logo.dev/microsoft.com?token=pk_X-1ZO13CRYmGUIJQiOEKlQ'
        ],
        price: 412.33,
        change: 3.67,
        open: 408.90,
        high: 415.50,
        low: 407.80,
        volume: '21.8M',
        marketCap: '$3.07T',
        pe: 35.21,
        week52High: 420.82,
        week52Low: 309.45,
        avgVolume: '24.7M',
        beta: 0.93,
        description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates through Productivity and Business Processes, Intelligent Cloud, and More Personal Computing segments.'
    },
    'AMZN': {
        name: 'Amazon.com Inc.',
        logos: [
            'https://companieslogo.com/img/orig/AMZN-e9f942e4.png',
            'https://logo.clearbit.com/amazon.com',
            'https://img.logo.dev/amazon.com?token=pk_X-1ZO13CRYmGUIJQiOEKlQ'
        ],
        price: 178.25,
        change: 1.89,
        open: 176.40,
        high: 179.90,
        low: 175.80,
        volume: '45.2M',
        marketCap: '$1.85T',
        pe: 62.45,
        week52High: 188.65,
        week52Low: 118.35,
        avgVolume: '49.8M',
        beta: 1.15,
        description: 'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions through online and physical stores. The company operates through three segments: North America, International, and Amazon Web Services (AWS).'
    },
    'TSLA': {
        name: 'Tesla Inc.',
        logos: [
            'https://companieslogo.com/img/orig/TSLA-e0a4ec8c.png',
            'https://logo.clearbit.com/tesla.com',
            'https://img.logo.dev/tesla.com?token=pk_X-1ZO13CRYmGUIJQiOEKlQ'
        ],
        price: 248.92,
        change: -2.45,
        open: 254.80,
        high: 255.20,
        low: 247.30,
        volume: '112.5M',
        marketCap: '$791.2B',
        pe: 78.34,
        week52High: 299.29,
        week52Low: 152.37,
        avgVolume: '118.3M',
        beta: 2.01,
        description: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems. The company operates through Automotive, and Energy Generation and Storage segments.'
    }
};

let currentSymbol;
let currentRange = '1D';
let logoAttemptCount = 0;

// Get symbol from URL
function getSymbolFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('symbol') || 'AAPL';
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

// Load stock data
function loadStockData() {
    currentSymbol = getSymbolFromURL();
    const stock = stockData[currentSymbol];
    
    if (!stock) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update header with logo fallback
    const logoImg = document.getElementById('companyLogo');
    logoImg.src = stock.logos[0];
    logoImg.onerror = function() {
        handleDetailLogoError(this, currentSymbol);
    };
    
    document.getElementById('companyName').textContent = stock.name;
    document.getElementById('companySymbol').textContent = currentSymbol;
    
    // Update price info
    document.getElementById('currentPrice').textContent = `$${stock.price.toFixed(2)}`;
    const priceChangeEl = document.getElementById('priceChange');
    priceChangeEl.innerHTML = `
        <i class="fas fa-arrow-${stock.change >= 0 ? 'up' : 'down'}"></i>
        ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%
    `;
    priceChangeEl.className = `price-change-detail ${stock.change >= 0 ? 'positive' : 'negative'}`;
    
    // Update stats
    document.getElementById('openPrice').textContent = `$${stock.open.toFixed(2)}`;
    document.getElementById('highPrice').textContent = `$${stock.high.toFixed(2)}`;
    document.getElementById('lowPrice').textContent = `$${stock.low.toFixed(2)}`;
    document.getElementById('volumeDetail').textContent = stock.volume;
    document.getElementById('marketCapDetail').textContent = stock.marketCap;
    document.getElementById('peRatio').textContent = stock.pe.toFixed(2);
    
    // Update key statistics
    document.getElementById('week52High').textContent = `$${stock.week52High.toFixed(2)}`;
    document.getElementById('week52Low').textContent = `$${stock.week52Low.toFixed(2)}`;
    document.getElementById('avgVolume').textContent = stock.avgVolume;
    document.getElementById('beta').textContent = stock.beta.toFixed(2);
    
    // Update description
    document.getElementById('companyDescription').textContent = stock.description;
}

// Generate candlestick data
function generateCandlestickData(range) {
    const dataPoints = {
        '1D': 24,
        '1W': 35,
        '1M': 30,
        '3M': 60,
        '1Y': 80
    };
    
    const points = dataPoints[range];
    const candleData = [];
    const volumeData = [];
    
    const stock = stockData[currentSymbol];
    let basePrice = stock.price;
    
    for (let i = 0; i < points; i++) {
        // Generate OHLC data for candlesticks
        const open = basePrice + (Math.random() - 0.5) * (basePrice * 0.03);
        const close = open + (Math.random() - 0.5) * (basePrice * 0.04);
        const high = Math.max(open, close) + Math.random() * (basePrice * 0.02);
        const low = Math.min(open, close) - Math.random() * (basePrice * 0.02);
        
        candleData.push({
            open: open,
            high: high,
            low: low,
            close: close,
            time: i,
            isBullish: close >= open
        });
        
        volumeData.push({
            volume: Math.floor(Math.random() * 5000000 + 1000000),
            isBullish: close >= open
        });
        
        basePrice = close;
    }
    
    return { candleData, volumeData };
}

// Create candlestick chart
function createCandlestickChart() {
    const data = generateCandlestickData(currentRange);
    const container = document.getElementById('candlestickChart');
    
    // Clear existing chart
    container.innerHTML = '';
    
    // Find min and max for scaling
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    
    data.candleData.forEach(candle => {
        minPrice = Math.min(minPrice, candle.low);
        maxPrice = Math.max(maxPrice, candle.high);
    });
    
    const priceRange = maxPrice - minPrice;
    const chartHeight = 360; // Total height minus padding
    
    // Create candles
    data.candleData.forEach((candle, index) => {
        const candleElement = document.createElement('div');
        candleElement.className = `candle ${candle.isBullish ? 'bullish' : 'bearish'}`;
        
        // Calculate positions (inverted because CSS top is from top of container)
        const highPos = ((maxPrice - candle.high) / priceRange) * chartHeight;
        const lowPos = ((maxPrice - candle.low) / priceRange) * chartHeight;
        const openPos = ((maxPrice - candle.open) / priceRange) * chartHeight;
        const closePos = ((maxPrice - candle.close) / priceRange) * chartHeight;
        
        // Wick (high-low line)
        const wick = document.createElement('div');
        wick.className = 'candle-wick';
        wick.style.top = `${highPos}px`;
        wick.style.height = `${lowPos - highPos}px`;
        
        // Body (open-close rectangle)
        const body = document.createElement('div');
        body.className = 'candle-body';
        const bodyTop = Math.min(openPos, closePos);
        const bodyHeight = Math.max(Math.abs(closePos - openPos), 2); // Minimum 2px height
        body.style.top = `${bodyTop}px`;
        body.style.height = `${bodyHeight}px`;
        
        // Tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'candle-tooltip';
        tooltip.innerHTML = `
            <div><strong>Open:</strong> $${candle.open.toFixed(2)}</div>
            <div><strong>High:</strong> $${candle.high.toFixed(2)}</div>
            <div><strong>Low:</strong> $${candle.low.toFixed(2)}</div>
            <div><strong>Close:</strong> $${candle.close.toFixed(2)}</div>
        `;
        
        candleElement.appendChild(wick);
        candleElement.appendChild(body);
        candleElement.appendChild(tooltip);
        container.appendChild(candleElement);
    });
}

// Create volume chart
function createVolumeChart() {
    const data = generateCandlestickData(currentRange);
    const container = document.getElementById('volumeChartContainer');
    
    // Clear existing chart
    container.innerHTML = '';
    
    // Find max volume for scaling
    const maxVolume = Math.max(...data.volumeData.map(v => v.volume));
    
    // Create volume bars
    data.volumeData.forEach((vol) => {
        const bar = document.createElement('div');
        bar.className = `volume-bar ${vol.isBullish ? 'bullish' : 'bearish'}`;
        
        const heightPercent = (vol.volume / maxVolume) * 100;
        bar.style.height = `${heightPercent}%`;
        bar.setAttribute('data-volume', `Volume: ${(vol.volume / 1000000).toFixed(2)}M`);
        
        container.appendChild(bar);
    });
}

// Handle time range buttons
function setupTimeRangeButtons() {
    const buttons = document.querySelectorAll('.time-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentRange = btn.dataset.range;
            createCandlestickChart();
            createVolumeChart();
        });
    });
}

// Animate price updates
function animatePriceUpdates() {
    const stock = stockData[currentSymbol];
    const priceChange = (Math.random() - 0.5) * 2;
    stock.price += priceChange;
    stock.change = parseFloat(((Math.random() - 0.5) * 5).toFixed(2));
    
    document.getElementById('currentPrice').textContent = `$${stock.price.toFixed(2)}`;
    const priceChangeEl = document.getElementById('priceChange');
    priceChangeEl.innerHTML = `
        <i class="fas fa-arrow-${stock.change >= 0 ? 'up' : 'down'}"></i>
        ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%
    `;
    priceChangeEl.className = `price-change-detail ${stock.change >= 0 ? 'positive' : 'negative'}`;
}

// Handle logo loading errors for detail page
function handleDetailLogoError(img, symbol) {
    const stock = stockData[symbol];
    if (!stock) return;
    
    logoAttemptCount++;
    
    // Try next logo URL
    if (logoAttemptCount < stock.logos.length) {
        img.src = stock.logos[logoAttemptCount];
    } else {
        // All failed, create a styled placeholder
        img.style.display = 'none';
        const parent = img.parentElement;
        const placeholder = document.createElement('div');
        placeholder.className = 'company-logo-large';
        placeholder.style.cssText = `
            width: 100px;
            height: 100px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: white;
            font-size: 2.5rem;
            background: linear-gradient(135deg, #00d4ff, #0099ff);
            box-shadow: 0 5px 25px rgba(0, 212, 255, 0.4);
            animation: pulse 2s ease-in-out infinite;
        `;
        placeholder.textContent = symbol.charAt(0);
        parent.insertBefore(placeholder, img);
    }
}

// Initialize
updateTime();
loadStockData();
createCandlestickChart();
createVolumeChart();
setupTimeRangeButtons();

setInterval(updateTime, 1000);
setInterval(animatePriceUpdates, 5000);
setInterval(() => {
    createCandlestickChart();
    createVolumeChart();
}, 10000);