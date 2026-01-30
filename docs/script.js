// ========== CONFIGURATION ==========
const THINGSPEAK_CHANNEL_ID = '3245000';  // Your ThingSpeak channel ID
const THINGSPEAK_READ_API_KEY = '';  // Leave empty - channel is public
// ===================================

let currentTimeRange = '24h';
let charts = {};

// Time range configurations (in ThingSpeak API format)
const timeRanges = {
    '24h': { results: 96, label: '24 Hours' },      // ~15 min intervals
    '7d': { results: 168, label: '7 Days' },        // ~1 hour intervals
    '30d': { results: 720, label: '30 Days' },      // ~1 hour intervals
    '1y': { results: 8760, label: '1 Year' }        // ~1 hour intervals
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    loadData();

    // Auto-refresh every 5 minutes
    setInterval(() => {
        loadData();
    }, 5 * 60 * 1000);
});

function initializeEventListeners() {
    // Time range buttons
    document.querySelectorAll('.range-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active button
            document.querySelectorAll('.range-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            // Update time range and reload data
            currentTimeRange = e.target.dataset.range;
            loadData();
        });
    });

    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', () => {
        loadData();
    });
}

async function loadData() {
    const range = timeRanges[currentTimeRange];
    const url = buildThingSpeakURL(range.results);

    try {
        document.getElementById('lastUpdate').textContent = 'Loading...';

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();

        if (!data.feeds || data.feeds.length === 0) {
            throw new Error('No data available');
        }

        updateCurrentValues(data.feeds[data.feeds.length - 1]);
        updateCharts(data.feeds);
        updateLastUpdateTime(data.feeds[data.feeds.length - 1].created_at);

    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('lastUpdate').textContent = 'Error loading data';
    }
}

function buildThingSpeakURL(results) {
    let url = `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/feeds.json?results=${results}`;

    if (THINGSPEAK_READ_API_KEY && THINGSPEAK_READ_API_KEY !== 'YOUR_READ_API_KEY') {
        url += `&api_key=${THINGSPEAK_READ_API_KEY}`;
    }

    return url;
}

function updateCurrentValues(latestData) {
    document.getElementById('currentTemp').textContent =
        latestData.field1 ? parseFloat(latestData.field1).toFixed(1) : '--';

    document.getElementById('currentHumidity').textContent =
        latestData.field2 ? parseFloat(latestData.field2).toFixed(1) : '--';

    document.getElementById('currentPressure').textContent =
        latestData.field3 ? parseFloat(latestData.field3).toFixed(1) : '--';

    document.getElementById('currentLux').textContent =
        latestData.field4 ? parseFloat(latestData.field4).toFixed(0) : '--';

    document.getElementById('currentSoil').textContent =
        latestData.field5 ? parseFloat(latestData.field5).toFixed(1) : '--';
}

function updateCharts(feeds) {
    const labels = feeds.map(feed => new Date(feed.created_at));

    const datasets = {
        temperature: {
            data: feeds.map(feed => parseFloat(feed.field1)),
            label: 'Temperature (°C)',
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            color: 'rgb(255, 99, 132)'
        },
        humidity: {
            data: feeds.map(feed => parseFloat(feed.field2)),
            label: 'Humidity (%)',
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            color: 'rgb(54, 162, 235)'
        },
        pressure: {
            data: feeds.map(feed => parseFloat(feed.field3)),
            label: 'Pressure (hPa)',
            borderColor: 'rgb(255, 206, 86)',
            backgroundColor: 'rgba(255, 206, 86, 0.1)',
            color: 'rgb(255, 206, 86)'
        },
        lux: {
            data: feeds.map(feed => parseFloat(feed.field4)),
            label: 'Light (lux)',
            borderColor: 'rgb(255, 159, 64)',
            backgroundColor: 'rgba(255, 159, 64, 0.1)',
            color: 'rgb(255, 159, 64)'
        },
        soil: {
            data: feeds.map(feed => parseFloat(feed.field5)),
            label: 'Soil Moisture (%)',
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
            color: 'rgb(75, 192, 192)'
        }
    };

    createOrUpdateChart('tempChart', labels, datasets.temperature);
    createOrUpdateChart('humidityChart', labels, datasets.humidity);
    createOrUpdateChart('pressureChart', labels, datasets.pressure);
    createOrUpdateChart('luxChart', labels, datasets.lux);
    createOrUpdateChart('soilChart', labels, datasets.soil);
}

function createOrUpdateChart(chartId, labels, dataset) {
    const ctx = document.getElementById(chartId).getContext('2d');

    // Destroy existing chart if it exists
    if (charts[chartId]) {
        charts[chartId].destroy();
    }

    // Create new chart
    charts[chartId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: dataset.label,
                data: dataset.data,
                borderColor: dataset.borderColor,
                backgroundColor: dataset.backgroundColor,
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 2,
                pointHoverRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        title: function(context) {
                            const date = new Date(context[0].label);
                            return date.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        tooltipFormat: 'MMM dd, yyyy HH:mm',
                        displayFormats: getTimeDisplayFormat()
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 10
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1);
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

function getTimeDisplayFormat() {
    switch(currentTimeRange) {
        case '24h':
            return {
                hour: 'HH:mm',
                minute: 'HH:mm'
            };
        case '7d':
            return {
                day: 'MMM dd',
                hour: 'MMM dd HH:mm'
            };
        case '30d':
            return {
                day: 'MMM dd',
                week: 'MMM dd'
            };
        case '1y':
            return {
                month: 'MMM yyyy',
                day: 'MMM dd'
            };
        default:
            return {
                day: 'MMM dd'
            };
    }
}

function updateLastUpdateTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / 60000);

    let timeAgo;
    if (diffMinutes < 1) {
        timeAgo = 'Just now';
    } else if (diffMinutes < 60) {
        timeAgo = `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else if (diffMinutes < 1440) {
        const hours = Math.floor(diffMinutes / 60);
        timeAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        const days = Math.floor(diffMinutes / 1440);
        timeAgo = `${days} day${days > 1 ? 's' : ''} ago`;
    }

    document.getElementById('lastUpdate').textContent = `Last update: ${timeAgo}`;
}
